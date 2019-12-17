const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const path = require('path')

const baseRouter = require('./routes/index')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))

app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method
        delete req.body._method
        return method
    }
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    res.locals.username = req.cookies.username || ''
    next()
})

app.use('/clucks', baseRouter)
app.use('/', baseRouter)


const PORT = process.env.PORT || 3000;
const DOMAIN = 'localhost'
app.listen(PORT, DOMAIN, () => {
    console.log(`Listening at http://${DOMAIN}:${PORT} in ${app.get('env')} environment`)
})