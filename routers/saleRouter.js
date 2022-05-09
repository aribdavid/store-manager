const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/');

router.get('/:id');

router.post('/', middleware.saleValidator);

router.put('/:id', middleware.saleValidator);

module.exports = router;