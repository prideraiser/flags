export default {
  extends: ["@dryan/pedantry/stylelint"],
  ignoreFiles: [
    "node_modules/**",
    "dist/**",
    "build/**",
    "coverage/**",
    "__pycache__/**",
    ".venv/**",
    "venv/**",
    "docs/styles/normalize.css",
  ],
};
