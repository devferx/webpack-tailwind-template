require('dotenv').config();

const isProd = process.env.ENV === 'production';

let purge = {};

if (isProd) {
  purge = {
    enabled: true,
    content: ["./src/**/*.html"],
  };
}

module.exports = {
  purge,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
