const merge = require('webpack-merge');

module.exports = (mode) => {
  return merge([
    {
      mode,
      devtool: 'cheap-module-eval-source-map',
      devServer: {
        contentBase: './build',
        overlay: true,
        port: process.env.PORT,
        historyApiFallback: true,
        hot: true,
        open: true,
        proxy: {
          '/api': `http://localhost:${process.env.SERVER_PORT}`,
        },
      },
    },
  ]);
};
