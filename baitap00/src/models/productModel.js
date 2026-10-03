const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: [true, 'Tên sản phẩm không được để trống'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Giá sản phẩm không được để trống'],
      min: 0
    },
    category: {
      type: String,
      default: 'Chưa phân loại'
    },
    stock: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // Tự động tạo createdAt, updatedAt
  }
);

module.exports = mongoose.model('Product', productSchema);  