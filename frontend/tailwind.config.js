/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e6f7ec', // Soft light green
          DEFAULT: '#22c55e', // Vibrant green
          dark: '#15803d', // Trustworthy dark green
        },
        accent: {
          DEFAULT: '#eab308', // Agricultural yellow/gold
        },
        ui: {
          background: '#f8fafc',
          surface: '#ffffff',
          text: '#0f172a',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tamil: ['Mukta Malar', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
