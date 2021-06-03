const joi = require('@hapi/joi');

const schemas = {
	search: joi.object().keys({
		tags: joi.string()
	}),
	filter: joi.object().keys({
		price: joi.number()
	}),
	create: joi.object().keys({
		Image: joi.array().items(joi.string().required()),
		Size: joi.string().required(),
		Material: joi.string().required(),
		Guarantee: joi.string(),
		Total: joi.number().min(0),
		Price: joi.number().min(100000),
		tags: joi.array().items(joi.string().required()),
		Name: joi.string().required(),
		Code: joi
			.string()
			.required()
			.regex(/^\d{8}$/),
		Description: joi.string().required(),
		Quantity: joi.string().required(),
		FK_Room: joi.string().required(),
		FK_Category: joi.string().required()
	}),
	rateProduct: joi.object().keys({
		idProduct: joi.string().required(),
		value: joi.string().required(),
		content: joi.string().required(),
	})
};

module.exports = schemas;
