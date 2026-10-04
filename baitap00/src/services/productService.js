const Product = require('../models/productModel');

const getAllProducts = async (queryParams = {}) => {
  const page = Math.max(1, parseInt(queryParams.page) || 1);
  const limit = Math.max(1, parseInt(queryParams.limit) || 10);
  const skip = (page - 1) * limit;

  const { search, category, minPrice, maxPrice, sortBy } = queryParams;

  let filter = {};

  // Tìm kiếm tương đối theo tên
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  // Lọc theo danh mục
  if (category) {
    filter.category = category;
  }

  // Lọc theo khoảng giá
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Sắp xếp
  let sortOption = { createdAt: -1 };
  if (sortBy === 'price_asc') {
    sortOption = { price: 1 };
  } else if (sortBy === 'price_desc') {
    sortOption = { price: -1 };
  } else if (sortBy === 'oldest') {
    sortOption = { createdAt: 1 };
  }

  // Thực thi query
  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limit) || 1;

  return {
    products,
    pagination: {
      totalProducts,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Không tìm thấy sản phẩm!');
  return product;
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const updateProduct = async (id, updateData) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedProduct) throw new Error('Không tìm thấy sản phẩm để cập nhật!');
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) throw new Error('Không tìm thấy sản phẩm để xóa!');
  return deletedProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};