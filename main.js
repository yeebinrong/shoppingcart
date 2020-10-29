// load libraries
const express = require('express')
const handlebars = require('express-handlebars')
const fetch = require('node-fetch')
const withQuery = require('with-query').default

// create an instance of express
const app = express()

// configure handlebars
app.engine('hbs',
    handlebars({ defaultLayout: 'template.hbs' }))
app.set('view engine', 'hbs')

// declare port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// declare variable

// GET routing
app.get('/', 
express.urlencoded({ extended: true}),    
(req, resp) => {
    const cart = []
    resp.status(200)    
    resp.type('text/html')
    resp.render('index',
        {
            cartState: JSON.stringify(cart)
        }
    )
})

// load resources
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/static`))

// POST routing
app.post('/', 
    express.urlencoded({ extended: true}),    
    (req, resp) => {
        const cart = JSON.parse(req.body.cartState)
        cart.push({
            item: req.body.item,
            quantity: req.body.quantity,
            price: req.body.price
        })
        resp.status(201)
        resp.type('text/html')
        resp.render('index',
            {
                cartState: JSON.stringify(cart),
                cart
            }
        )
    }
)

// listen
app.listen(PORT, () => {
    console.info(`Application started listening on PORT ${PORT} on ${new Date()}.`)
})