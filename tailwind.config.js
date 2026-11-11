module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        primary: '#0A84FF',
        secondary: '#1C1C1E',
        accent: '#30D158',
        background: '#F2F2F7',
        foreground: '#000000',
        muted: '#8E8E93'
      },
      borderRadius: {
        xl: '1.25rem'
      }
    }
  },
  plugins: []
};
