import type { FlagVariant } from "../data/flags.js";
import flagsData from "../data/flags-data.json";

interface FlagData {
  slug: string;
  name: string;
  colors: string[];
  decoration?: string;
  decoratorPosition?: string;
}

const CURRENT_FLAG_API =
  "https://www.prideraiser.org/api/v2/awareness-periods/current/";

// Shared stylesheet for all pride-flag instances (CSP-friendly)
const sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(`
  :host {
    display: inline-block;
    aspect-ratio: 3 / 2;

    svg {
      display: block;
      inline-size: 100%;
      block-size: auto;
    }
  }

`);

/**
 * A pride flag web component that renders SVG flags
 *
 * @element pride-flag
 *
 * @attr {FlagVariant} flag-variant - The slug of the flag to display. Use "current" for the current awareness period flag.
 * @attr {number} width - Width of the flag in pixels (default: 300)
 * @attr {number} height - Height of the flag in pixels (default: 200)
 *
 * @fires flag-loaded - Dispatched when flag data is loaded
 * @fires flag-error - Dispatched when flag data fails to load
 *
 * @csspart flag - The SVG element containing the flag
 */
export class PrideFlag extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private _flagData: FlagData | null = null;

  static get observedAttributes() {
    return ["flag-variant", "width", "height"];
  }

  /**
   * Get all available flag variants
   *
   * @returns Array of flag data objects
   */
  static getVariants(): FlagData[] {
    return flagsData as FlagData[];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.adoptedStyleSheets = [sharedStyles];
  }

  connectedCallback() {
    // Show loading state immediately
    this._render();
    // Then load flag data
    this._loadFlagData();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      if (name === "flag-variant") {
        this._loadFlagData();
      } else {
        this._render();
      }
    }
  }

  get flagVariant(): FlagVariant | "current" {
    return (
      (this.getAttribute("flag-variant") as FlagVariant | "current") ||
      "progress-inclusive"
    );
  }

  set flagVariant(value: FlagVariant | "current") {
    this.setAttribute("flag-variant", value);
  }

  get width(): number {
    return parseInt(this.getAttribute("width") || "300", 10);
  }

  set width(value: number) {
    this.setAttribute("width", String(value));
  }

  get height(): number {
    return parseInt(this.getAttribute("height") || "200", 10);
  }

  set height(value: number) {
    this.setAttribute("height", String(value));
  }

  private async _loadFlagData() {
    try {
      const variant = this.flagVariant;

      if (variant === "current") {
        // Fetch current awareness period flag
        const response = await fetch(CURRENT_FLAG_API);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Get the flag slug from current awareness period
        const currentSlug = data.awareness_period?.mark;
        if (!currentSlug) {
          throw new Error("No current awareness period flag found");
        }

        const flag = (flagsData as FlagData[]).find(
          (f) => f.slug === currentSlug,
        );
        if (!flag) {
          throw new Error(`Flag variant "${currentSlug}" not found`);
        }
        this._flagData = flag;
      } else {
        // Use local data
        const flag = (flagsData as FlagData[]).find((f) => f.slug === variant);
        if (!flag) {
          throw new Error(`Flag variant "${variant}" not found`);
        }
        this._flagData = flag;
      }

      this._render();

      this.dispatchEvent(
        new CustomEvent("flag-loaded", {
          detail: { flag: this._flagData },
          bubbles: true,
          composed: true,
        }),
      );
    } catch (error) {
      // Log error and fall back to default flag
      console.warn(
        `Failed to load flag variant "${this.flagVariant}": ${error instanceof Error ? error.message : String(error)}. Falling back to default (progress-inclusive).`,
      );

      // Load default flag (progress-inclusive), or first available flag as last resort
      const defaultFlag =
        (flagsData as FlagData[]).find(
          (f) => f.slug === "progress-inclusive",
        ) || (flagsData as FlagData[])[0];

      if (defaultFlag) {
        this._flagData = defaultFlag;
      }

      // Always render, even if no flag data is available (will show loading state)
      this._render();

      this.dispatchEvent(
        new CustomEvent("flag-error", {
          detail: {
            error: error instanceof Error ? error.message : String(error),
          },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private _renderStripes(): string {
    if (!this._flagData) return "";

    const { colors } = this._flagData;
    const totalHeight = this.height;
    const stripeHeight = totalHeight / colors.length;

    return colors
      .map((color, index) => {
        const y = index * stripeHeight;
        const height = totalHeight - y;
        return `<rect x="0" y="${y}" width="${this.width}" height="${height}" fill="${color}" />`;
      })
      .join("");
  }

  private _renderDecoration(): string {
    if (!this._flagData?.decoration) return "";

    const position = this._flagData.decoratorPosition || "center";
    // Add id and data-position to the decoration's root element
    const decoration = this._flagData.decoration.replace(
      /^(<\w+)/,
      `$1 id="decoration" data-position="${position}"`,
    );
    return decoration;
  }

  private _positionDecoration() {
    const decoration = this._shadowRoot.querySelector("#decoration");
    if (!decoration) return;

    const bbox = (decoration as SVGGraphicsElement).getBBox();
    const position = decoration.getAttribute("data-position") || "center";

    let transform: string;

    if (position === "bear") {
      transform = `translate(15, 15) scale(1.5)`;
    } else {
      let x = 0;
      let y = this.height / 2 - bbox.height / 2;

      if (position === "center") {
        x = this.width / 2 - bbox.width / 2;
      } else if (position === "hoist") {
        x = 0;
      } else if (position === "fly") {
        x = this.width - bbox.width;
      } else if (position === "canton") {
        x = this.width / 6 - bbox.width / 2;
        y = this.height / 4 - bbox.height / 2;
      }

      transform = `translate(${x}, ${y})`;
    }

    decoration.setAttribute("transform", transform);
  }

  private _render() {
    if (!this._flagData) {
      this._shadowRoot.innerHTML = `
        <svg
          part="flag"
          width="${this.width}"
          height="${this.height}"
          viewBox="0 0 ${this.width} ${this.height}"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Loading flag..."
        >
          <rect x="0" y="0" width="${this.width}" height="${this.height}" fill="Canvas" />
        </svg>
      `;
      return;
    }

    this._shadowRoot.innerHTML = `
      <svg
        part="flag"
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="${this._flagData.name} pride flag"
      >
        <title>${this._flagData.name} Pride Flag</title>
        ${this._renderStripes()}
        ${this._renderDecoration()}
      </svg>
    `;

    this._positionDecoration();
  }
}

// Register the custom element
if (!customElements.get("pride-flag")) {
  customElements.define("pride-flag", PrideFlag);
}

// HMR support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    // Force all existing instances to re-render
    document.querySelectorAll("pride-flag").forEach((el) => {
      if (el instanceof PrideFlag) {
        const variant = el.getAttribute("flag-variant");
        if (variant) {
          (el as PrideFlag).attributeChangedCallback(
            "flag-variant",
            variant,
            variant,
          );
        }
      }
    });
  });
}

declare global {
  interface ImportMeta {
    hot?: {
      accept: (callback: () => void) => void;
    };
  }

  interface HTMLElementTagNameMap {
    "pride-flag": PrideFlag;
  }
}
