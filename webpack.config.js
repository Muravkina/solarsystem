var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
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
    plugins: [
  
    
        new ExtractTextPlugin('style.css', {
          allChunks: false
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
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    },
      // Image URL config. Generate data URI's for images smaller than 10,000 bytes
      {test: /\.(png|gif|jpe?g|svg)$/i, loader: 'url'},

      // Image file config. Generate hashed file names to make them easy to cache.
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[path][name]-[hash].[ext]'
      },

      // Inline font files smaller than 10000 bytes
      { test: /\.(woff2?|otf|eot|svg)$/, loader: 'url?limit=10000' },

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

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
