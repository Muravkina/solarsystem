const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry:  __dirname + "/app/App.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath:'/solarsystem/dist',

    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('style.css', {
          allChunks: false
        }),
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
      loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
    },
      // Image file config. Generate hashed file names to make them easy to cache.
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[path][name]-[hash].[ext]'
      },

      // File loader for fonts larger than 10000 bytes.
      { test: /\.(woff2?|otf|eot|svg)$/, loader: 'file?name=[path][name]-[name].[ext]' }]
  },
  postcss: [
    require('autoprefixer')
  ]
};
