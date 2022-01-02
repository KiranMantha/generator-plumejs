const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

baseConfig.plugins.push(
	new BundleAnalyzerPlugin({
		analyzerPort: 4001
	}),
	new webpack.SourceMapDevToolPlugin({
		filename: 'sourcemaps/[name].js.map',
		exclude: ['vendor.js']
	})
);

module.exports = merge(baseConfig, {
	devtool: false,
	mode: 'production',
	output: {
		publicPath: './'
	}
});
