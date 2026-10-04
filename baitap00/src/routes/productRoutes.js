const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorizeAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const {
  createProductSchema,
  updateProductSchema,
} = require('../validations/productValidation');

// Public Routes (Xem danh sách & chi tiết)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected Routes (Cần Token & Quản lý)
router.post('/', protect, authorizeAdmin, validate(createProductSchema), productController.createProduct);
router.put('/:id', protect, authorizeAdmin, validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', protect, authorizeAdmin, productController.deleteProduct);

module.exports = router;