import VueRouter from 'vue-router'
import { getDir, 副作用, 数组转对象通过值 } from '../../lib/index'

// 读入页面
// 按页面生成路由
// TODO 按页面层级自动生成路由 动态路由
var 页面们 = getDir(require.context('../page', true, /.vue$/))
var routes = 页面们.map(obj => ({ path: `/${obj.name}`, component: obj.obj }))

// 添加自定义路由
routes = [
    { path: '/', component: 数组转对象通过值(a => a.name)(a => a.obj)(页面们).index },
].reduce((s, a) => 副作用(s)(_ => s.push(a)), routes)

export default _ => new VueRouter({ routes })
