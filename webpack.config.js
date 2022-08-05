const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    build: './src/pages/index.js',
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist'),
      publicPath: ''

  },
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, './build'),
    port: 8080,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },

      {
        test: /\.css$/,
        use: [
          miniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },        
          'postcss-loader'
        ]
      },

      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },        
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new miniCSSExtractPlugin(),
    new CleanWebpackPlugin(),
    
    
  ]

}

