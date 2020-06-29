// 使用 req.session 即可访问 session
// 使用 req.sessionID 即可访问 sessionID
// 使用 req.socketio 即可访问 socketio
// 可以使用 req.socketio.提交 用 ws 返回数据
// 也可以使用 res.send 用 http 返回数据
export default async (req, res, next) => {
    res.end()
}
