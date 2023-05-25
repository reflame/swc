use std::path::{Component, Path, PathBuf};

use anyhow::{bail, Context, Error};
use path_clean::PathClean;
use swc_common::FileName;
use tracing::{debug, info, trace, Level};

use crate::resolve::Resolve;

#[derive(Debug)]
enum Pattern {
    Wildcard {
        prefix: String,
    },
    /// No wildcard.
    Exact(String),
}

/// Support for `paths` of `tsconfig.json`.
///
/// See https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
#[derive(Debug)]
pub struct TsConfigResolver<R>
where
    R: Resolve,
{
    inner: R,
    base_url: PathBuf,
    base_url_filename: FileName,
    paths: Vec<(Pattern, Vec<String>)>,
}

impl<R> TsConfigResolver<R>
where
    R: Resolve,
{
    fn wrap(&self, path: Option<PathBuf>) -> Result<FileName, Error> {
        if let Some(path) = path {
            if cfg!(debug_assertions) {
                // info!(
                //     base_url = tracing::field::display(base_url.display()),
                //     "jsc.paths"
                // );
                info!(
                    // base_dir,
                    // module_specifier,
                    path_to_string = path.to_str().unwrap().to_string(),
                    filename = FileName::Real(path.to_str().unwrap().into()).to_string(),
                    // base_dir.join(module_specifier).display(),
                    "tsc wrap",
                );
            }

            return Ok(FileName::Real(path.to_str().unwrap().into()));
        }
        bail!("index not found")
    }

    ///
    /// # Parameters
    ///
    /// ## base_url
    ///
    /// See https://www.typescriptlang.org/tsconfig#baseUrl
    ///
    /// The typescript documentation says `This must be specified if "paths"
    /// is.`.
    ///
    /// ## `paths`
    ///
    /// Pass `paths` map from `tsconfig.json`.
    ///
    /// See https://www.typescriptlang.org/tsconfig#paths
    ///
    /// Note that this is not a hashmap because value is not used as a hash map.
    pub fn new(inner: R, base_url: PathBuf, paths: Vec<(String, Vec<String>)>) -> Self {
        if cfg!(debug_assertions) {
            info!(
                base_url = tracing::field::display(base_url.display()),
                "jsc.paths"
            );
        }

        let paths = paths
            .into_iter()
            .map(|(from, to)| {
                assert!(
                    !to.is_empty(),
                    "value of `paths.{}` should not be an empty array",
                    from,
                );

                let pos = from.as_bytes().iter().position(|&c| c == b'*');
                let pat = if from.contains('*') {
                    if from.as_bytes().iter().rposition(|&c| c == b'*') != pos {
                        panic!("`paths.{}` should have only one wildcard", from)
                    }

                    Pattern::Wildcard {
                        prefix: from[..pos.unwrap()].to_string(),
                    }
                } else {
                    assert_eq!(
                        to.len(),
                        1,
                        "value of `paths.{}` should be an array with one element because the src \
                         path does not contains * (wildcard)",
                        from,
                    );

                    Pattern::Exact(from)
                };

                (pat, to)
            })
            .collect();

        Self {
            inner,
            base_url_filename: FileName::Real(base_url.clone()),
            base_url,
            paths,
        }
    }
}

// https://github.com/rust-lang/cargo/blob/2b3356c91b60d185c5f8ef2dad0971bf80e0ea8b/crates/cargo-util/src/paths.rs#LL82C1-L107C2
fn normalize_path(path: PathBuf) -> PathBuf {
    let mut components = path.components().peekable();
    let mut ret = if let Some(c @ Component::Prefix(..)) = components.peek().cloned() {
        components.next();
        PathBuf::from(c.as_os_str())
    } else {
        PathBuf::new()
    };

    for component in components {
        match component {
            Component::Prefix(..) => unreachable!(),
            Component::RootDir => {
                ret.push(component.as_os_str());
            }
            Component::CurDir => {}
            Component::ParentDir => {
                ret.pop();
            }
            Component::Normal(c) => {
                ret.push(c);
            }
        }
    }
    ret
}

