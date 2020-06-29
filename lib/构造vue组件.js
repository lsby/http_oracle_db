import lodash from "lodash"

export default function (opt) {
    opt.数据 = opt.数据 || {}

    var r = {}

    r._created = []
    r.created = function () {
        r._created.forEach(f => f.bind(this)(this))
    }

    Object.keys(opt).forEach(name => {
        var obj = opt[name]
        if (name == '函数')
            r.methods = obj
        else if (name == '计算属性')
            r.computed = obj
        else if (name == '组件')
            r.components = obj
        else if (name == '名称')
            r.name = obj
        else if (name == '构造函数' || name == 'created')
            r._created.push(obj)
        else if (name == '延时构造')
            r._created.push(self => setTimeout(obj.bind(self), 0))
        else
            r[name] = obj
    })

    r._前缀 = 'into_'

    r.props = {}
    Object.keys(opt.数据).forEach(name => r.props[r._前缀 + name] = { default: _ => opt.数据[name] })

    r.data = function () {
        return lodash.cloneDeep(opt.数据)
    }

    r._created.push(function (self) {
        Object.keys(r.props).forEach(name => this.$watch(_ => this[name], (newVal, oldVal) => {
            if (lodash.isEqual(this[name.substring(r._前缀.length)], newVal)) return
            // console.log('因为', name, '从', oldVal, '改变为', newVal, '所以', '将', name.substring(r._前缀.length), '设为', newVal)
            this[name.substring(r._前缀.length)] = lodash.cloneDeep(newVal)
        }, {
            deep: true,
            immediate: true
        }))

        Object.keys(opt.数据).forEach(name => this.$watch(_ => this[name], (newVal, oldVal) => {
            // console.log('因为', name, '从', oldVal, '改变为', newVal, '所以', '发送事件', `update:${r._前缀 + name}`, newVal)
            this.$emit(`update:${r._前缀 + name}`, lodash.cloneDeep(newVal))
        }, {
            deep: true,
            immediate: false
        }))
    })

    return r
}
