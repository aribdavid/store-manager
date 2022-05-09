const express = require('express');
// const middleware = require('../middlewares');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id');

// router.post('/', middleware.productValidator);

// router.put('/:id', middleware.productValidator);

// router.delete('/:id');

module.exports = router;