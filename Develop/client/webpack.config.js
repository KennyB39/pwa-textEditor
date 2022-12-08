const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const {injectManifest} = require('workbox-webpack-plugin');

module.exports = () => {
  return{
    mode: 'development',
    entry: {
      main: './src/index.js',
      install: './src/install.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './src/index.html',
        title: 'PWA Demo',
        chunks: ['main']
      }),
      new injectManifest({
        swsrc: './src/sw.js',
        swDest: 'sw.js'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject:true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor',
        background_color: '##225ca3',
        theme_color: '##225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          }  
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    }
  };
};
              