const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hàm bổ trợ sinh JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '1d',
  });
};

const register = async ({ name, email, password, role }) => {
  // 1. Kiểm tra email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email này đã được sử dụng!');
  }

  // 2. Hash mật khẩu
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Tạo User mới
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'user',
  });

  // 4. Trả về thông tin (không kèm password) + Token
  const token = generateToken(user._id, user.role);
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

const login = async ({ email, password }) => {
  // 1. Tìm user theo email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email hoặc mật khẩu không chính xác!');
  }

  // 2. So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Email hoặc mật khẩu không chính xác!');
  }

  // 3. Sinh token và trả về
  const token = generateToken(user._id, user.role);
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

module.exports = {
  register,
  login,
};