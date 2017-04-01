const path = require('path')


module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public/generated/js'),
    filename: 'bundle.js',
  },
}
