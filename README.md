# Color Theme Generator

A modern color theme generator for design systems, built with Vue.js 3, Nuxt.js, and Tailwind CSS. This tool helps designers and developers create consistent color palettes for their projects.

## Features

- Generate complete color palettes from a single base color
- Create semantic color tokens (primary, secondary, etc.) mapped to specific colors
- Export configurations for Tailwind CSS
- Export tokens for Figma
- Server-side color generation logic for security

## Tech Stack

- **Frontend**: Vue.js 3, Nuxt.js
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome
- **Color Manipulation**: Chroma.js

## How It Works

1. Choose a base color using the color picker or by entering a hex value
2. Click "Generate Theme" to create a complete color palette
3. View the generated colors, including semantic tokens and color scales
4. Export the configuration for use in your projects

## Color Generation Logic

The color generator creates:

- **Named Colors**: ~12 color primitives (red, blue, green, etc.) with consistent relationships
- **Color Shades**: 10 shades for each color (50-950)
- **Semantic Tokens**: Purpose-named colors (primary, secondary, danger, etc.) mapped to specific colors

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/color-generator.git
cd color-generator
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Generate Static Site

```bash
npm run generate
# or
yarn generate
```

## Usage in Your Projects

### Tailwind CSS

1. Copy the generated Tailwind configuration
2. Paste it into your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Paste generated colors here
      }
    }
  }
}
```

### Figma

1. Download the Figma tokens JSON file
2. Import it into Figma using a plugin like "Figma Tokens"

## License

MIT