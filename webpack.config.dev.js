import webpack from 'webpack';
import path from 'path';

export default { // Object literal
  debug: true, // Display debug information
  devtool: 'cheap-module-eval-source-map', // Options for devtool
  noInfo: false, // Webpack will display a list of files during bundling
  entry: [
    'eventsource-polyfill', // Hotreloading in IE
    'webpack-hot-middleware/client?reload=true', // Reloads the page if Hotreloading fails
    './src/index' // Apps entrypoint, must be last
  ],
  target: 'web', // Web, node -> bundling code so a browser understands it
  output: { // Only creates files in memory for dev
    path: __dirname + '/dist', // Files only output by the production build task `npm run build`
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src' // Where is the code
  },
  plugins: [
    // Enable to replace modules without doing a full reload
    new webpack.HotModuleReplacementPlugin(),
    // Will not break the reloading, instead show error msg
    new webpack.NoErrorsPlugin()
  ],
  module: {
    // Recommended settings for handling file types
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
