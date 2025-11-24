module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#e6f6ff',
          300: '#7dd3fc',
          500: '#06b6d4', // teal-ish bright
          600: '#0891b2'
        },
        accent: {
          50: '#fff7ed',
          100: '#fff1e6',
          300: '#ffd6a5',
          500: '#ff8c42'
        }
      },
      boxShadow: {
        soft: '0 6px 18px rgba(6,22,33,0.08)',
        glow: '0 10px 30px rgba(6,182,212,0.12)'
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: []
}
