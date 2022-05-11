const express = require('express');
const middleware = require('../middlewares');
const productController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/', middleware.productValidator, productController.createProduct);

router.put('/:id', middleware.productValidator, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;