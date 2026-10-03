const productService = require('../services/productService');

class ProductController {
  // Tạo sản phẩm mới
  async createProduct(req, res) {
    try {
      // BẮT BUỘC có await ở đây
      const newProduct = await productService.createProduct(req.body); 
      
      // Trả về sản phẩm vừa tạo cho Postman
      return res.status(201).json(newProduct); 
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Lấy tất cả sản phẩm
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Lấy 1 sản phẩm theo ID
  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // Cập nhật sản phẩm (PUT)
  async updateProduct(req, res) {
    try {
      const updatedProduct = await productService.updateProduct(req.params.id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm để cập nhật' });
      }
      res.status(200).json({
        success: true,
        message: 'Cập nhật sản phẩm thành công',
        data: updatedProduct
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
  async deleteProduct(req, res) {
    try {
      const deletedProduct = await productService.deleteProduct(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm để xóa' });
      }
      res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm thành công',
        data: deletedProduct
      });
    } catch (error) {
      res.status(400).json({ success: false, message: 'ID không hợp lệ hoặc lỗi hệ thống' });
    }
  }
}


module.exports = new ProductController();