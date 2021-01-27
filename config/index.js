const path = require('path');

export default {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },
  rules: [{ test: /\.scss$/, loaders: ['style', 'css', 'scss'] }],
};
