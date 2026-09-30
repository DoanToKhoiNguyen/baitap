require('dotenv').config();
const express = require('express');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: cho phép Express đọc JSON trong req.body
app.use(express.json());

// Gắn các nhóm route vào server
app.use('/api/products', productRoutes);

// Bật server
app.listen(PORT, () => {
  console.log(`Server chạy ở cổng ${PORT}`);
});