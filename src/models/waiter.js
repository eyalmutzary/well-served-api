const mongoose = require('mongoose')


const waiterSchema = mongoose.Schema({
    // Id
    waiterName: {
        type: String,
        require: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    }
})

waiterSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'waiter'
})

waiterSchema.virtual('tables', {
    ref: 'Table',
    localField: '_id',
    foreignField: 'waiter'
})


const Waiter = mongoose.model('Waiter', waiterSchema)

module.exports = Waiter