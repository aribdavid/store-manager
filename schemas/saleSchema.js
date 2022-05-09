const joi = require('joi');

const schema = joi.object({
  productId: joi.required(),
  quantity: joi.number().integer().min(1).required(),
});

module.exports = schema; 