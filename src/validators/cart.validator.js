const joi = require("@hapi/joi")

const schemas = {
    create: joi.object().keys({
        idProduct: joi.string().required(),
        total:joi.number(),
    }),
    update: joi.object().keys({
        idProduct: joi.string().required(),
        total:joi.number(),
        status:joi.string(),
    }),
    delete:joi.object().keys({
        idProduct: joi.string().required(),
    })
}

module.exports = schemas