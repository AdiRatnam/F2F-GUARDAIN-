/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agricultural: {
          dark: '#0f172a',    // deep navy
          primary: '#166534', // dark green
          accent: '#22c55e',  // subtle green accent
          light: '#f8fafc',
          warning: '#f59e0b',
          danger: '#ef4444'
        }
      },
      animation: {
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
