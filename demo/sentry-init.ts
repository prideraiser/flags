// Error reporting for the demo site (flags.prideraiser.org) only - not part
// of the published @prideraiser/flags package (src/, dist/), and not loaded
// by consumers embedding <pride-flag> on their own sites. Bundled and
// deployed separately, see rollup.config.js's second build target.
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://7886e4ad35364ba9ad4682c3861acfea@errors.dryan.tech/22",
  tracesSampleRate: 0,
});
