# @prideraiser/flags

[![npm version](https://badge.fury.io/js/@prideraiser%2Fflags.svg)](https://www.npmjs.com/package/@prideraiser/flags)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Web components for displaying LGBTQ+ pride flags. Built with vanilla TypeScript and Web Components, providing accessible, customizable flag components.

**[View Demo →](https://flags.prideraiser.org)**

## Features

- 🏳️‍🌈 **36 Pride Flags** - Comprehensive collection of LGBTQ+ pride flags
- ⚡ **Vanilla Web Components** - Fast, lightweight, and framework-agnostic
- 🎨 **SVG-Based** - Crisp rendering at any size
- ♿ **Accessible** - Built with ARIA labels and semantic HTML
- 📦 **TypeScript** - Full type safety and IntelliSense support
- 💾 **Bundled Data** - Flag data is bundled locally for fast, offline-first performance
- 🎯 **Current Flag** - Use `flag-variant="current"` to display the flag for the current awareness period

## Installation

### Via npm

```bash
npm install @prideraiser/flags
```

Then import in your JavaScript/TypeScript:

```typescript
import { PrideFlag } from "@prideraiser/flags";
```

### Via CDN

Add this script tag to your HTML file:

```html
<script
  type="module"
  src="https://unpkg.com/@prideraiser/flags@latest"
  async
></script>
```

Or use a specific version for production:

```html
<script
  type="module"
  src="https://unpkg.com/@prideraiser/flags@0.1.0"
  async
></script>
```

Alternative CDNs:

```html
<!-- jsDelivr -->
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@prideraiser/flags@latest"
  async
></script>

<!-- esm.sh -->
<script type="module" src="https://esm.sh/@prideraiser/flags" async></script>
```

## Quick Start

### Use in HTML

```html
<pride-flag flag-variant="transgender"></pride-flag>
<pride-flag flag-variant="6-stripe" width="400" height="267"></pride-flag>
<pride-flag flag-variant="lesbian" width="300" height="200"></pride-flag>
```

### Full Example (No Build Tools Required)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pride Flags</title>
    <script
      type="module"
      src="https://unpkg.com/@prideraiser/flags@latest"
      async
    ></script>
  </head>
  <body>
    <h1>Pride Flags</h1>
    <pride-flag flag-variant="progress"></pride-flag>
    <pride-flag flag-variant="trans" width="400" height="267"></pride-flag>
  </body>
</html>
```

## API Reference

### `<pride-flag>` Component

#### Attributes

| Attribute      | Type   | Default              | Description                  |
| -------------- | ------ | -------------------- | ---------------------------- |
| `flag-variant` | string | "progress-inclusive" | Slug of the flag to display  |
| `width`        | number | 300                  | Width of the flag in pixels  |
| `height`       | number | 200                  | Height of the flag in pixels |

#### Events

| Event         | Description                                           | Detail                                                         |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| `flag-loaded` | Fired when flag data is loaded successfully           | `{ flag: FlagData, awarenessPeriod: AwarenessPeriod \| null }` |
| `flag-error`  | Fired when flag fails to load (falls back to default) | `{ error: string, awarenessPeriod: null }`                     |

The `awarenessPeriod` property is only present (non-null) when using `flag-variant="current"`. It includes the awareness period name, dates, description, and related information.

#### CSS Parts

| Part   | Description     |
| ------ | --------------- |
| `flag` | The SVG element |

#### Example with Custom Styling

```css
pride-flag::part(flag) {
  border: 2px solid #333;
  border-radius: 8px;
}
```

#### Responsive Width

To make flags responsive to their container width, set the display to block:

```css
pride-flag {
  display: block;
}
```

The component maintains its aspect ratio automatically, so the height will scale proportionally with the width.

## Available Flags

All flags are based on the community-maintained collection at [prideraiser.org/brand](https://www.prideraiser.org/brand/).

### Common Flags

- `6-stripe` - Gilbert Baker 6 Stripe (iconic rainbow)
- `8-stripe` - Gilbert Baker 8 Stripe (original rainbow)
- `progress` - Progress Pride
- `transgender` - Transgender Pride
- `bisexual` - Bisexual Pride
- `lesbian` - Lesbian Pride
- `pansexual` - Pansexual Pride
- `asexual` - Asexual Pride
- `nonbinary` - Nonbinary Pride
- `genderfluid` - Genderfluid Pride
- `agender` - Agender Pride

[See full list →](https://www.prideraiser.org/brand/)

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import type { FlagVariant, AwarenessPeriod } from "@prideraiser/flags";

// FlagVariant is a union type of all valid flag slugs
const variant: FlagVariant = "progress"; // Type-safe!

// Use "current" to display the flag for the current awareness period
const currentVariant: FlagVariant = "current";
```

Valid `FlagVariant` values (37 total): `"6-stripe"` | `"8-stripe"` | `"abrosexual"` | `"agender"` | `"aromantic"` | `"asexual"` | `"bear"` | `"bigender"` | `"bisexual"` | `"current"` | `"demiboy"` | `"demigender"` | `"demigirl"` | `"demiromantic"` | `"demisexual"` | `"drag"` | `"gay"` | `"genderfae"` | `"genderfluid"` | `"genderflux"` | `"genderqueer"` | `"gnc"` | `"intersex"` | `"leather"` | `"lesbian"` | `"maverique"` | `"nonbinary"` | `"pansexual"` | `"pink"` | `"polyamory"` | `"polysexual"` | `"progress"` | `"queer"` | `"trans"` | `"trans-feminine"` | `"trans-masculine"` | `"two-spirit"`

## Accessibility

- **ARIA Labels**: Each flag includes proper `role="img"` and `aria-label`
- **SVG Titles**: Screen reader friendly descriptions
- **Semantic HTML**: Proper document structure
- **High Contrast**: Flags use community-standard colors

## Framework Integration

### React

```jsx
import "@prideraiser/flags";

function App() {
  return (
    <div>
      <pride-flag flag-variant="transgender" width={300} height={200} />
    </div>
  );
}
```

### Vue

```vue
<template>
  <pride-flag flag-variant="lesbian" :width="300" :height="200" />
</template>

<script setup>
import "@prideraiser/flags";
</script>
```

### Svelte

```svelte
<script>
  import '@prideraiser/flags';
</script>

<pride-flag flag-variant="pansexual" width={300} height={200} />
```

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/prideraiser/flags.git
cd flags

# Install dependencies
npm install

# Build the project and serve docs locally
npm run build
npm run serve
```

### Scripts

```bash
npm run build         # Build for production
npm run serve         # Serve docs folder locally
npm run lint          # Lint all code
npm run lint:fix      # Fix linting issues
npm run format        # Format with Prettier
npm test              # Run tests
npm run test:browser  # Run browser tests
```

## Contributing

We welcome contributions! This project is part of [Prideraiser](https://www.prideraiser.org/), a coalition dedicated to cultivating inclusive soccer communities.

To add a new flag:

1. Check if it exists at [prideraiser.org/brand](https://www.prideraiser.org/brand/)
2. If not, [contact us](mailto:info@prideraiser.org) to request it be added
3. Once added to the main site, it will automatically appear in this package

## License

MIT © [Prideraiser](https://www.prideraiser.org/)

## Support

- **Issues**: [GitHub Issues](https://github.com/prideraiser/flags/issues)
- **Email**: [info@prideraiser.org](mailto:info@prideraiser.org)
- **Website**: [prideraiser.org](https://www.prideraiser.org/)

## Acknowledgments

- Flag designs were created by various individuals and communities, who may hold copyright on their respective designs
- We use these flag designs in good faith to promote LGBTQ+ visibility and pride
- We make no claim of copyright ownership over any flag designs
- Usage of this package does not guarantee freedom from copyright claims on flag designs
- Flag data maintained by the Prideraiser community
- Built with vanilla [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and [TypeScript](https://www.typescriptlang.org/)

---

Part of the [Prideraiser](https://www.prideraiser.org/) project - Support your local club, support your local cause.
