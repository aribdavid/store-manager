const productService = require('../services/productService');

const getAll = async (_request, response, _next) => {
    await productService.getAll()
    .then((res) => response.status(200).json(res))
    .catch((error) => response.status(error.status).json({ message: error.message }));
};

const getById = async (request, response, _next) => {
    const { id } = request.params;
     await productService.findById(id)
     .then((res) => response.status(200).json(res))
     .catch((error) => response.status(error.status).json({ message: error.message }));
};

const createProduct = async (request, response) => {
    const { name, quantity } = request.body;
    await productService.createProduct(name, quantity)
    .then((res) => response.status(201).json(res))
    .catch((error) => response.status(error.status).json({ message: error.message }));
};

const updateProduct = async (request, response, _next) => {
    const { id } = request.params;
    const { name, quantity } = request.body;
     await productService.updateProduct(id, name, quantity)
     .then((res) => response.status(200).json(res))
     .catch((error) => response.status(error.status).json({ message: error.message }));
};

const deleteProduct = async (request, response, _next) => {
    const { id } = request.params;
    await productService.deleteProduct(id)
    .then((_res) => response.status(204).send())
    .catch((error) => response.status(error.status).json({ message: error.message }));
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};