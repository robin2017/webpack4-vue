const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devWebpackConfig = {
    mode: 'development',//开发模式不会压缩代码
    devtool: 'cheap-module-eval-source-map',
    output:{
        path: path.resolve(__dirname, '../dist'),
    },
    devServer: {
        hot: true,
        port: 3000,
        publicPath: '/',
        contentBase: false//使用CopyWebpackPlugin
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        //开发环境：静态资源拷贝到内存
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
    ]
};
module.exports = merge(baseWebpackConfig, devWebpackConfig);
