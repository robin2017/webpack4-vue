const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devWebpackConfig = {
    mode: 'development',//开发模式不会压缩代码
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        port: 3000,
        publicPath:'/',
        contentBase: false
    },
    plugins:[
        //开发环境：静态资源拷贝到内存
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore:['.*']
            }
        ]),
    ]
};
module.exports = merge(baseWebpackConfig,devWebpackConfig);
