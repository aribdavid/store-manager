const productService = require('../services/productService');

const getAll = async (_request, response, _next) => {
  try {
    const products = await productService.getAll();

    return response.status(200).json(products);
  } catch (error) {
    return response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getAll,
};