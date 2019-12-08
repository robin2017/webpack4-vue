const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/main.js'),
        vendor: ['vue', 'vue-router', 'jquery']
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
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize:30000,//默认大小，超过30kb就放入vendor
            minChunks:1,//默认大小，2个以上共享就繁缛vendor
            maxInitialRequests:3,//默认大小
            maxAsyncRequests:5,//默认大小
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            },


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





