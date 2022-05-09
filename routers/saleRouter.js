const express = require('express');
const middleware = require('../middlewares');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/');

router.get('/:id');

router.post('/', middleware.saleValidator, saleController.createSale);

router.put('/:id', middleware.saleValidator, saleController.updateSale);

module.exports = router;