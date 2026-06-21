/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B3A6E',
        'primary-light': '#EAF4FF',
        feeding: '#15803D',
        hydration: '#0284C7',
        exercise: '#EA580C',
        health: '#DC2626',
        hygiene: '#7C3AED',
        behavior: '#D97706',
        environment: '#166534',
        surface: '#F8FAFC',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
      },
    },
  },
  plugins: [],
};
