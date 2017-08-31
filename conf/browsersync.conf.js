const conf = require('./gulp.conf');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConf = require('./webpack.conf');
const webpackBundler = webpack(webpackConf);

module.exports = () => {
  const options = {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [
        webpackDevMiddleware(webpackBundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConf.output.publicPath,

          // Quiet verbose output in console
          quiet: true
        }),

        // bundler should be the same as above
        webpackHotMiddleware(webpackBundler)
      ]
    },
    open: false
  };
  const https = process.env.TOMATOES_SERVER_KEY &&
              process.env.TOMATOES_SERVER_CRT ? {
                https: {
                  key: path.resolve(process.env.TOMATOES_SERVER_KEY),
                  cert: path.resolve(process.env.TOMATOES_SERVER_CRT)
                }
              } : {};

  const address = process.env.PORT &&
                process.env.IP ? {
                  port: process.env.PORT,
                  host: process.env.IP
                } : {};
  return Object.assign(options, https, address);
};
