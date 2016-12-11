var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },


  module: {
    loaders: 
    [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // Image file config. Generate hashed file names to make them easy to cache.
      {
        test: /\.(png|gif|jpe?g|svg|ico)$/i,
        loader: 'file?hash=sha512&digest=hex'
      },

      // File loader for fonts larger than 10000 bytes.
      { 
        test: /\.(woff2?|otf|eot|svg)$/, 
        loader: 'file' 
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
    
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  }
}



module.exports = config;
