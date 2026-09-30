// Dữ liệu giả (thay cho database)
let products = [
  { id: 1, name: 'Sữa tươi', price: 12000 },
  { id: 2, name: 'Bánh mì', price: 8000 },
  { id: 3, name: 'Nước suối', price: 5000 },
];

// Lấy tất cả sản phẩm
const getAllProducts = () => {
  return products;
};

// Lấy 1 sản phẩm theo id
const getProductById = (id) => {
  return products.find((p) => p.id === id);
};

// Thêm sản phẩm mới
const createProduct = (data) => {
  const newProduct = {
    id: products.length + 1,
    name: data.name,
    price: data.price,
  };
  products.push(newProduct);
  return newProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};