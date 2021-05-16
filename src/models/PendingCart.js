const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PendingCart = new Schema({
    idCustomer: {
        type: String,
        required: true
    },
    products: {
        type: [Object]
    },
    status: {
        type: String,
        default: ''
    }

}, { timestamps: true })

module.exports = mongoose.model('PendingCart', PendingCart)