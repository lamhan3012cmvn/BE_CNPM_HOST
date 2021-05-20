const joi = require("@hapi/joi")

const schemas = {
    search: joi.object().keys({
        tags: joi.string()
    }),
    filter: joi.object().keys({
        price: joi.number()
    })
}


module.exports = schemas