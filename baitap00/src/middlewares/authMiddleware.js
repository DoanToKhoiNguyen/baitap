const jwt = require('jsonwebtoken');

// 1. Middleware Xác thực người dùng (Đã đăng nhập chưa?)
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Trích xuất Token từ header "Bearer <TOKEN>"
      token = req.headers.authorization.split(' ')[1];

      // Giải mã Token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallback_secret'
      );

      // Lưu thông tin decoded (id, role) vào req.user để các bước sau dùng
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn!',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Bạn không có quyền truy cập, thiếu Token!',
    });
  }
};

// 2. Middleware Kiểm tra quyền Admin (Có phải Admin không?)
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Chỉ có tài khoản Admin mới có quyền thực hiện thao tác này!',
    });
  }
};

module.exports = { protect, authorizeAdmin };