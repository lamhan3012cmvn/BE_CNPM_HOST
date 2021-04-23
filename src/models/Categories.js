const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Categories = new Schema({
    categoriesId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // image: {
    //     type: String
    // },
    // status: {
    //     type: String
    // }
}, { timestamps: true })

module.exports = mongoose.model('Categories', Categories)