const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const appconstants = {
	publicPath: '/',
	root: '../',
	sourceDir: '../src',
	buildDir: '../dist',
	node_modules: '../node_modules'
};
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const envVariables = require('dotenv').config().parsed || {};

module.exports = {
	devtool: 'eval-cheap-source-map',
	mode: 'development',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, appconstants.buildDir),
		publicPath: appconstants.publicPath,
		filename: 'scripts/[name].[chunkhash].bundle.js',
		chunkFilename: 'scripts/[name].[chunkhash].chunk.js'
	},
	resolve: {
		extensions: ['.ts', '.js', '.scss', '.css']
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				resolve: {
					fullySpecified: false
				}
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: path.resolve(__dirname, '../tsconfig.app.json')
						}
					}
				]
			},
			{
				test: /\.(s*)css$/,
				use: [
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass')
						}
					}
				]
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8000, // Convert images < 8kb to base64 strings
							name: 'images/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(woff2?|ttf|eot)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'fonts/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({ process: { env: JSON.stringify(envVariables) } }),
		new HtmlWebPackPlugin({
			template: './index.html',
			filename: 'index.html',
			inject: 'head',
			minify: {
				collapseWhitespace: false
			}
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'src/images', to: 'images' }]
		})
	],
	optimization: {
		minimize: true,
		runtimeChunk: {
			name: 'runtime'
		},
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				coreVendor: {
					test: /[\\/]node_modules[\\/](@plumejs\/core)[\\/]/
				},
				uiVendor: {
					test: /[\\/]node_modules[\\/](@plumejs\/ui)[\\/]/
				},
				routerVendor: {
					test: /[\\/]node_modules[\\/](@plumejs\/router)[\\/]/
				},
				otherVendor: {
					test: /[\\/]node_modules[\\/](!@plumejs\/core)(!@plumejs\/ui)(!@plumejs\/router)[\\/]/
				},
				default: {
					minChunks: 1,
					reuseExistingChunk: true
				}
			}
		}
	}
};
