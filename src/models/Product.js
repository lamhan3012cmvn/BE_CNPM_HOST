const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Product = new Schema({
    Code: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Quantity: {
        type: String
    },
    Image: {
        type: String
    },
    Size: {
        type: String,
        default: ''
    },
    Material: {
        type: String,
        default: ''
    },
    Guarantee: {
        type: String,
        default: ''
    },
    isStatus: {
        type: String,
        default: ''
    },
    Total:{
        type:Number,
        default:0
    },
    FK_Category: {
        type: String,
        required: false,
        match: /^[A-Fa-f0-9]{24}$/
    },
    FK_Room: {
        type: String,
        required: false,
        match: /^[A-Fa-f0-9]{24}$/
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', Product)