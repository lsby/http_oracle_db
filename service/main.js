import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import http from 'http'
import socketio from 'socket.io'
import expressSession from 'express-session'
import connectLoki from 'connect-loki'
import socket事件 from './socketio/socket_event'
import 应用设置 from '@config/app'
import 中文路径支持 from '@lib/中文路径支持'
import { 安全同步运行, getDir } from '@lib/index'

var LokiStore = connectLoki(expressSession)
var port = 应用设置.端口
var 路由们 = getDir(require.context('./api/', true, /.js$/))

var app = express()
var server = http.createServer(app)

app.set('port', port)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(中文路径支持)

// session
var session = expressSession({
    name: 'http_oracle_db',
    secret: 'http_oracle_db',
    saveUninitialized: true,
    autoSave: true,
    resave: true,
    store: new LokiStore(),
    cookie: { maxAge: null, httpOnly: true },
})
app.use(session)

// session 与 socket.io 的联系
var session_req_io_map = {}
app.use(function (req, res, next) {
    var sessionID = req.sessionID
    session_req_io_map[sessionID] = session_req_io_map[sessionID] || {}
    session_req_io_map[sessionID].get_session = _ => req.session
    req.socketio = session_req_io_map[sessionID].socketio
    next()
})

// socket.io
var io = socketio(server, { cookie: false })
var io用户池 = []
io.on('connection', function (socket) {
    session(socket.request, {}, function () {
        var sessionID = socket.request.sessionID
        session_req_io_map[sessionID] = session_req_io_map[sessionID] || {}
        session_req_io_map[sessionID].socketio = socket

        socket.提交 = 名称 => 值 => socket.emit(名称, 值)
        socket.发送 = socket.提交
        socket.发送给所有用户 = 名称 => 值 => io用户池.forEach(a => a.socket.提交(名称)(值))
        socket.获得用户池 = _ => io用户池

        io用户池.push({ id: socket.id, socket })
        if (socket事件.connection != null) socket事件.connection(socket)()
        Reflect.ownKeys(socket事件).forEach(key => socket.on(key, (...args) => {
            if (key == 'disconnect') io用户池 = io用户池.filter(a => a.id != socket.id)
            if (session_req_io_map[sessionID].get_session)
                socket.session = session_req_io_map[sessionID].get_session()
            socket.session = socket.session || {}
            socket事件[key](socket)(...args)
        }))
    })
})

app.use('/', express.static('./dist/web'))
app.use('/api', (_ => {
    var router = express.Router()
    路由们.forEach(obj => router.post(`/${obj.name}`, 安全同步运行(obj.obj, (req, res, next) => err => {
        console.error(err)
        return next(err.toString())
    })))
    return router
})())

app.use(function (req, res, next) {
    next(createError(404))
})
app.use(function (err, req, res) {
    console.log(err)
    res.status(err.status || 500)
    res.send(err)
})

server.listen(port)
server.on('listening', (port => _ => console.log(`后端已启动 请访问 http://127.0.0.1:${port}`))(port))
server.on('error', error => {
    if (error.code == 'EACCES') throw '需要提升权限'
    if (error.code == 'EADDRINUSE') throw '端口被占用'
    throw error
})
