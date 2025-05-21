const express = require('express')
const chroma = require('chroma-js')

const app = express()
app.use(express.json())

// Color name mapping
const COLOR_NAMES = {
  red: { hue: 0 },
  orange: { hue: 30 },
  amber: { hue: 45 },
  yellow: { hue: 60 },
  lime: { hue: 90 },
  green: { hue: 120 },
  emerald: { hue: 140 },
  teal: { hue: 160 },
  cyan: { hue: 180 },
  sky: { hue: 200 },
  blue: { hue: 240 },
  indigo: { hue: 260 },
  violet: { hue: 270 },
  purple: { hue: 280 },
  fuchsia: { hue: 300 },
  pink: { hue: 330 }
}

// Default token mapping
const DEFAULT_TOKENS = {
  primary: 'blue',
  secondary: 'purple',
  accent: 'emerald',
  neutral: 'gray',
  info: 'sky',
  success: 'green',
  warning: 'amber',
  danger: 'red',
  light: 'gray-100',
  dark: 'gray-900'
}

// Generate shades for a color
function generateShades(baseColor) {
  const color = chroma(baseColor)
  const shades = {}
  
  // Generate 10 shades (50-950)
  for (let i = 1; i <= 10; i++) {
    const weight = i * 100 - 50
    let shade
    
    if (i <= 5) {
      // Lighter shades (mix with white)
      const mixAmount = 1 - (i - 1) / 4
      shade = chroma.mix(color, 'white', mixAmount, 'rgb')
    } else {
      // Darker shades (mix with black)
      const mixAmount = (i - 5) / 5
      shade = chroma.mix(color, 'black', mixAmount, 'rgb')
    }
    
    shades[weight] = shade.hex()
  }
  
  return shades
}

// Generate a color palette based on a base color
function generatePalette(baseColor) {
  const baseHsl = chroma(baseColor).hsl()
  const baseHue = baseHsl[0] || 0 // Handle achromatic colors
  
  const palette = {}
  
  // Generate gray scale
  palette.gray = generateShades(chroma.hsl(baseHue, 0.05, 0.5))
  
  // Generate named colors
  Object.entries(COLOR_NAMES).forEach(([name, { hue }]) => {
    // Use the base color's saturation and lightness with the color's hue
    const colorBase = chroma.hsl(hue, baseHsl[1], baseHsl[2])
    palette[name] = generateShades(colorBase)
  })
  
  return palette
}

// Map tokens to colors
function mapTokensToColors(palette, tokenMapping = {}) {
  const tokens = { ...DEFAULT_TOKENS, ...tokenMapping }
  const mappedTokens = {}
  
  Object.entries(tokens).forEach(([token, colorRef]) => {
    // Handle format like "blue-500"
    if (colorRef.includes('-')) {
      const [colorName, shade] = colorRef.split('-')
      if (palette[colorName] && palette[colorName][shade]) {
        mappedTokens[token] = palette[colorName][shade]
      }
    } 
    // Handle just color name (use 500 as default)
    else if (palette[colorRef]) {
      mappedTokens[token] = palette[colorRef][500]
    }
  })
  
  return mappedTokens
}

// Generate Tailwind config
function generateTailwindConfig(palette) {
  const colors = {}
  
  Object.entries(palette).forEach(([colorName, shades]) => {
    colors[colorName] = {}
    Object.entries(shades).forEach(([shade, hex]) => {
      colors[colorName][shade] = hex
    })
  })
  
  return colors
}

// Generate Figma tokens
function generateFigmaTokens(palette, tokens) {
  const figmaTokens = {
    colors: {
      primitives: {},
      semantic: {}
    }
  }
  
  // Add primitives
  Object.entries(palette).forEach(([colorName, shades]) => {
    figmaTokens.colors.primitives[colorName] = {}
    Object.entries(shades).forEach(([shade, hex]) => {
      figmaTokens.colors.primitives[colorName][shade] = {
        value: hex,
        type: 'color'
      }
    })
  })
  
  // Add semantic tokens
  Object.entries(tokens).forEach(([token, hex]) => {
    figmaTokens.colors.semantic[token] = {
      value: hex,
      type: 'color'
    }
  })
  
  return figmaTokens
}

// API endpoint to generate colors
app.post('/generate', (req, res) => {
  try {
    const { baseColor, tokenMapping } = req.body
    
    if (!baseColor) {
      return res.status(400).json({ error: 'Base color is required' })
    }
    
    // Generate the color palette
    const palette = generatePalette(baseColor)
    
    // Map tokens to colors
    const tokens = mapTokensToColors(palette, tokenMapping)
    
    // Generate Tailwind config
    const tailwindConfig = generateTailwindConfig(palette)
    
    // Generate Figma tokens
    const figmaTokens = generateFigmaTokens(palette, tokens)
    
    res.json({
      palette,
      tokens,
      tailwindConfig,
      figmaTokens
    })
  } catch (error) {
    console.error('Error generating colors:', error)
    res.status(500).json({ error: 'Failed to generate colors' })
  }
})

module.exports = app