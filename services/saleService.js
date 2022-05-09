const saleModel = require('../models/saleModel');

const erroHandler = require('../utils/errorHandler');

const getAll = async () => {
  const sales = await saleModel.getAll();
  if (sales.length === 0) throw erroHandler(404, 'Sales not found');

  return sales.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,

  }));
};

const getById = async (id) => {
  const sales = await saleModel.getById(id);
  if (sales.length === 0) throw erroHandler(404, 'Sale not found');

  return sales.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
};

const createSale = async (products) => {
  const sale = await saleModel.createSale(products);
  return sale;
};

const updateSale = async (id, sale) => {
  await getById(id);
  const updatedSale = await saleModel.updateSale(id, sale);
  return updatedSale;
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
}; 