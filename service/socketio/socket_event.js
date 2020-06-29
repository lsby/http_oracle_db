// 使用 socket.session 即可访问 session
// 使用 socket.req.sessionID 即可访问 sessionID
// 在这里不能通过 http 返回数据

export default {
    connection: socket => msg => {
        console.log('已接受前端连接')
    },
    disconnect: socket => msg => {
        console.log('前端已断开')
    },
    ws事件: socket => msg => {
        console.log(msg)
        socket.提交('写日志')(`这是 ws 的响应, 你的 sessionID 是 ${socket.request.sessionID}`)
        socket.提交('写日志')(`这是 ws 的响应, 你的 session.userid 是 ${socket.session.userid}`)
        socket.提交('写日志')(`用户池: ${socket.获得用户池().map(a => a.id)}`)
        socket.发送给所有用户('写日志')(`有人点击了按钮`)
    },
}
