var merge = require('webpack-merge')
var common = require('./webpack.common.js')
var TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [new TerserPlugin({})],
    }
})
