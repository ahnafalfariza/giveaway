module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['Anybody', 'sans-serif'],
    },
    extend: {
      colors: {
        'dark-primary-1': '#1F1D23',
        'dark-primary-2': '#26222C',
        'dark-primary-3': '#2C2835',
        'dark-primary-4': '#332D3E',
        'dark-primary-5': '#3A3346',
        'dark-primary-6': '#40384F',
        'dark-primary-7': '#473E58',
        'dark-primary-8': '#4D4360',
        'dark-primary-9': '#544869',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
