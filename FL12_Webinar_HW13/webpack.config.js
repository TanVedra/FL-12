const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = ({mode = "development"} = {}) => {

  const isProd = mode === "production";

  const getStyleLoaders = () => {
    return [ 
      isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"
    ];
  };

  const getPlagins = () => {
    const plagins = [
      new HtmlWebpackPlugin({
        template: "src/index.html"
      })
    ];
    if (isProd) {
      plagins.push(
        new ImageminPlugin({
          test: /\.(jpg|png)$/
        }),
        new MiniCssExtractPlugin({
          filename: "css/styles.css"
        })
      )
    }
    return plagins;
  };

  return { 
    target: 'web',
    mode: isProd ? "production" : "development",
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/app.js'
    },

    devServer: {
      open: true
    },

    module: {
      rules: [

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },

        {
          test: /\.(png|jpg|gif|jpeg|ico)$/,
          use: [
            { loader: "file-loader",
              options: {
                outputPath: "img",
                name: "[name]-[sha1:hash:7].[ext]"
              }
            }
          ]
        },

        {
          test: /\.(css)$/,
          use: getStyleLoaders()
        },

        {
          test: /\.(s[ca]ss)$/,
          use: [ ...getStyleLoaders(), "sass-loader" ]
        }

      ]
    },

    plugins: getPlagins()
  }
};