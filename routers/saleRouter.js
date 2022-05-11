const express = require('express');
const rescue = require('express-rescue');
const middleware = require('../middlewares');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', rescue(salesController.getById));

router.post('/', middleware.saleValidator, rescue(salesController.createSale));

router.put('/:id', middleware.saleValidator, rescue(salesController.updateSale));

router.delete('/:id', rescue(salesController.deleteSale));

module.exports = router;