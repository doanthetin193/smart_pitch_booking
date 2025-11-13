# 📖 Hướng dẫn triển khai cho thành viên

## 📦 Yêu cầu hệ thống

Cài đặt sẵn các phần mềm sau:

- **Java JDK 17** trở lên
- **Maven 3.8+** (hoặc dùng `mvnw` có sẵn)
- **Node.js 18+** và **npm**
- **MySQL 8.0** (khuyến nghị dùng XAMPP)
- **Git**

---

## 🚀 Bước 1: Clone project

```bash
git clone https://github.com/doanthetin193/smart_pitch_booking.git
cd smartpitchbooking
```

---

## 🗄️ Bước 2: Tạo database

### Mở XAMPP:
1. Start **Apache** và **MySQL**
2. Mở **phpMyAdmin** (http://localhost/phpmyadmin)

### Tạo database trống:
```sql
CREATE DATABASE smartpitchbooking;
```

**Lưu ý:** Không cần import file `.sql`, Hibernate sẽ tự tạo bảng khi chạy backend lần đầu.

---

## ⚙️ Bước 3: Cấu hình backend

### Kiểm tra file `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartpitchbooking
spring.datasource.username=root
spring.datasource.password=
```

**Nếu MySQL của bạn có password**, sửa dòng `spring.datasource.password=` thành password của bạn.

---

## 🏃 Bước 4: Chạy backend

### Cách 1: Dùng Maven Wrapper (khuyến nghị)
```bash
# Ở thư mục root (smartpitchbooking)
mvnw.cmd spring-boot:run
```

### Cách 2: Dùng Maven toàn cục
```bash
mvn spring-boot:run
```

### Kiểm tra:
- Backend chạy tại: **http://localhost:8080**
- Nếu thành công, console sẽ hiển thị:
  ```
  Started SmartpitchbookingApplication in X.XXX seconds
  ```

---

## 🎨 Bước 5: Chạy frontend

### Mở terminal mới, vào thư mục frontend:
```bash
cd frontend
```

### Cài đặt dependencies:
```bash
npm install
```

### Chạy dev server:
```bash
npm run dev
```

### Kiểm tra:
- Frontend chạy tại: **http://localhost:5173**
- Mở trình duyệt vào địa chỉ trên

---

## ✅ Bước 6: Kiểm tra kết quả

### 1. Kiểm tra database:
Vào phpMyAdmin, database `smartpitchbooking` sẽ có 2 bảng:
- `users` (3 tài khoản mẫu)
- `pitches` (6 sân bóng mẫu)

### 2. Đăng nhập thử:

| Tài khoản | Mật khẩu | Role | Chức năng |
|-----------|----------|------|-----------|
| `admin` | `admin123` | ADMIN | Quản trị: Xem tất cả sân, duyệt sân |
| `owner1` | `123456` | OWNER | Chủ sân: Thêm/sửa/xóa sân của mình |
| `user1` | `123456` | USER | Người dùng: Xem danh sách sân |

### 3. Test các tính năng:

#### Với ADMIN (`admin/admin123`):
- ✅ Đăng nhập thành công
- ✅ Navbar hiển thị: Trang chủ | **Quản trị** | Đăng xuất
- ✅ Không hiển thị "Sân của tôi"
- ✅ Vào Quản trị → Xem danh sách sân → Duyệt sân

#### Với OWNER (`owner1/123456`):
- ✅ Đăng nhập thành công
- ✅ Navbar hiển thị: Trang chủ | **Sân của tôi** | Đăng xuất
- ✅ Không hiển thị "Quản trị"
- ✅ Vào Sân của tôi → Thêm sân mới / Sửa / Xóa

#### Với USER (`user1/123456`):
- ✅ Đăng nhập thành công
- ✅ Navbar hiển thị: Trang chủ | Đăng xuất
- ✅ Chỉ xem được danh sách sân, không có quyền thêm/sửa/xóa

---

## 📁 Cấu trúc thư mục quan trọng

```
smartpitchbooking/
│
├── src/main/                          # Backend (Java)
│   ├── java/com/dung/smartpitchbooking/
│   │   ├── controller/               # REST API Endpoints
│   │   ├── service/                  # Business Logic
│   │   ├── repository/               # Database Access
│   │   ├── entity/                   # Models (User, Pitch)
│   │   ├── security/                 # JWT + Security
│   │   └── config/DataInitializer.java  # Tạo dữ liệu mẫu
│   └── resources/application.properties  # Cấu hình DB
│
├── frontend/                          # Frontend (React)
│   ├── src/
│   │   ├── pages/                    # Trang: Home, Login, MyPitches...
│   │   ├── components/               # Component: Navbar
│   │   ├── services/api.js           # Axios API calls
│   │   └── contexts/AuthContext.jsx  # Quản lý đăng nhập
│   └── package.json
│
└── pom.xml                            # Maven dependencies
```