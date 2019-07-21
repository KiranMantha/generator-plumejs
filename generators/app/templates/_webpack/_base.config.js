const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: "head"
        })
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
            name: 'vendor'
        }
    }
};