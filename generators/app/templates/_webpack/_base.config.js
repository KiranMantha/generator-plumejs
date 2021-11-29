const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const appconstants = {
	publicPath: '/',
	root: '../',
	sourceDir: '../src',
	buildDir: '../docs',
	node_modules: '../node_modules'
};
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: 'eval-cheap-source-map',
	mode: 'development',
	entry: './src/index.ts',
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
		rules: [
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
							// Prefer `dart-sass`
							implementation: require('sass'),
							sassOptions: {
								fiber: false
							}
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
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'head',
			minify: {
				collapseWhitespace: false
			}
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'src/images', to: 'images' }]
		}),
		new webpack.SourceMapDevToolPlugin({})
	]
};
