const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Product = new Schema({
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
    },
    FK_Category: {
        type: String,
        required: false,
        match: /^[A-Fa-f-9]{24}$/
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', Product)