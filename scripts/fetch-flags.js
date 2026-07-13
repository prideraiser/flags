#!/usr/bin/env node

/**
 * Fetch flag data from the Prideraiser API and save it locally
 */

import { config } from "dotenv";
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL =
  process.env["PRIDERAISER_API_URL"] ||
  "https://www.prideraiser.org/api/v2/flags/";
const OUTPUT_FILE = join(__dirname, "../src/data/flags-data.json");

async function fetchFlags() {
  try {
    console.log(`Fetching flags from ${API_URL}...`);

    const response = await fetch(API_URL, {
      headers: {
        "User-Agent": "prideraiser-flags-builder/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const flags = await response.json();

    console.log(`Fetched ${flags.length} flags`);

    // Transform API data to our format and filter out "diy"
    const transformedFlags = flags
      .filter((flag) => flag.slug !== "diy")
      .map((flag) => {
        const data = {
          slug: flag.slug,
          name: flag.name,
          colors: flag.colors,
        };

        // Add decoration and position if they exist
        if (flag.decoration) {
          data.decoration = flag.decoration;
          data.decoratorPosition = flag.decorator_position;
        }

        return data;
      });

    // Sort by slug for consistency
    transformedFlags.sort((a, b) => a.slug.localeCompare(b.slug));

    // Write to file with pretty formatting
    await writeFile(
      OUTPUT_FILE,
      JSON.stringify(transformedFlags, null, 2) + "\n",
      "utf-8",
    );

    console.log(`✓ Saved ${transformedFlags.length} flags to ${OUTPUT_FILE}`);

    // Print the slugs for FlagVariant type
    console.log("\nAvailable flag slugs:");
    transformedFlags.forEach((flag) => {
      console.log(`  - ${flag.slug}`);
    });
  } catch (error) {
    console.error("Error fetching flags:", error.message);
    process.exit(1);
  }
}

fetchFlags();
