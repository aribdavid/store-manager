const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/');

router.get('/:id');

router.post('/', middleware.productValidator);

router.put('/:id', middleware.productValidator);

router.delete('/:id');

module.exports = router;