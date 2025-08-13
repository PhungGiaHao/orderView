const { override, addWebpackAlias, addBabelPlugins, addBabelPresets, addWebpackModuleRule } = require('customize-cra');
const path = require('path');
const webpack = require('webpack');

module.exports = override(
  addWebpackAlias({
    'react-native$': 'react-native-web',
    '@': path.resolve(__dirname, 'src'),
    '@api': path.resolve(__dirname, 'src/api'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@screens': path.resolve(__dirname, 'src/screens'),
    '@types': path.resolve(__dirname, 'src/types'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@contexts': path.resolve(__dirname, 'src/contexts'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@styles': path.resolve(__dirname, 'src/styles')
  }),
  ...addBabelPresets('@babel/preset-react'),
  // Xử lý fonts từ react-native-vector-icons
  addWebpackModuleRule({
    test: /\.ttf$/,
    loader: 'file-loader',
    include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
  }),
  ...addBabelPlugins(
    'react-native-web',
    [
      'module-resolver',
      {
        alias: {
          '@': './src'
        }
      }
    ]
  ),
  (config) => {
    // Add buffer fallback
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "buffer": require.resolve("buffer/")
    };

    // Add buffer plugin
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      })
    );

    return config;
  }
);
