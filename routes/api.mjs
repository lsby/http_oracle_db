import express from 'express'
import oracledb from 'oracledb'
import * as node_api from './../lib/node_api/index.mjs'
import * as config from './../config/db.mjs'
/*
{
    user: 'xxx',
    password: 'xxx',
    connectString: 'ip:端口/sid',
}
*/

var 异常 = node_api.常用.异常

var router = express.Router()

var 执行sql = 配置 => sql => 参数 => {
  return new Promise((res, rej) => {
    oracledb.getConnection(配置, (err, conn) => {
      if (err)
        return rej(err)
      conn.execute(sql, 参数, { autoCommit: true }, (err, data) => {
        if (err) {
          conn.close()
          return rej(err)
        }
        conn.close()
        return res(data)
      })
    })
  })
}

/*
{
    "sql": "select * from dsr_order where rownum=:1",
    "库名称": "db1",
    "参数": [
        1
    ]
}
*/
router.post('/runsql', async function (req, res, next) {
  try {
    var { 库名称, sql, 参数 } = req.body

    var 配置 = config[库名称]
    if (配置 == null)
      异常('数据库配置不存在')
    var { metaData, rows } = await 执行sql(配置)(sql)(参数)
    res.send({ err: null, data: { metaData, rows } })
  } catch (e) {
    res.send({
      err: e.toString(), data: {
        e,
        库名称,
        sql,
        参数
      }
    })
  }
})

export default router
