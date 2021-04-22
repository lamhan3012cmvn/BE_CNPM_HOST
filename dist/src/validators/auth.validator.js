const joi = require("@hapi/joi");

const schemas = {
  register: joi.object().keys({
    fullName: joi.string().min(2).max(255).required(),
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required(),
    username: joi.string().min(6),
    phone: joi.string().length(10)
  }),

  login: joi.object().keys({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required()
  }),
  changePassword: joi.object().keys({
    newPassword: joi.string().min(6).max(16).required()
  })
};
module.exports = schemas;