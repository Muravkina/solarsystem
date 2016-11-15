const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry:  __dirname + "/app/App.js",
    output: {
        path: __dirname + 'dist',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],

    module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    },{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.otf$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader" }, {
      test: /\.css$/,
      loader: 'postcss-loader'
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};
