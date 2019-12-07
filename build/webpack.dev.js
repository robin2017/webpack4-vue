const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config');

const devWebpackConfig = {
    mode: 'development',//开发模式不会压缩代码
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        port: 3000,
        contentBase: './public'
    }
};
module.exports = merge(baseWebpackConfig,devWebpackConfig);
