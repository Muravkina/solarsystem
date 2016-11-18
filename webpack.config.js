var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/App.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
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
    },       {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[path][name]-[hash].[ext]'
      },

      // File loader for fonts larger than 10000 bytes.
      { test: /\.(woff2?|otf|eot|svg)$/, loader: 'file?name=[path][name]-[name].[ext]' }]
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
