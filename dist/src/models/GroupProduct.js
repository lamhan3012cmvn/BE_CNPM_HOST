const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupProduct = Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
}, {
    collection: 'group_product'
});

module.exports = mongoose.model('GroupProduct', GroupProduct);