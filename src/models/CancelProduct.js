const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cancel = new Schema(
	{
		idCustomer: {
			type: String,
			required: true
		},
		products: [{
			total:{
					type: Number,
					default: 0
				},
				product: {
					Code: {
						type: String,
						default: ''
					},
					Name: {
						type: String,
						default: ''
					},
					Description: {
						type: String,
						default: ''
					},
					Price: {
						type: Number,
						default: 0
					},
					Quantity: {
						type: String
					},
					Image: [{ type: String }],
					Size: {
						type: String,
						default: ''
					},
					Material: {
						type: String,
						default: ''
					},
					Guarantee: {
						type: String,
						default: ''
					},
					FK_Category: {
						type: Object,
						required: false
					},
					FK_Room: {
						type: Object,
						required: false
					}
				}
			}
		],
		totalPrice: {
			type: Number,
			default: 0
		},
		address: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('CancelProduct', Cancel);
