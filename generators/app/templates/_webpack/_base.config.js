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
const TerserPlugin = require('terser-webpack-plugin');

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
							configFile: path.resolve(__dirname, '../tsconfig.json')
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
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					parse: {
						ecma: 8
					},
					compress: {
						ecma: 5
					},
					sourceMap: false,
					keep_classnames: true
				}
			})
		],
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
