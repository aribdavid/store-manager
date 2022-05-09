const schema = require('../schemas/saleSchema');

const productValidation = (request, _response, next) => {
  request.body.forEach((sale) => {
    const { error } = schema.validate(sale);
    if (error) {
      const { type } = error.details[0];
      if (type === 'number.min') next({ status: 422, message: error.message });
      next({ status: 400, message: error.message });
    }
  });

  next();
};

module.exports = productValidation;