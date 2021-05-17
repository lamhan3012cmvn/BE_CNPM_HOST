const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Cart = new Schema({
    products: [{
        idProduct:{
            type:String,
            required:true
        },
        total:{
            type:Number,
            default:1
        },
        isActive:{
            type:String,
            default:"INACTIVE"
        }
    }],
    FK_CreateAt: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Cart', Cart)