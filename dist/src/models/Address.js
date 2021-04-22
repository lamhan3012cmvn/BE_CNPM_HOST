const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Address = Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    createUser: {
        type: String
    },
    phone: {
        type: String
    }
}, {
    collection: 'address'
});

module.exports = mongoose.model('Address', Address);