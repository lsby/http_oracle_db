var request = require('request')

function post(url, data) {
    return new Promise((res, rej) => request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: data
    }, (err, response, body) => err ? rej(err) : res(body)))
}
function 断言相等(变量, 值) {
    if (变量 != 值) throw `断言失败: 期待: ${值} 实际: ${变量}`
}
var 服务地址 = 'http://127.0.0.1:3000/runsql'

it('错误sql的情况', async function () {
    var { err, data } = await post(服务地址, {
        name: 'test',
        sql: `aaaaaaaaaa`,
    })
    断言相等(err.errorNum, 900)
})
it('创建表', async function () {
    var { err, data } = await post(服务地址, {
        name: 'test',
        sql: /*sql*/`
            create table test_table
            (
                id varchar2(50) primary key,
                username varchar2(200) not null,
                phone number(11) unique
            )
        `,
    })
    断言相等(err, null)
})
it('插入', async function () {
    var { err, data } = await post(服务地址, {
        name: 'test',
        sql: /*sql*/`
            INSERT INTO
                test_table (
                    id,
                    username,
                    phone
                )
            VALUES
                (1, :username, :phone)
        `,
        args: {
            phone: '1234567',
            username: 'hby',
        }
    })
    断言相等(err, null)
    断言相等(data.rowsAffected, 1)
})
it('查询', async function () {
    var { err, data } = await post(服务地址, {
        name: 'test',
        sql: /*sql*/`
            SELECT * FROM test_table
        `,
        args: {}
    })
    断言相等(err, null)
    断言相等(JSON.stringify(data.metaData), JSON.stringify([{ name: 'ID' }, { name: 'USERNAME' }, { name: 'PHONE' }]))
    断言相等(JSON.stringify(data.rows), JSON.stringify([['1', 'hby', 1234567]]))
})
it('删除表', async function () {
    var { err, data } = await post(服务地址, {
        name: 'test',
        sql: /*sql*/`
            drop table test_table
        `,
    })
    断言相等(err, null)
})
