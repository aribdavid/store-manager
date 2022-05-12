const productsService = require('../services/productsService');

const getAll = async (_request, response, _next) => {
    await productsService.getAll()
    .then((res) => response.status(200).json(res))
    .catch((error) => response.status(error.status).json({ message: error.message }));
};

const getById = async (request, response, _next) => {
    const { id } = request.params;
     await productsService.getById(id)
     .then((res) => response.status(200).json(res))
     .catch((error) => response.status(error.status).json({ message: error.message }));
};

const createProduct = async (request, response) => {
    const { name, quantity } = request.body;
    await productsService.createProduct(name, quantity)
    .then((res) => response.status(201).json(res))
    .catch((error) => response.status(error.status).json({ message: error.message }));
};

const updateProduct = async (request, response, _next) => {
    const { id } = request.params;
    const { name, quantity } = request.body;
     await productsService.updateProduct(id, name, quantity)
     .then((res) => response.status(200).json(res))
     .catch((error) => response.status(error.status).json({ message: error.message }));
};

const deleteProduct = async (request, response, _next) => {
    const { id } = request.params;
    const result = await productsService.deleteProduct(id);
     
    if (result) return response.status(204).send();
    return response.status(404).json({ message: 'Product not found' });
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};