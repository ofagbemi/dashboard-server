const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const commonCSSLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      plugins: [autoprefixer({ browsers: ['last 2 versions'] })],
    },
  },
  'sass-loader?outputStyle=expanded',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: ['./client/style/export.scss'],
    },
  },
]

module.exports = {
  entry: {
    app: './client/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
    ],
  },
  output: {
    path: path.join(__dirname, 'public/generated/'),
    filename: 'bundle.js',
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'main.css' }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\//,
      },
      {
        test: /\.s?css$/,
        exclude: /style\//g,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            ...commonCSSLoaders,
          ],
        }),
      },
      {
        test: /\.s?css$/,
        include: /style\//g,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {},
            },
            ...commonCSSLoaders,
          ],
        }),
      },
    ],
  },
}
