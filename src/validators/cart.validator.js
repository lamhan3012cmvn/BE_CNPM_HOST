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
    })
}

module.exports = schemas