const path = require('path');

module.exports = {
  entry: './apps/web/public/src/app.module.js',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '..', '..', '..', '/apps/web/public/dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.css', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: true,
  },
};