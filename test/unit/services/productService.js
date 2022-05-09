const productModel = require('../models/productModel');
const errorHandler = require('../../../utils/errorHandler');

const getAll = async () => {
  const products = await productModel.getAll();
  if (products.length === 0) throw errorHandler(404, 'Products not found');

  return products;
};

const getById = async (id) => {
  const products = await productModel.getById(id);
  if (products.length === 0) throw errorHandler(404, 'Product not found');

  return products[0];
};

const createProduct = async (name, quantity) => {
  const productExists = await productModel.getByName(name);
  if (productExists.length > 0) throw errorHandler(409, 'Product already exists');
  const product = await productModel.createProduct(name, quantity);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  await getById(id);
  const product = await productModel.updateProduct(id, name, quantity);

  return product;
};

const deleteProduct = async (id) => {
  await getById(id);
  await productModel.deleteProduct(id);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
}; 