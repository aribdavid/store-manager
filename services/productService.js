const productModel = require('../models/productModel');
 const errorHandler = require('../utils/errorHandler');

const getAll = async () => {
   const products = await productModel.getAll();
  if (products.length === 0) throw errorHandler(404, 'Products not found');

  return products;
};  

module.exports = {
  getAll,
};