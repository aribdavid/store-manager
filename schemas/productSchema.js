const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(5).max(30).required(),
  quantity: joi.number().integer().min(1).required(),
});

module.exports = schema;