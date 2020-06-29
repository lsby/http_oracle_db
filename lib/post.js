import $ from 'jquery'
var 调试模式 = process.env.NODE_ENV !== 'production'

export var post = url => data => new Promise((res, req) => {
    if (调试模式) console.log(url, data)
    $.post(url, data, data => {
        if (调试模式) console.log(data)
        res(data)
    }).catch(e => {
        if (调试模式) console.log(e)
        req(e)
    })
})
