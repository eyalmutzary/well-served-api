const express = require('express')
require('./db/mongoose')
const Order = require('./models/table')
const productRouter = require('./routers/product')
const waiterRouter = require('./routers/waiter')
const tableRouter = require('./routers/table')
const ordersRouter = require('./routers/order')





const app = express()

app.use(express.json())
app.use(productRouter)
app.use(waiterRouter)
app.use(tableRouter)
app.use(ordersRouter)


module.exports = app