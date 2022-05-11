const express = require('express');
const rescue = require('express-rescue');
const middleware = require('../middlewares');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', rescue(productsController.getById));

router.post('/', middleware.productValidator, rescue(productsController.createProduct));

router.put('/:id', middleware.productValidator, rescue(productsController.updateProduct));

router.delete('/:id', rescue(productsController.deleteProduct));

module.exports = router;