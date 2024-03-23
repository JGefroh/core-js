const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin'); // Generate index.html with built JS


module.exports = {
  entry: './main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'entry-point.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'static'),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    alias: {
      "@demo": path.resolve(__dirname, "demo"),
      "@core": path.resolve(__dirname, "src")
    },
  },
  plugins: [new HtmlWebpackPlugin()],
}