const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createProduct);
router.get('/', auth, getProducts);
router.get('/:id', auth, getProductById);

module.exports = router;
