const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InteriorDesign = new Schema({
    title: {
        type: String
    },
    info: {
        project: {
            type: String,
            default: ''
        },
        style: {
            type: String
        },
        S: {
            type: String
        }
    },
    description: {
        type: String
    },
    images: [{
        img: {
            type: String
        },
        content: {
            type: String,
            default: ''
        }
    }],
    FK_TypeInteriorDesign: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('InteriorDesign', InteriorDesign)