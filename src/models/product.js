const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 30
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    category:{
        type: String,
        required: true
    },
    productImage: {
        type: Buffer,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product