const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const Schema = mongoose.Schema


const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        required: true
    },
    tokenExp: {
        type: Number
    }

}, { timestamps: true })


module.exports = mongoose.model('User', User)