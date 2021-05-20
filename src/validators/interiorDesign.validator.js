const joi = require("@hapi/joi")

const schemas = {
    create: joi.object().keys({
        title: joi.string().required(),
        project: joi.string(),
        style: joi.string(),
        S: joi.string(),
        description: joi.string(),
        img: joi.string(),
        content: joi.string(),
        FK_TypeInteriorDesign: joi.string()
    }),
    createType: joi.object().keys({
        name: joi.string()
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