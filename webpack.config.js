const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/index.html'
    }])
  ],
  resolve: { 
    modules: ['node_modules'],
    extensions: ['.js', '.css'],
  },
};