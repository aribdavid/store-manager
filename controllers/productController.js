const productService = require('../services/productService');

const getAll = async (_request, response, _next) => {
    await productService.getAll()
    .then((res) => response.status(200).json(res))
    .catch((error) => response.status(error.status).json({ message: error.message }));
};

module.exports = {
  getAll,
};