#![deny(clippy::all)]
#![allow(clippy::arc_with_non_send_sync)]

use swc_common::{chain, comments::Comments, sync::Lrc, Mark, SourceMap};
use swc_ecma_visit::{Fold, VisitMut};

pub use self::{
    display_name::display_name,
    jsx::*,
    jsx_self::jsx_self,
    jsx_src::jsx_src,
    pure_annotations::pure_annotations,
    refresh::{options::RefreshOptions, refresh},
    refresh_setup::{refresh_setup, RefreshSetupOptions},
};
use crate::remove_test_exports::remove_test_exports;

mod display_name;
mod jsx;
mod jsx_self;
mod jsx_src;
mod pure_annotations;
mod refresh;
mod refresh_setup;
mod remove_test_exports;

/// `@babel/preset-react`
///
/// Preset for all React plugins.
///
///
/// `top_level_mark` should be [Mark] passed to
/// [swc_ecma_transforms_base::resolver::resolver_with_mark].
///
///
///
/// # Note
///
/// This pass uses [swc_ecma_utils::HANDLER].
pub fn react<C>(
    cm: Lrc<SourceMap>,
    comments: Option<C>,
    mut options: Options,
    top_level_mark: Mark,
    unresolved_mark: Mark,
) -> impl Fold + VisitMut
where
    C: Comments + Clone,
{
    let Options { development, .. } = options;
    let development = development.unwrap_or(false);

    let refresh_options = options.refresh.take();
    let refresh_setup_options = options.refresh_setup.take();
    let remove_test_exports_options = options.remove_test_exports.take();

    chain!(
        remove_test_exports(remove_test_exports_options),
        jsx_src(development, cm.clone()),
        jsx_self(development),
        refresh(
            development,
            refresh_options,
            cm.clone(),
            comments.clone(),
            top_level_mark
        ),
        refresh_setup(development, refresh_setup_options),
        jsx(
            cm,
            comments.clone(),
            options,
            top_level_mark,
            unresolved_mark
        ),
        display_name(),
        pure_annotations(comments),
    )
}
