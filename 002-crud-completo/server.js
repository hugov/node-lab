const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true}))

app.set('view engine', 'ejs')

// Rotas da aplicação
var adminRouter = express.Router()
var basicRouter = express.Router()

app.listen(3000, function() {
    console.log('server running on port 3000')
})

basicRouter.get('/', (req, res) => {
    res.render('index.ejs')
})

adminRouter.post('/', (req, res) => {
    res.render('login.ejs', { data: req.body })
})

app.use('/', basicRouter)
app.use('/admin', adminRouter)