const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required(),
});

module.exports = schema;