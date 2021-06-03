const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema(
	{
		Code: {
			type: String,
				default:''
		},
		Name: {
			type: String,
				default:''
		},
		Description: {
			type: String,
				default:''
		},
		Price: {
			type: Number,
			default:1000000
		},
		Quantity: {
			type: String,
			default:''
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
		isStatus: {
			type: String,
			default: 'ACTIVE'
		},
		Total: {
			type: Number,
			default: 1
		},
		tags: [
			{
				type: String
			}
		],
		Rate: 
			 [
				{
						value: {
							type: String,
							default:'1'
						},
						comment: [
							{
								current: {
									type: String,
									default:''
								},
								content: { type: String,default:'' }
							}
						]	
					}
					
			
			],
			// default: []
		// },
		Heart: {
			type: String,
			default:'0'
		},
		FK_Category: {
			type: String,
			required: false,
			match: /^[A-Fa-f0-9]{24}$/
		},
		FK_Room: {
			type: String,
			required: false,
			match: /^[A-Fa-f0-9]{24}$/
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Product', Product);
