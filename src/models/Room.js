const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Room = new Schema({
    name: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Rooms', Room)