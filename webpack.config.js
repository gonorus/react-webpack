const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
const isDevMode = mode === 'development';

const devServer = {
  static: path.resolve(__dirname, 'dist'),
  port: 9000,
  hot: true,
};

const entry = {
  index: path.resolve(__dirname, 'src', 'index.jsx'),
};

const output = {
  filename: '[name].[contenthash].js',
  path: path.resolve(__dirname, 'dist'),
  assetModuleFilename: 'images/[hash][ext][query]',
  clean: true,
};

const resolve = {
  extensions: ['.js', '.jsx'],
  modules: [
    'node_modules',
    'bower_components',
    'shared',
    '/shared/vendor/modules',
  ],
};

const modules = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
    {
      test: /\.(png|gif|jpe?g|svg|ico)$/,
      type: 'asset/resource',
    },
    {
      test: /\.(ttf|eot|svg)$/,
      use: ['file-loader'],
    },
  ],
};

const plugins = [
  new HtmlWebpackPlugin({
    title: isDevMode ? 'Development' : 'Production',
    template: path.resolve(__dirname, 'src', 'template.html'),
    favicon: path.resolve(__dirname, 'src', 'images', 'favicon.ico'),
  }),
  new MiniCssExtractPlugin({
    filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: isDevMode ? '[id].css' : '[id].[contenthash].css',
  }),
];

const optimization = {
  minimizer: [
    '...',
    new CssMinimizerPlugin(),
  ],
};

module.exports = {
  mode,
  devServer,
  entry,
  output,
  resolve,
  module: modules,
  plugins,
  optimization,
};
