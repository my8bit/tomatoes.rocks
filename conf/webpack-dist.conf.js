const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const SplitByPathPlugin = require('webpack-split-by-path');
const autoprefixer = require('autoprefixer');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
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
        test: /\.(css|scss|sass)$/,
        loaders: [
          'style',
          'css',
          'resolve-url-loader',
          'postcss',
          'sass?sourceMap'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
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
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, '../src/robots.txt')},
      {from: path.resolve(__dirname, '../src/sitemap.txt')},
      {from: path.resolve(__dirname, '../src/sitemap.xml')},
      {from: path.resolve(__dirname, '../src/_redirects')},
      {from: path.resolve(__dirname, '../src/static'), to: 'static'},
      {from: path.resolve(__dirname, '../src/manifest.json')}
    ]),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      inject: true
    }),
    new PreloadWebpackPlugin(),
    new webpack.DefinePlugin({
      isProduction: JSON.stringify(process.env.DEVELOPMENT) || false,
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      FIREBASE_MESSEGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSEGING_SENDER_ID),
      IFTT_KEY: JSON.stringify(process.env.IFTT_KEY),
      TRIGGER_NAME: JSON.stringify(process.env.TRIGGER_NAME),
      DOMAIN: JSON.stringify(process.env.URL)
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        drop_console: true, // eslint-disable-line camelcase
        dead_code: true // eslint-disable-line camelcase
      }
    }),
    // new SplitByPathPlugin([{
    //   name: 'vendor',
    //   path: path.join(__dirname, '../node_modules')
    // }]),
    // new ExtractTextPlugin('/index-[contenthash].css'),
    new OfflinePlugin({
      AppCache: false,
      excludes: ['_redirects', 'sitemap.txt', 'sitemap.xml', 'robots.txt']
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
