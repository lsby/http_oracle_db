var app = { el: '#app' }

var data = app.data = {}
var methods = app.methods = {}

data.mes = '你好, 世界!'
methods.fun = _ => alert(data.mes)

new Vue(app)
