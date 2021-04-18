const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Categories = Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    status: {
        type: String
    }
}, {
    collection: 'categories'
})

module.exports = mongoose.model('Categories', Categories)