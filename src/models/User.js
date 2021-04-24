const mongoose = require('mongoose')
const Schema = mongoose.Schema


const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        default:""
    },
    phone: {
        type: String,
        default:""
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default:""
    },
    tokenExp:{
        type:Number,
        default:0
    }

},{timestamps:true})


module.exports = mongoose.model('User', User)