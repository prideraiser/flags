/**
 * Represents a color stripe in a pride flag
 */
export interface FlagStripe {
  color: string;
  height?: number; // Percentage or ratio, defaults to equal distribution
}

/**
 * Represents a pride flag's data structure
 */
export interface FlagData {
  slug: string;
  name: string;
  description?: string;
  colors: string[];
  decoration?: string;
  decoratorPosition?: "hoist" | "center" | "fly" | "canton" | "bear";
  // Legacy fields
  stripes?: FlagStripe[];
  customSvg?: string;
}

/**
 * API response for all flags
 */
export interface FlagsApiResponse {
  flags: FlagData[];
}

/**
 * Represents an awareness period/celebration
 */
export interface AwarenessPeriod {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  flag_slugs?: string[]; // Array of flag slugs associated with this period
  description?: string;
}

/**
 * API response for current awareness periods
 */
export interface AwarenessPeriodsApiResponse {
  periods: AwarenessPeriod[];
}
