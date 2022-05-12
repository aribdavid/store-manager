const salesModel = require('../models/salesModel');

const erroHandler = require('../utils/errorHandler');

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
  const sale = await salesModel.createSale(products);
  return sale;
};

const updateSale = async (id, sale) => {
  await getById(id);
  const updatedSale = await salesModel.updateSale(id, sale);
  return updatedSale;
};

const deleteSale = async (id) => {
  await getById(id);
  await salesModel.deleteSale(id);
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
}; 