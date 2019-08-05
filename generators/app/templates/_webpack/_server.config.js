const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');

module.exports = merge(baseConfig, {
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        hot: true,
        port: 3001
    },
    watch: true
});
