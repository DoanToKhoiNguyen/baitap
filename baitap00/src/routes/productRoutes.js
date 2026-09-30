const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products       -> lấy tất cả sản phẩm
router.get('/', productController.getAllProducts);

// GET /api/products/:id   -> lấy 1 sản phẩm theo id
router.get('/:id', productController.getProductById);

// POST /api/products      -> thêm sản phẩm mới
router.post('/', productController.createProduct);

module.exports = router;