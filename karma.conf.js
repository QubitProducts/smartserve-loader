module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'test/**/*.js',
      { pattern: 'test/fixtures/**', included: false }
    ],
    preprocessors: {
      'lib/**/*.js': ['webpack', 'sourcemap'],
      'test/*.js': ['webpack', 'sourcemap'],
      'test/helpers/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      watch: true,
      devtool: 'inline-source-map',
      module: {
        rules: [{
          test: /lib\/.*\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader'
          },
          exclude: /(test|node_modules|bower_components)\//
        }]
      }
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
      }
    }
  })
}
