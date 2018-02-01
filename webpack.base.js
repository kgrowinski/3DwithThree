const ExtractTextPlugin = require('extract-text-webpack-plugin');
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');


module.exports = {

  // Enable webpack to run babel on every file
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env',
              {
                targets: {
                  browsers: ['last 2 versions']
                }
              }
            ]
          ]

        }
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        exclude: /\.scss?$/,
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: debug ? [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'main.bundle.css',
      allChunks: true,
    }),
  ] : [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'main.bundle.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
