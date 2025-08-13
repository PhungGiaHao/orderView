const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Đảm bảo react-native-vector-icons được dùng trực tiếp, không qua alias
      'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
    },
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // Xử lý fonts từ react-native-vector-icons
      {
        test: /\.ttf$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
      }
    ],
  },
};
