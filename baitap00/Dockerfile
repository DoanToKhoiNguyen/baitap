# 1. Chọn Base Image Node.js 18 nhẹ (Alpine Linux)
FROM node:18-alpine

# 2. Tạo và chuyển vào thư mục làm việc bên trong Container
WORKDIR /app

# 3. Copy file quản lý thư viện vào trước để tận dụng Docker Cache
COPY package*.json ./

# 4. Cài đặt các phụ thuộc (dependencies)
RUN npm install

# 5. Copy toàn bộ code nguồn dự án vào Container
COPY . .

# 6. Khai báo cổng ứng dụng lắng nghe
EXPOSE 3000

# 7. Lệnh khởi chạy ứng dụng khi Container nổ máy
CMD ["node", "server.js"]