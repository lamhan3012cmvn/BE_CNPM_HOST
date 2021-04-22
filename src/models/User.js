const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const Schema = mongoose.Schema


const User = Schema({
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
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
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
    tokenExp:{
        type:Number
    }

}, {
    collection: 'user'
})


module.exports = mongoose.model('User', User)