const joi = require("@hapi/joi")

const schemas = {
    create: joi.object().keys({
        title: joi.string().required(),
        project: joi.string(),
        style: joi.string(),
        S: joi.string(),
        description: joi.string(),
        img: joi.string(),
        content: joi.string()
    }),
    update: joi.object().keys({
        title: joi.string().required(),
        project: joi.string(),
        style: joi.string(),
        S: joi.string(),
        description: joi.string(),
        img: joi.string(),
        content: joi.string()
    })
}


module.exports = schemas