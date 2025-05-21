module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      // We'll dynamically extend colors based on user input
      colors: {
        // Default colors will be overridden by generated ones
      }
    },
  },
  plugins: [],
  safelist: [
    // Safelist all color classes that might be generated dynamically
    { pattern: /bg-.*/ },
    { pattern: /text-.*/ },
    { pattern: /border-.*/ }
  ]
}