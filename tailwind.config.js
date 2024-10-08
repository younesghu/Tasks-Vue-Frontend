/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx, tsx}",
    ],
  theme: {
      extend: {
        keyframes: {
          rotating: {
            '0%, 100%': { transform: 'rotate(360deg)' },
            '50%': { transform: 'rotate(0deg)' },
          },
        },
        zIndex: {
          max: 9999999,
        },
        animation: {
          'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)',
          rotating: 'rotating 30s linear infinite',
          'spin-1.5': 'spin 1.5s linear infinite',
          'spin-2': 'spin 2s linear infinite',
          'spin-3': 'spin 3s linear infinite',
        },
      },
  },
  plugins: [],
}

