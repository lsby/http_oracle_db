import express from 'express'
import app_config from '../config/app'
import db_config from '../config/db'
import oracledb from 'oracledb'
import os from 'os'

var port = app_config.port

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.send('http_oracle')
})
app.post('/runsql', async (req, res) => {
    try {
        var { name, sql, args } = req.body

        var conf = db_config[name]
        if (conf == null) throw `数据库配置 ${name} 不存在`

        var conn = await oracledb.getConnection(conf)
        var result = await conn.execute(sql, args || {}, { autoCommit: true })
        await conn.close()

        return res.send({ err: null, data: result })
    } catch (err) {
        console.error({ err, name, sql, args })
        res.send({ err, data: null })
    }
})

app.listen(port, _ => console.log(`start:\n${Object.values(os.networkInterfaces()).flat().map(a => `http://${a.address}:${port}`).join('\n')}`))

process.on('uncaughtException', (e) => console.error('未捕获的异常', e))
process.on('unhandledRejection', (e, p) => console.error('未捕获的Promise异常', e, p))
