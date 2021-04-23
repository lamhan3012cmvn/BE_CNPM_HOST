const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Address = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    createUser: {
        type: String
    },
    phone: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Address', Address)