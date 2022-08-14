module.exports = {

  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: ['IBM Plex Mono'],
    },
    extend: {
    },
    borderRadius: {
      'none': '0',
      'sm': '1px',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}