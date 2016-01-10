require('es6-promise').polyfill();
var path = require('path');
var resolve = path.resolve;

var config = {

  cache: true,
  devtool: 'eval-source-map',
  entry: 'test/test.js',

  output: {
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/, /bower_components/],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    root: resolve(__dirname),
    alias: {
      'timer'      : resolve(__dirname, 'bower_components/timer.js/timer.js'),
      'dispatcher' : resolve(__dirname, 'bower_components/dispatcher/dispatcher.js')
    },
    extensions: ['', '.js']
  }

};

if (process.env.mode === 'build') {
  config.entry = resolve(__dirname, 'index.js');
  // config.devtool = 'inline-source-map';
  config.devtool = undefined;
  config.output.path = './build/';
  config.output.filename = 'sequencer.js';
}

module.exports = config;
