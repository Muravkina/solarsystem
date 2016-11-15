const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry:  __dirname + "/app/App.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css', {
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
    },{
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.otf$|\.ttf$|\.wav$|\.mp3$/,
      loader: "file-loader"
    },{
      test: /\.css$/,
      loader: 'postcss-loader'
    }]
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
