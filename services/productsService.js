const productsModel = require('../models/productsModel');
const errorHandler = require('../utils/errorHandler');

const getAll = async () => {
   const products = await productsModel.getAll();
  if (products.length === 0) throw errorHandler(404, 'Products not found');

  return products;
};  

const getById = async (id) => {
  const products = await productsModel.getById(id);
  if (products.length === 0) throw errorHandler(404, 'Product not found');

  return products[0];
};

const createProduct = async (name, quantity) => {
  const productExists = await productsModel.getByName(name);
  if (productExists.length > 0) throw errorHandler(409, 'Product already exists');
  const product = await productsModel.createProduct(name, quantity);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  await getById(id);
  const product = await productsModel.updateProduct(id, name, quantity);

  return product;
};

const deleteProduct = async (id) => {
  const item = await productsModel.getById(id);
  if (item.length > 0) {
    await productsModel.deleteProduct(id);
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};