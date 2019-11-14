const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, '../src')
        },
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: ['html-loader']
          },{
            test: /.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                  babelrc: true
                }
            },{
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  configFile: 'tsconfig.json',
                }
            }]
        }, {
            test: /\.(s*)css$/,
            use: ["css-loader", "sass-loader"]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: "head",
            minify: {
                collapseWhitespace: false
            }
        })
    ],
    optimization: {
        runtimeChunk: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    }
};