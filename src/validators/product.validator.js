const joi = require('@hapi/joi');

const schemas = {
	search: joi.object().keys({
		tags: joi.string()
	}),
	filter: joi.object().keys({
		price: joi.number()
	}),
	create: joi.object().keys({
		Image: joi.array().items(joi.string().required().empty()),
		Size: joi.string().required().empty(),
		Material: joi.string().required().empty(),
		Guarantee: joi.string(),
		Total: joi.number().min(0),
		Price: joi.number().min(100000),
		tags: joi.array().items(joi.string().required().empty()),
		Name: joi.string().required().empty(),
		Code: joi
			.string()
			.required()
			.empty()
			.regex(/^\d{8}$/),
		Description: joi.string().required().empty(),
		Quantity: joi.string().required(),
		FK_Room: joi.string().required().empty(),
		FK_Category: joi.string().required().empty()
	}),
	rateProduct: joi.object().keys({
		idProduct: joi.string().required().empty(),
		value: joi.string().required().empty(),
		content: joi.string().required().empty(),
	})
};

module.exports = schemas;
