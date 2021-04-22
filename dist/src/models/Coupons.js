const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Coupons = Schema({
    couponsId: {
        type: String,
        required: true
    },
    couponsName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    totalCode: {
        type: String
    },
    discountByAmount: {
        type: String
    },
    discountByPercent: {
        type: String
    },
    discountAmount: {
        type: String
    },
    discountPercent: {
        type: String
    },
    status: {
        type: String
    },
    expiredDate: {
        type: String
    }
}, {
    collection: 'coupons'
});

module.exports = mongoose.model('Coupons', Coupons);