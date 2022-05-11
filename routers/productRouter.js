const express = require('express');
const middleware = require('../middlewares');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', middleware.productValidator, productsController.createProduct);

router.put('/:id', middleware.productValidator, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;