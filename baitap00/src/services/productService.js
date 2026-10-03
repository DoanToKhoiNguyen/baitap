const Product = require('../models/productModel');

class ProductService {
  // Lấy tất cả sản phẩm
  async getAllProducts() {
    return await Product.find();
  }

  // Lấy sản phẩm theo ID
  async getProductById(id) {
    return await Product.findById(id);
  }

  // Tạo sản phẩm mới
  async createProduct(productData) {
    return await Product.create(productData);
  }

  // Cập nhật sản phẩm
  async updateProduct(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  // Xóa sản phẩm
  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();