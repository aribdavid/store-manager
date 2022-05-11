const express = require('express');
const middleware = require('../middlewares');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', middleware.saleValidator, salesController.createSale);

router.put('/:id', middleware.saleValidator, salesController.updateSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;