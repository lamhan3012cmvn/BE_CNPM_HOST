const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Product = Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    total: {
        type: Number
    },
    image: {
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model('Product', Product)