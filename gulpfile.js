var nodemon = require('gulp-nodemon')
var webpack = require('webpack')
var { watch } = require('gulp')
var WebpackDevServer = require("webpack-dev-server")

var 后端配置 = require('./service/webpack/webpack.dev')
var 前端配置 = require('./web/webpack/webpack.dev')
var nodemon配置 = require('./service/nodemon.json')

exports.default = function defaultTask(cb) {
    var 后端 = webpack(后端配置)
    var 前端 = webpack(前端配置)
    var nm = nodemon(nodemon配置)

    后端.watch({ aggregateTimeout: 300 }, (err, stats) => {
        console.log('后端已重新构建')
        nm.emit('restart')
    })
    前端.watch({ aggregateTimeout: 300 }, (err, stats) => { console.log('前端已重新构建') })
    new WebpackDevServer(前端, 前端配置.devServer).listen(8080, "127.0.0.1")

    cb()
}
// watch('**/*.js', _ => _)

// process.on('uncaughtException', function (err) {
//     console.error(err)
// })
