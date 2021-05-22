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
        type: Number,
        required: true
    },
    Quantity: {
        type: String
    },
    Image: [{ type: String }]
    ,
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
        default: 'ACTIVE'
    },
    Total: {
        type: Number,
        default: 1
    },
    tags: [{
        type: String
    }],
    Rate: {
        type:[
            { type: String }
        ],
        default:[]
    },
    Heart: {
        type: String
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