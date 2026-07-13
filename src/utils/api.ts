import type { AwarenessPeriod } from "../types/flag.js";
import flagsData from "../data/flags-data.json";

const API_BASE_URL = "https://www.prideraiser.org/api/v2";
const AWARENESS_ENDPOINT = `${API_BASE_URL}/awareness-periods/current`;

interface FlagData {
  slug: string;
  name: string;
  colors: string[];
  decoration?: string;
  decoratorPosition?: string;
}

// Cache for awareness period data
let awarenessPeriodCache: AwarenessPeriod[] | null = null;

/**
 * Gets all available pride flags from local data
 *
 * @returns Array of flag data
 */
export function getFlags(): FlagData[] {
  return flagsData as FlagData[];
}

/**
 * Gets a specific flag by its slug from local data
 *
 * @param slug - The flag's slug identifier
 * @returns Flag data or null if not found
 */
export function getFlagBySlug(slug: string): FlagData | null {
  const flags = getFlags();
  return flags.find((flag) => flag.slug === slug) || null;
}

/**
 * Fetches current awareness periods/celebrations from the API
 *
 * @param useCache - Whether to use cached data (default: true)
 * @returns Promise resolving to array of awareness periods
 */
export async function fetchCurrentAwarenessPeriods(
  useCache = true,
): Promise<AwarenessPeriod[]> {
  if (useCache && awarenessPeriodCache) {
    return awarenessPeriodCache;
  }

  try {
    const response = await fetch(AWARENESS_ENDPOINT);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    awarenessPeriodCache = data;
    return data;
  } catch (error) {
    console.warn("Failed to fetch awareness periods from API:", error);
    return [];
  }
}

/**
 * Gets all flag slugs associated with current awareness periods
 *
 * @returns Promise resolving to array of flag slugs
 */
export async function getCurrentAwarenessFlagSlugs(): Promise<string[]> {
  const periods = await fetchCurrentAwarenessPeriods();
  const slugs = new Set<string>();

  periods.forEach((period) => {
    period.flag_slugs?.forEach((slug) => slugs.add(slug));
  });

  return Array.from(slugs);
}

/**
 * Clears cached awareness period data
 */
export function clearCache(): void {
  awarenessPeriodCache = null;
}
