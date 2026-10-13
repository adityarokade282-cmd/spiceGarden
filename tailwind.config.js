/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: '#f6f6f7',
          100: '#e2e2e5',
          200: '#c4c4ca',
          300: '#9d9da8',
          400: '#6f6f7e',
          500: '#525260',
          600: '#3d3d48',
          700: '#2c2c35',
          800: '#1e1e24',
          900: '#141418',
          950: '#0a0a0d',
        },
        saffron: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffc070',
          400: '#ff9a37',
          500: '#ff7a0f',
          600: '#f05e06',
          700: '#c74707',
          800: '#9e380e',
          900: '#7f300f',
        },
        crimson: {
          50: '#fef2f2',
          100: '#fde3e3',
          200: '#fccccc',
          300: '#fba8a8',
          400: '#f87474',
          500: '#f03e3e',
          600: '#db2424',
          700: '#b81818',
          800: '#991818',
          900: '#7d1a1a',
        },
        cream: {
          50: '#fdfcf8',
          100: '#faf6ec',
          200: '#f4ecd2',
          300: '#ecdda9',
          400: '#e2c97e',
          500: '#d9b75e',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};
