const salesService = require('../services/salesService');

const getAll = async (_request, response, _next) => {
   await salesService.getAll()
   .then((res) => response.status(200).json(res))
   .catch((error) => response.status(error.status).json({ message: error.message }));
};

const getById = async (request, response, _next) => {
   const { id } = request.params;
   await salesService.getById(id)
   .then((res) => response.status(200).json(res))
   .catch((error) => response.status(error.status).json({ message: error.message }));
};

const createSale = async (request, response, next) => {
    const sale = request.body;
    await salesService.createSale(sale)
    .then((res) => response.status(201).json(res))
    .catch((error) => next(error));
};

const updateSale = async (request, response, next) => {
    const { id } = request.params;
    const [sale] = request.body;
    await salesService.updateSale(id, sale)
    .then((res) => response.status(200).json(res)) 
    .catch((error) => next(error));
};

const deleteSale = async (request, response) => {
  const { id } = request.params;
  await salesService.deleteSale(id)
  .then((res) => response.status(204).json(res));
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
}; 