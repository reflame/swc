#![deny(clippy::all)]
#![allow(clippy::mutable_key_type)]
#![allow(clippy::arc_with_non_send_sync)]
#![allow(rustc::untranslatable_diagnostic_trivial)]

use serde::{Deserialize, Serialize};
use swc_common::chain;
use swc_config::merge::Merge;
use swc_ecma_transforms_base::pass::Optional;
use swc_ecma_visit::{Fold, VisitMut};

pub use self::{
    refresh_setup::refresh_setup, remove_test_exports::remove_test_exports,
    rewrite_relative_imports::rewrite_relative_imports,
};

mod refresh_setup;
mod remove_test_exports;
mod rewrite_relative_imports;

#[derive(Debug, Default, Clone, Serialize, Deserialize, Eq, PartialEq, Merge)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct Options {
    #[serde(default)]
    pub pathname: String,

    #[serde(default)]
    pub pathname_scoped: String,

    #[serde(default)]
    pub refresh_setup: Option<bool>,

    #[serde(default)]
    pub rewrite_relative_imports: Option<bool>,

    #[serde(default)]
    pub remove_test_exports: Option<bool>,
}

// pub fn reflame<C>(options: Options) -> impl Fold + VisitMut {
//     let pathname = options.pathname;
//     let pathname_scoped = options.pathname_scoped;

//     chain!(
//         Optional::new(
//             remove_test_exports(),
//             options.remove_test_exports.is_some_and(|value| value)
//         ),
//         Optional::new(
//             refresh_setup(pathname_scoped),
//             options.refresh_setup.is_some_and(|value| value)
//         ),
//         Optional::new(
//             rewrite_relative_imports(pathname),
//             options.rewrite_relative_imports.is_some_and(|value| value)
//         )
//     )
// }
