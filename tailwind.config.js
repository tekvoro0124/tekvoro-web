/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#000',
        primary: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#cccccc',
          500: '#b3b3b3',
          600: '#999999',
          700: '#7f7f7f',
          800: '#666666',
          900: '#4d4d4d',
          DEFAULT: '#fff',
        },
        secondary: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
          DEFAULT: '#ccc',
        },
        accent: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffbdbd',
          300: '#ff9b9b',
          400: '#f86a6a',
          500: '#ff3c3c',
          600: '#e03131',
          700: '#c92a2a',
          800: '#a51111',
          900: '#800000',
          DEFAULT: '#FF3C3C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'Neue Montreal', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0 5px 15px 0 rgba(0, 0, 0, 0.05)',
        'custom-dark': '0 5px 15px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};