const router = require('express').Router()
const queries = require('../db/queries')
const dateHelper = require('./helpers/date_helper')

router.get('/', (req, res) => {
    queries.getAll()
        .orderBy('createdAt', "desc").then(clucks => {
            clucks = clucks.map(cluck => {
                cluck.easydate = dateHelper(cluck.createdAt)
                return cluck
            })
            res.render('index', {
                clucks
            })
        })
})

router.get('/signin', (req, res) => {
    res.render('signin')
})

router.post('/signin', (req, res) => {
    const ONE_DAY = new Date(Date.now() + 1000 * 60 * 60 * 24)
    res.cookie(
        'username',
        req.body.username, {
            expires: ONE_DAY
        })
    res.redirect('/')
})

router.delete('/signout', (req, res) => {
    res.clearCookie('username')
    res.redirect('/')
})

router.get('/newcluck', (req, res) => {
    if (req.cookies.username) {
        res.render('cluck')
    } else {
        res.render('signin')
    }
})

router.post('/', (req, res) => {
    if (req.body.content === "" && req.body.image_url === "") {
        res.status(401).send('<h1>Either one of section the "Content" or "ImageURL" Must be Filled!</h1>')
        return
    }
    if (req.cookies.username) {
        queries.new({
            username: req.cookies.username,
            content: req.body.content,
            image_url: req.body.image_url

        }).then(cluck => {
            res.redirect('/')
        })
    } else {
        res.status(401).send('You Must Login to create a task')
    }
})




module.exports = router