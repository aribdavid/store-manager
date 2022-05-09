const schema = require('../schemas/saleSchema');

const productValidation = (request, _response, next) => {
  request.body.forEach(({ productId, quantity }) => {
    const { error } = schema.validate({ productId, quantity });
    if (error) {
      const { type } = error.details[0];
      if (type === 'any.required') {
        next({ status: 400, message: error.message });
      }
      next({ status: 422, message: error.message });
    }
  });
  next();
};

module.exports = productValidation;