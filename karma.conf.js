const webpack = require('webpack')

module.exports = function(config) {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-tap'),
      require('karma-chrome-launcher'),
    ],

    basePath: '',
    frameworks: [ 'tap' ],
    files: [ 'test/**/*.js' ],

    preprocessors: {
      'test/**/*.js': [ 'webpack' ]
    },

    webpack: {
      node : {
        fs: 'empty'
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: [ 'dots' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