impl<R> Resolve for TsConfigResolver<R>
where
    R: Resolve,
{
    fn resolve(&self, base: &FileName, module_specifier: &str) -> Result<FileName, Error> {
        if cfg!(debug_assertions) {
            debug!("invoking tsc resolve");
        }

        let _tracing = if cfg!(debug_assertions) {
            Some(
                tracing::span!(
                    Level::ERROR,
                    "tsc.resolve",
                    base_url = tracing::field::display(self.base_url.display()),
                    base = tracing::field::display(base),
                    src = tracing::field::display(module_specifier),
                )
                .entered(),
            )
        } else {
            None
        };

        if module_specifier.starts_with('.')
            && (module_specifier == ".."
                || module_specifier.starts_with("./")
                || module_specifier.starts_with("../"))
        {
            if cfg!(debug_assertions) {
                debug!("tsc resolve relative");
            }

            // bail!("tsc-resolver relative")

            let base = match base {
                FileName::Real(v) => v,
                _ => bail!("tsc-resolver supports only files"),
            };

            let base_dir = base.parent().unwrap();

            if cfg!(debug_assertions) {
                // info!(
                //     base_url = tracing::field::display(base_url.display()),
                //     "jsc.paths"
                // );
                info!(
                    // base_dir,
                    // module_specifier,
                    base = tracing::field::display(base.display()),
                    base_dir = tracing::field::display(base_dir.display()),
                    base_is_file = tracing::field::display(base.is_file()),
                    base_parent = tracing::field::display(base.parent().unwrap().display()),
                    base_dir_joint = tracing::field::display(
                        normalize_path(base_dir.join(module_specifier)).display()
                    ),
                    // base_dir.join(module_specifier).display(),
                    "tsc resolve relative",
                );
            }

            return self.wrap(Some(normalize_path(base_dir.join(module_specifier))));

            // return self.inner.resolve(base, module_specifier).context(
            //     "not processed by tsc resolver because it's relative
            // import",
            // );
        }

        bail!("tsc-resolver past relative");

        // if cfg!(debug_assertions) {
        //     debug!("non-relative import");
        // }

        // if let FileName::Real(v) = base {
        //     if v.components().any(|c| match c {
        //         Component::Normal(v) => v == "node_modules",
        //         _ => false,
        //     }) {
        //         return self.inner.resolve(base, module_specifier).context(
        //             "not processed by tsc resolver because base module is in
        // node_modules",         );
        //     }
        // }

        // // https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
        // for (from, to) in &self.paths {
        //     match from {
        //         Pattern::Wildcard { prefix } => {
        //             let extra = module_specifier.strip_prefix(prefix);
        //             let extra = match extra {
        //                 Some(v) => v,
        //                 None => {
        //                     if cfg!(debug_assertions) {
        //                         trace!("skip because src doesn't start with
        // prefix");                     }
        //                     continue;
        //                 }
        //             };

        //             if cfg!(debug_assertions) {
        //                 trace!("extra = {}", extra);
        //             }

        //             let mut errors = vec![];
        //             for target in to {
        //                 let mut replaced = target.replace('*', extra);
        //                 let rel = format!("./{}", replaced);

        //                 let res = self.inner.resolve(base,
        // &rel).with_context(|| {                     format!(
        //                         "failed to resolve `{}`, which is expanded
        // from `{}`",                         replaced,
        // module_specifier                     )
        //                 });

        //                 errors.push(match res {
        //                     Ok(v) => return Ok(v),
        //                     Err(err) => err,
        //                 });

        //                 if cfg!(target_os = "windows") {
        //                     if replaced.starts_with("./") {
        //                         replaced = replaced[2..].to_string();
        //                     }
        //                     replaced = replaced.replace('/', "\\");
        //                 }

        //                 if to.len() == 1 {
        //                     return
        // Ok(FileName::Real(self.base_url.join(replaced)));
        // }             }

        //             bail!(
        //                 "`{}` matched `{}` (from tsconfig.paths) but failed
        // to resolve:\n{:?}",                 module_specifier,
        //                 prefix,
        //                 errors
        //             )
        //         }
        //         Pattern::Exact(from) => {
        //             // Should be exactly matched
        //             if module_specifier == from {
        //                 let replaced = self.base_url.join(&to[0]);
        //                 if replaced.exists() {
        //                     return Ok(FileName::Real(replaced));
        //                 }

        //                 return self
        //                     .inner
        //                     .resolve(base, &format!("./{}", &to[0]))
        //                     .with_context(|| {
        //                         format!(
        //                             "tried to resolve `{}` because `{}` was
        // exactly matched",                             to[0], from
        //                         )
        //                     });
        //             }
        //         }
        //     }
        // }

        // if let Ok(v) = self
        //     .inner
        //     .resolve(&self.base_url_filename, module_specifier)
        // {
        //     return Ok(v);
        // }

        // self.inner.resolve(base, module_specifier)
    }
}
