const mongoose = require('mongoose')
const { defaultStatusPending } = require('../config/default')

const Schema = mongoose.Schema

const PendingCart = new Schema({
    idCustomer: {
        type: String,
        required: true
    },
    products: {
        type: [{
            idProduct:{
                type:String,
                required:true
            },
            total:{
                type:Number,
                default:1
            },
        }]
    },
    status: {
        type: String,
        default: defaultStatusPending.waitForConfirmation
    },
    address: {
        type: String,
        default: '',
    },
}, { timestamps: true })

module.exports = mongoose.model('PendingCart', PendingCart)