require('dotenv').config();

const isProd = process.env.ENV === 'production';

const plugins = [
    require('tailwindcss'),
    require('autoprefixer'),
]

isProd && plugins.push(require('cssnano'));

module.exports = {
  plugins
}