const productService = require('../services/productService');

// GET /api/products
const getAllProducts = (req, res) => {
  const products = productService.getAllProducts();
  res.status(200).json(products);
};

// GET /api/products/:id
const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = productService.getProductById(id);

  if (!product) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }
  res.status(200).json(product);
};

// POST /api/products
const createProduct = (req, res) => {
  const { name, price } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!name || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: 'Tên hoặc giá không hợp lệ' });
  }

  const newProduct = productService.createProduct({ name, price });
  res.status(201).json(newProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};