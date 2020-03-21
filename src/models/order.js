const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    orderSum: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: Number,
        default: 0
    },
    productList:{
        type: [{
            title: String, 
            price: Number, 
            note: String
        }],
        required: true
    },
    waiter:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Waiter'
    },
    table:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Table'
    }
},{
    timestamps: true
})

// Calculate order sum
orderSchema.pre('save', async function (next) {
    const order = this
    let sum = 0;

    order.productList.forEach(product => {
        sum += product.price;
    });
    order.orderSum = sum
    next()
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order