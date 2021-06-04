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
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    address:{
        type:String,
        default:''
    },
    phone: {
        type: String,
        default: ''
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
    otp: {
        type: String,
        default: ''
    }

}, { timestamps: true })


module.exports = mongoose.model('User', User)