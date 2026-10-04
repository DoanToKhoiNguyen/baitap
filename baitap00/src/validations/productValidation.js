const Joi = require('joi');

// Quy tắc khi Thêm sản phẩm mới
const createProductSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Tên sản phẩm không được để trống!',
    'any.required': 'Tên sản phẩm là bắt buộc!',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Giá sản phẩm phải là một số!',
    'number.min': 'Giá sản phẩm không được nhỏ hơn 0!',
    'any.required': 'Giá sản phẩm là bắt buộc!',
  }),
  category: Joi.string().trim().optional(),
  stock: Joi.number().integer().min(0).optional().messages({
    'number.min': 'Số lượng tồn kho không được nhỏ hơn 0!',
  }),
});

// Quy tắc khi Cập nhật sản phẩm (các trường không bắt buộc nhập hết)
const updateProductSchema = Joi.object({
  name: Joi.string().trim().optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().trim().optional(),
  stock: Joi.number().integer().min(0).optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};