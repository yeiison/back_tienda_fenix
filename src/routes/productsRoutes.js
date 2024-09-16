// routes/productRoutes.js
const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.post('/', authMiddleware, createProduct);

module.exports = router;
