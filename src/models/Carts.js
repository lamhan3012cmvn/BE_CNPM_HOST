const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Carts = Schema({
    id: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    createUser: {
        type: String
    },
    status: {
        type: String
    },
    quantity: {
        type: Number
    }
}, {
    collection: 'carts'
})

module.exports = mongoose.model('Carts', Carts)