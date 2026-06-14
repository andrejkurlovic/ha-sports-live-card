const path = require('path');

module.exports = {
  entry: './src/sports-live-card.js',
  output: {
    filename: 'sports-live-card.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: '> 0.25%, not dead',
              }],
            ],
          },
        },
      },
    ],
  },
  mode: 'production',
};
