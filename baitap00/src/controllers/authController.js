const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const userData = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const userData = await authService.login(req.body);
    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};