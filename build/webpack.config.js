const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
console.log('构建时区分环境:不准确')
if ('development' === process.env.NODE_ENV) {
    // 开发环境下的逻辑
    console.log('开发环境')
} else {
    // 生产环境下
    console.log('生产环境')
}
module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:6].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'vue-style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            },
            {
                test: /\.sass$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass')
                        }
                    }
                ]
            },
            {
                test: /\.jpeg$/,
                use: [
                    {
                        //一般url-loader会配合file-loader一起使用
                        loader: 'url-loader',
                        options: {
                            limit: 4096,//超过大小用file-loader
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            },
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        // splitChunks: {
        //     chunks: 'all'
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,
                '../index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ]
};





