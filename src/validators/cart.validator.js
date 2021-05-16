const joi = require("@hapi/joi")

const schemas = {
    create: joi.object().keys({
        idCustomer: joi.string().required(),
        products: joi.object()
    }),
    update: joi.object().keys({
        idCustomer: joi.string().required(),
        products: joi.object()
    })
}

module.exports = schemas