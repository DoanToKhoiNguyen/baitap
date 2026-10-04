const express = require('express');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware đọc body JSON
app.use(express.json());

// Kết nối Cơ sở dữ liệu MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
}); 