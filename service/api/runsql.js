/*
配置文件
export default {
    db1: {
        user: 'xxx',
        password: 'xxx',
        connectString: 'xxx:xxx/xxx',
    },
}

调用格式
{
    "sql": "select * from dsr_order where rownum=:1",
    "库名称": "版本环境老流程",
    "参数": [
        1
    ]
}
*/
import oracledb from 'oracledb'
import config from '../../config/db'
import L from '@lsby/ql_js'

var 执行sql = 配置 => sql => async 参数 => {
    var conn = await new Promise((res, rej) => oracledb.getConnection(配置, (err, conn) => err ? rej(err) : res(conn)))
    var 执行结果 = await new Promise((res, rej) => conn.execute(sql, 参数 || {}, { autoCommit: true }, (err, data) => err ? rej(err) : res(data)))
    await conn.close()
    return 执行结果
}

export default async (req, res, next) => {
    var { 库名称, sql, 参数 } = req.body

    var 配置 = config[库名称]
    L.断言(配置 != null)('数据库配置文件不存在', 库名称)

    var { metaData, rows } = await 执行sql(配置)(sql)(参数)
    res.send({ metaData, rows })
}
