const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./base.config.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

baseConfig.plugins.push(
	new BundleAnalyzerPlugin({
		analyzerPort: 4001
	})
);

module.exports = merge(baseConfig, {
	devtool: false,
	mode: 'production',
	output: {
		publicPath: './'
	},
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
					sourceMap: false
				}
			})
		],
		runtimeChunk: {
			name: 'runtime'
		}
	}
});
