const Joi = require('joi');

// Quy tắc Đăng ký
const registerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Tên người dùng không được để trống!',
    'any.required': 'Tên người dùng là bắt buộc!',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email không đúng định dạng!',
    'string.empty': 'Email không được để trống!',
    'any.required': 'Email là bắt buộc!',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Mật khẩu phải có ít nhất 6 ký tự!',
    'string.empty': 'Mật khẩu không được để trống!',
    'any.required': 'Mật khẩu là bắt buộc!',
  }),
  role: Joi.string().valid('user', 'admin').optional(),
});

// Quy tắc Đăng nhập
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email không đúng định dạng!',
    'any.required': 'Email là bắt buộc!',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Mật khẩu không được để trống!',
    'any.required': 'Mật khẩu là bắt buộc!',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};