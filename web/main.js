import lodash from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import 'view-design/dist/styles/fonts/ionicons.woff2'
import io from "socket.io-client/dist/socket.io.js"
import app from './app.vue'
import { post } from '@lib/post'
import { getDir } from "@lib/index"
import getStore from './store/index'
import getRoute from './route/index'

var 组件们 = Object.values(getDir(require.context('./components', true, /.vue$/)))
var 布局们 = Object.values(getDir(require.context('./layout', true, /.vue$/)))

var main = async _ => {
    await post('/api/初始化session')({})

    Vue.use(Vuex)
    Vue.use(VueRouter)
    Vue.use(ViewUI)

    if (socket == null) var socket = io()
    var store = getStore()
    var router = getRoute()

    Vue.use({
        install: function (Vue, options) {
            Vue.prototype.$post = post
            Vue.prototype.$socket = socket

            Vue.prototype.$深克隆 = 值 => lodash.cloneDeep(值)

            Vue.prototype.$Vuex = {}
            Vue.prototype.$Vuex.数据 = store.state
            Vue.prototype.$Vuex.突变 = store.commit
            Vue.prototype.$Vuex.异步突变 = store.dispatch

            Vue.prototype.$路由 = {}
            Vue.prototype.$路由.跳转 = 页面 => router.push(页面)
            Vue.prototype.$路由.后退 = _ => window.history.length > 1 ? router.go(-1) : router.push('/')

            Vue.prototype.$ws = {}
            Vue.prototype.$ws.提交 = 名称 => 参数 => socket.emit(名称, 参数)
            Vue.prototype.$ws.发送 = Vue.prototype.$ws.提交
            Vue.prototype.$ws.监听 = 名称 => 函数 => socket.on(名称, 函数)
            Vue.prototype.$ws.停止监听 = 名称 => socket.off(名称)
        }
    })

    组件们.forEach(obj => Vue.component(obj.obj.name, obj.obj));
    布局们.forEach(obj => Vue.component(obj.obj.name, obj.obj));

    new Vue({
        store,
        router,
        components: { app }
    }).$mount('#app')

    if (module.hot) {
        module.hot.accept()
        module.hot.accept("./store/index.js", () => {
            window.reload()
        })
    }
}

main()
