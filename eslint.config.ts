import type { Linter } from "eslint";
import pedantryConfig from "@dryan/pedantry/eslint";

const config: Linter.Config[] = [
  ...pedantryConfig,
  {
    ignores: ["docs/dist/**", "docs/sentry-init.js", "docs/sentry-init.js.map"],
  },
];

export default config;
