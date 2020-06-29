var path = require('path')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var nodeExternals = require('webpack-node-externals')

module.exports = {
    target: 'node',
    entry: path.join(__dirname, '../main.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, '../../dist/service'),
    },
    externals: [
        nodeExternals(),
    ],
    plugins: [
        new CleanWebpackPlugin(),
        process.env.analyz == 'true' ? new BundleAnalyzerPlugin() : null,
    ].filter(a => a != null),
    module: {
        rules: [
            { test: /\.(js|mjs)$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader" },
            { test: /\.(js|mjs)$/, use: ["source-map-loader"], enforce: "pre" },
        ]
    },
    resolve: {
        alias: {
            "@lib": path.join(__dirname, '../../lib'),
            "@config": path.join(__dirname, '../../config'),
        }
    },
    optimization: {}
}

process.on('uncaughtException', function (err) {
    console.error(err)
})
