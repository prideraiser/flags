// @ts-check

/**
 * Rollup configuration for Web Components
 *
 * This is a template configuration. Adjust based on your project needs:
 * - Add/remove plugins as needed
 * - Adjust input/output paths
 * - Configure for library vs application builds
 */

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
import summary from "rollup-plugin-summary";

// Set to true for production builds
const production = !process.env["ROLLUP_WATCH"];

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    // Resolve bare module specifiers to relative paths
    resolve(),

    // Convert CommonJS modules to ES6
    commonjs(),

    // Import JSON files
    json(),

    // Compile TypeScript
    typescript({
      declaration: true,
      declarationDir: "dist/types",
      rootDir: "src",
    }),

    // Minify in production
    production &&
      terser({
        ecma: 2020,
        module: true,
      }),

    // Print bundle summary
    summary(),

    // Copy to docs folder for demo site
    {
      name: "copy-to-docs",
      writeBundle() {
        mkdirSync("docs/dist", { recursive: true });
        copyFileSync("dist/index.js", "docs/dist/index.js");

        // Fix sourcemap paths for docs folder
        const sourcemap = JSON.parse(
          readFileSync("dist/index.js.map", "utf-8"),
        );
        // Adjust paths from ../src to ../../src
        sourcemap.sources = sourcemap.sources.map(
          (/** @type {string} */ source) =>
            source.replace(/^\.\.\/src\//, "../../src/"),
        );
        writeFileSync("docs/dist/index.js.map", JSON.stringify(sourcemap));
      },
    },
  ],

  watch: {
    include: "src/**",
    exclude: "node_modules/**",
    clearScreen: false,
  },

  preserveEntrySignatures: "strict",
};
