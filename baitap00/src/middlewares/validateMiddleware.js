const validate = (schema) => {
  return (req, res, next) => {
    // validate req.body với schema, abortEarly: false để lấy toàn bộ lỗi
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Bóc tách danh sách thông báo lỗi
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu đầu vào không hợp lệ!',
        errors: errorMessage,
      });
    }

    next();
  };
};

module.exports = validate;