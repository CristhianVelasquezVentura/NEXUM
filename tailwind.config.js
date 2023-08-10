const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content:['./src/**/*.{html,ts,js}'],
  darkMode: 'class',
  theme: {
    colors: {
      black: 'var(--c-fl-black)',
      white: 'var(--c-fl-white)',
      zc: {
        50: 'var(--c-fl-zc-50)',
        200: 'var(--c-fl-zc-200)',
        400: 'var(--c-fl-zc-400)',
        600: 'var(--c-fl-zc-600)',
        800: 'var(--c-fl-zc-800)',
        900: 'var(--c-fl-zc-900)',
      },
      brand: {
        c: 'var(--c-fl-brand)',
        l: 'var(--c-fl-brand-light)',
        d: 'var(--c-fl-brand-dark)',
        g: 'var(--c-fl-brand-gradient)',
      },
      alert: {
        error: 'var(--c-fl-alert-error)',
        success: 'var(--c-fl-alert-success)',
        info: 'var(--c-fl-alert-info)',
        warning: 'var(--c-fl-alert-warning)',
      },
      current: 'currentColor',
      red: colors.red,
      emerald: colors.emerald,
      indigo: colors.indigo,
      pink: colors.pink,
      purple: colors.purple,
      amber: colors.amber,
      blue: colors.blue,
      sky: colors.sky,
    },
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}
