import Vuex from 'vuex'
import { getDir } from '../../lib/index'

var 子模块们 = getDir(require.context('./', true, /.js$/)).filter(a => a.name != 'index')
var store = {
    namespaced: true,
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    mutations: {
        设置值(state, obj) {
            Object.keys(obj).forEach(name => state[name] = obj[name])
        },
    },
    actions: {},
    modules: 子模块们.map(a => ({ [a.name]: a.obj })).reduce((s, a) => Object.assign(s, a))
}

export default _ => new Vuex.Store(store)
