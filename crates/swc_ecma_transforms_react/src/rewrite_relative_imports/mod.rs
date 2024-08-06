use std::path::{Component, Path, PathBuf};

use serde::{Deserialize, Serialize};
use swc_atoms::JsWord;
use swc_common::FileName;
use swc_config::Error;
use swc_ecma_transforms_module::{path::ImportResolver, rewriter::import_rewriter};
use swc_ecma_visit::{Fold, VisitMut};

#[derive(Debug, Default, Clone, Serialize, Deserialize, Eq, PartialEq)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct RewriteRelativeImportsOptions {
    pub pathname: Option<String>,
}

#[cfg(test)]
mod tests;

pub fn rewrite_relative_imports(
    options: Option<RewriteRelativeImportsOptions>,
) -> impl Fold + VisitMut {
    match &options {
        Some(RewriteRelativeImportsOptions {
            pathname: Some(pathname),
        }) => import_rewriter(
            FileName::Custom(pathname.to_string()),
            Resolver { enable: true },
        ),
        _ => import_rewriter(FileName::Custom("".to_string()), Resolver { enable: false }),
    }
}

struct Resolver {
    enable: bool,
}

impl ImportResolver for Resolver {
    fn resolve_import(&self, base: &FileName, module_specifier: &str) -> Result<JsWord, Error> {
        if !self.enable {
            return Ok(module_specifier.into());
        }

        match base {
            FileName::Custom(base) => Ok(resolve_relative_path(base, module_specifier)
                .to_string_lossy()
                .into()),
            _ => Ok(module_specifier.into()),
        }
    }
}

fn is_bare_specifier(path: &Path) -> bool {
    if let Some(first_component) = path.components().next() {
        matches!(first_component, Component::Normal(_))
    } else {
        false
    }
}

fn resolve_relative_path(base: &str, relative: &str) -> PathBuf {
    let base_path = Path::new(base);
    let relative_path = Path::new(relative);

    if relative_path.is_absolute() || is_bare_specifier(relative_path) {
        return relative_path.to_path_buf();
    }

    let base_directory = base_path.parent().unwrap_or_else(|| Path::new(""));
    let combined_path = base_directory.join(relative_path);

    let mut parts = Vec::new();
    for component in combined_path.components() {
        match component {
            Component::ParentDir => {
                if parts
                    .last()
                    .map(|c| *c != Component::RootDir)
                    .unwrap_or(false)
                {
                    parts.pop();
                } else {
                    parts.push(component);
                }
            }
            Component::CurDir => {}
            _ => parts.push(component),
        }
    }

    let mut normalized_path = PathBuf::new();
    for part in parts {
        normalized_path.push(part);
    }

    #[cfg(windows)]
    let normalized_str = normalized_path.to_str().unwrap_or("").replace("\\", "/");
    #[cfg(windows)]
    return PathBuf::from(normalized_str);

    #[cfg(not(windows))]
    normalized_path
}
