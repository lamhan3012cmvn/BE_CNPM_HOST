const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Cart = new Schema({
    idCustomer: {
        type: String,
        required: true
    },
    products: {
        type: [Object]
    }

}, { timestamps: true })

module.exports = mongoose.model('Cart', Cart)