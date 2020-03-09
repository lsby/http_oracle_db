import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import urlEncodeChinese from './lib/urlEncodeChinese.mjs'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import indexRouter from './routes/index.mjs'
import apiRouter from './routes/api.mjs'

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(urlEncodeChinese)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/vue', express.static(path.join(__dirname, './node_modules/vue/dist')))
app.use('/jquery', express.static(path.join(__dirname, './node_modules/jquery/dist')))
app.use('/bootstrap', express.static(path.join(__dirname, './node_modules/bootstrap/dist')))

app.use('/', indexRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
