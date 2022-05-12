const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const erroHandler = require('../utils/errorHandler');

const validateSale = async (array) => {
  const getQuantity = array.map(({ productId }) => productsModel.getById(productId));

  const response = await Promise.all(getQuantity);

  const quantityAvailable = response.map((el) => el[0].quantity);

  array.forEach(({ quantity }, i) => {
    if (quantity > quantityAvailable[i]) {
      const err = { status: 422, message: 'Such amount is not permitted to sell' };
      throw err;
    }
  });
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (sales.length === 0) throw erroHandler(404, 'Sales not found');

  return sales.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,

  }));
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);
  if (sales.length === 0) throw erroHandler(404, 'Sale not found');

  return sales.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
};

const createSale = async (products) => {
  await validateSale(products);
  const sale = await salesModel.createSale(products);
  return sale;
};

const updateSale = async (id, sale) => {
  await getById(id);
  const updatedSale = await salesModel.updateSale(id, sale);
  return updatedSale;
};

const deleteSale = async (id) => {
  const item = await getById(id);
  if (item.length > 0) {
    await salesModel.deleteSale(id);
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
  validateSale,
}; 