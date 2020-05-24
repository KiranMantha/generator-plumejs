const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const WebpackPrebuild = require('pre-build-webpack');
const del = require('del');
const appconstants = {
    publicPath: '/',
    root: '../',
    sourceDir: '../src',
    buildDir: '../dist',
    node_modules: '../node_modules'
}
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: ['./src/index.ts', './src/polyfills.ts'],
    output: {
        path: path.resolve(__dirname, appconstants.buildDir),
        publicPath: appconstants.publicPath,
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: ['html-loader']
            }, {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, "../tsconfig.app.json")
                    }
                }]
            }, {
                test: /\.(s*)css$/,
                use: ['css-loader', 'sass-loader']
            }, {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }],
            }, {
                test: /\.(woff2?|ttf|eot|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: "head",
            minify: {
                collapseWhitespace: false
            }
        }),
        new WebpackPrebuild(() => {
            del([path.resolve(__dirname, appconstants.buildDir)])
        }),
        new CopyWebpackPlugin([
            {from:'src/images',to:'images'}
        ])
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    chunks: 'all'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    }
};