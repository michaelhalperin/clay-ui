/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Varela Round', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        clay: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        mint: {
          100: '#d1fae5',
          200: '#a7f3d0',
          400: '#34d399',
          500: '#10b981',
        },
        peach: {
          100: '#fce7f3',
          200: '#fbcfe8',
          400: '#f472b6',
        },
        lemon: {
          100: '#fef9c3',
          200: '#fef08a',
          400: '#facc15',
        },
        lavender: {
          100: '#ede9fe',
          200: '#ddd6fe',
          400: '#a78bfa',
          500: '#8b5cf6',
        },
      },
      boxShadow: {
        clay:    '6px 6px 0px 0px rgba(0,0,0,0.08), 0 2px 20px rgba(0,0,0,0.06)',
        'clay-lg': '8px 8px 0px 0px rgba(0,0,0,0.10), 0 4px 30px rgba(0,0,0,0.08)',
        'clay-inset': 'inset 2px 2px 6px rgba(0,0,0,0.06)',
        soft:    '0 4px 24px rgba(0,0,0,0.07)',
        'soft-lg': '0 8px 40px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        clay: '1.25rem',
        'clay-lg': '1.75rem',
      },
    },
  },
  plugins: [],
}
