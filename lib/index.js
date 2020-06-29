import path from "path"

export var Y = s => s(s)
export var getDir = req => req.keys()
    .map(name => ({ name: path.basename(name).replace(path.extname(name), ''), obj: req(name).default }))
export var 异常 = (...a) => {
    a = a.map(a => {
        var r
        try {
            r = JSON.stringify(a)
        } catch (e) {
            r = a.toString()
        }
        return r
    })
    console.error(...a)
    if (window != null) alert(...a)
    throw a.join(' ')
}
export var 数组转对象通过值 = 键 => 值 => 数组 => {
    var r = {}
    数组.forEach((v, k) => r[键(v)] = 值(v))
    return r
}
export var 数组转对象通过键值 = 键 => 值 => 数组 => {
    var r = {}
    数组.forEach((v, k) => r[键(k)(v)] = 值(k)(v))
    return r
}
export var 副作用 = 对象 => 函数 => { 函数(对象); return 对象; }
export var 安全同步运行 = (函数, 异常回调) => {
    if (异常回调 == null) 异常回调 = 上下文 => 错误 => { 异常(错误) }
    return async (...a) => {
        return await 函数(...a).catch(e => 异常回调(...a)(e))
    }
}
