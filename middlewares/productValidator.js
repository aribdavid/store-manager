const schema = require('../schemas/productSchema');

const productValidator = (request, _response, next) => {
  const { name, quantity } = request.body;

  const { error } = schema.validate({ name, quantity });
  if (error) {
    const { type } = error.details[0];
    if (type === 'number.min' || type === 'string.min') { 
      next({ status: 422, message: error.message });
    } 
    next({ status: 400, message: error.message });
  }
  next();
};

module.exports = productValidator; 