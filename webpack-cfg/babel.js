const path = require('path')

const libraries = [
  'reselect',
  'react-icons',
  'react-icon-base',
  'react-css-themr',
  'react-collapse',
  'react-height',
  'react-i18next'
]

module.exports = {
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, '../src')
      ].concat(libraries.map(lib => path.resolve(__dirname, '../node_modules', lib))),
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  }
}
