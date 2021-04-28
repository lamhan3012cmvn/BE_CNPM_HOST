const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Product = new Schema({
    productCode:{
        type:String,
        required:true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    },
    total: {
        type: Number,
        default:0
    },
    image: {
        type: [{
            type:String
        }]
    },
    size:{
        type:String,
        default:''
    },
    meterial:{
        type:String,
        default:''
    },
    guarantee:{
        type:String,
        default:''
    },
    FK_Category: {
        type: String,
        required: false,
        match: /^[A-Fa-f-9]{24}$/
    },
    FK_Room:{
        type: String,
        required: false,
        match: /^[A-Fa-f-9]{24}$/
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', Product)