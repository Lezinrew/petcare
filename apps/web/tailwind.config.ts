/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B3A6E',
        'primary-dark': '#083056',
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
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(11, 58, 110, 0.08), 0 4px 14px rgba(11, 58, 110, 0.06)',
        xs: '0 1px 2px rgba(15, 23, 42, 0.05)',
        card: '0 1px 3px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.04)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0b3a6e 0%, #0e4a8a 45%, #1565a8 100%)',
      },
    },
  },
  plugins: [],
};
