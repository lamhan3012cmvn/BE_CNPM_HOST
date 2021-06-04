// idPackage ,status
const joi = require("@hapi/joi");

const schemas = {
  changeStatus: joi.object().keys({
    idPackage: joi.string().required().empty(),
    status: joi.string().required().empty(),
    // address: joi.string().required().empty(),
  }),
  createPending: joi.object().keys({
    // address: joi.string().required().empty(),
  }),
};

module.exports = schemas;
