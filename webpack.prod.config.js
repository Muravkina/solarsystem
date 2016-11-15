const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry:  __dirname + "/app/App.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: './public/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('./public/style.css', {
          allChunks: true
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
      loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader')
    },
      // Image URL config. Generate data URI's for images smaller than 10,000 bytes
      {test: /\.(png|gif|jpe?g|svg)$/i, loader: 'url?limit=10000'},

      // Image file config. Generate hashed file names to make them easy to cache.
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[path][name]-[hash].[ext]'
      },

      // Inline font files smaller than 10000 bytes
      { test: /\.(woff2?|otf|eot|svg)$/, loader: 'url?limit=10000' },

      // File loader for fonts larger than 10000 bytes.
      { test: /\.(woff2?|otf|eot|svg)$/, loader: 'file?name=[name].[ext]' }]
  },
  postcss: [
    require('autoprefixer')
  ],
   devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
};
