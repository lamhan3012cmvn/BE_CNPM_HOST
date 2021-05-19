const joi = require("@hapi/joi")

const schemas = {
    search: joi.object().keys({
        name: joi.string(),
        material: joi.string(),
        code: joi.string()
    })
}


module.exports = schemas