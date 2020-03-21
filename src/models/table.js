const mongoose = require('mongoose')
const Order = require('./order')



const tableSchema = mongoose.Schema({
    tableName:{
        type: String,
        required: true,
        unique: true
    },
    diners: {
        type: Number,
        default: 0
    },
    tableSum: {
        type: Number,
        default: 0
    },
    waiter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Waiter'
    }
},{
    timestamps: true
})

tableSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'table'
})

// Remove all orders of table before it resets or deleted
tableSchema.pre('remove', async function (next) {
    const table = this
    await Order.deleteMany({ table: table._id })
    next()
})


const Table = mongoose.model('Table', tableSchema)

module.exports = Table