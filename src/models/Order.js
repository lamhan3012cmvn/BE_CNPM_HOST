const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Order = new Schema({
    id: {
        type: String,
        required: true
    },
    createUser: {
        type: String,
    },
    cartId: {
        type: String
    },
    status: {
        type: String
    },
    addressId: {
        type: String
    },
    checkIn: {
        type: Date
    },
    phone: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', Order)