const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const prodWebpackConfig = {
    mode: 'production',//生产模式会自动压缩代码
    devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, '../dist/static'),
        publicPath: './static/'//相对路径，防止404
    },
    //chunkhash不能与热更新一起，放在生产环境
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,//值为第三方代码和业务代码之和
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                //提取第三方代码
                vue_ele: { //vue全家桶必用
                    test: /[\\/]node_modules\/(vue|element-ui|vue-router)[\\/]/,
                    priority: -5,
                    filename: 'js/vue_ele.[chunkhash:6].js'
                },
                vendors: { //其他第三方选用，可以动态导入
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    filename: 'js/vendors.[chunkhash:6].js'
                },
                //提取公共代码
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    //插件顺序从后往前
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //生产环境：静态资源拷贝到dist文件夹
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: path.resolve(__dirname, '../dist/static'),
                ignore: ['.*']
            }
        ]),
        //清理js文件，否则垃圾堆积(有用)
        new CleanWebpackPlugin()
    ]
};
//分析直接运行:npm run build --analyze
if (process.env.npm_config_analyze) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge(baseWebpackConfig, prodWebpackConfig);














