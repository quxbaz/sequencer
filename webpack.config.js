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
    root: resolve('./'),
    extensions: ['', '.js'],
    alias: {
      'timer'      : resolve('bower_components/timer.js/timer.js'),
      'dispatcher' : resolve('bower_components/dispatcher/dispatcher.js')
    }
  }

};

if (process.env.mode === 'dist') {
  config.entry = resolve(__dirname, 'index.js');
  config.devtool = undefined;
  config.output.path = './dist/';
  config.output.filename = 'sequencer.js';
}

module.exports = config;
