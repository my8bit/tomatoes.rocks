const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const OfflinePlugin = require('offline-plugin');
// require('offline-plugin/runtime').install();
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract('style', 'css?minimize!sass', 'postcss')
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([{from: path.resolve(__dirname, '../src/_redirects')}]),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {unused: true, dead_code: true} // eslint-disable-line camelcase
    }),
    new SplitByPathPlugin([{
      name: 'vendor',
      path: path.join(__dirname, '../node_modules')
    }]),
    new ExtractTextPlugin('/index-[contenthash].css'),
    new OfflinePlugin({
      excludes: ['_redirects']
    })
  ],
  postcss: () => [autoprefixer],
  resolve: {
    alias: {
      config: path.resolve(__dirname, `../${conf.path.src('config.json')}`)
    }
  },
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  entry: {
    app: `./${conf.path.src('index.jsx')}`
  }
};
