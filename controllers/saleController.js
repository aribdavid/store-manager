const saleService = require('../services/saleService');

const getAll = async (_request, response, _next) => {
   await saleService.getAll()
   .then((res) => response.status(200).json(res))
   .catch((error) => response.status(error.status).json({ message: error.message }));
};

const getById = async (request, response, _next) => {
   const { id } = request.params;
   await saleService.getById(id)
   .then((res) => response.status(200).json(res))
   .catch((error) => response.status(error.status).json({ message: error.message }));
};

const createSale = async (request, response, next) => {
    const sale = request.body;
    await saleService.createSale(sale)
    .then((res) => response.status(201).json(res))
    .catch((error) => next(error));
};

const updateSale = async (request, response, next) => {
    const { id } = request.params;
    const [sale] = request.body;
    await saleService.updateSale(id, sale)
    .then((res) => response.status(200).json(res)) 
    .catch((error) => next(error));
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
}; 