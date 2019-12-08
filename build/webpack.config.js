const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        filename: 'js/[name].[hash:6].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
        }
    },
    module: {
        rules: [
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
            },
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
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
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
                    name: 'fonts/[name].[hash:6].[ext]'
                }
            }
        ]
    },
    //chunkhash不能与热更新一起！！！
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
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,
                '../index.html'),//源
            filename: path.resolve(__dirname,
                '../dist/index.html')//目的
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ]
};





