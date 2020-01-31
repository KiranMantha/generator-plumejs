const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const appconstants = {
    publicPath: '/',
    root: '../',
    sourceDir: '../src',
    buildDir: '../dist',
    node_modules: '../node_modules'
}

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.ts',
        styles: './src/styles.scss'
    },
    output: {
        path: path.resolve(__dirname, appconstants.buildDir),
        publicPath: appconstants.publicPath,
        filename: '[name]-[hash:6].js'
    },
    resolve: {
        modules: [path.resolve(__dirname, appconstants.root), path.resolve(__dirname, appconstants.node_modules)],
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: ['html-loader']
          },{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                  babelrc: true
                }
            }]
        }, {
            test: /\.(s*)css$/,
            use: ["css-loader", "sass-loader"]
        },{
            test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, appconstants.sourceDir + "/index.html"),
            filename: "./index.html",
            inject: "head",
            minify: {
                collapseWhitespace: false
            }
        }),
        new ManifestPlugin(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        usedExports: true,
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
            chunks: 'all',
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};