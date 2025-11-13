# ⚽ Hệ Thống Đặt Sân Bóng Đá - Sprint 1

Ứng dụng web đặt sân bóng đá trực tuyến với Spring Boot + React + MySQL

## 📋 Chức năng đã hoàn thành (Sprint 1)

### 🔐 Authentication (JWT)
- Đăng ký tài khoản với 3 vai trò: USER, OWNER, ADMIN
- Đăng nhập và nhận JWT token (thời hạn 24h)
- Phân quyền truy cập theo role

### ⚽ CRUD Sân bóng
- **USER**: Xem danh sách sân, xem chi tiết
- **OWNER**: Quản lý sân của mình (Thêm/Sửa/Xóa), xem trạng thái duyệt
- **ADMIN**: Xem tất cả sân, duyệt sân mới, xóa sân bất kỳ

## �️ Công nghệ sử dụng

**Backend:**
- Spring Boot 3.4.11
- Spring Security + JWT
- Spring Data JPA + Hibernate
- MySQL 8.0
- Maven

**Frontend:**
- React 19.2.0
- Vite 7.2.2
- React Router DOM v6
- Axios

## 🚀 Hướng dẫn triển khai

Xem file [TRIEN_KHAI_CHO_THANH_VIEN.md](TRIEN_KHAI_CHO_THANH_VIEN.md) để biết chi tiết cách cài đặt và chạy project.

## 👥 Tài khoản test

Sau khi chạy backend lần đầu, hệ thống tự động tạo 3 tài khoản:

| Username | Password | Role | Mô tả |
|----------|----------|------|-------|
| admin | admin123 | ADMIN | Quản trị hệ thống |
| owner1 | 123456 | OWNER | Chủ sân (có 6 sân mẫu) |
| user1 | 123456 | USER | Người dùng thường |

## 📂 Cấu trúc project

```
smartpitchbooking/
├── src/main/java/com/dung/smartpitchbooking/
│   ├── entity/          # User, Pitch
│   ├── repository/      # JPA Repositories
│   ├── service/         # Business Logic
│   ├── controller/      # REST API Endpoints
│   ├── security/        # JWT, Security Config
│   ├── dto/             # Request/Response DTOs
│   └── config/          # Data Initializer, Exception Handler
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar
│   │   ├── pages/       # Home, Login, Register, PitchDetail, MyPitches, AdminDashboard
│   │   ├── contexts/    # AuthContext
│   │   └── services/    # API Service (Axios)
│   └── package.json
└── pom.xml
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Pitches
- `GET /api/pitches` - Lấy tất cả sân (public)
- `GET /api/pitches/{id}` - Chi tiết sân
- `POST /api/pitches` - Tạo sân mới (OWNER)
- `PUT /api/pitches/{id}` - Cập nhật sân (OWNER)
- `DELETE /api/pitches/{id}` - Xóa sân (OWNER/ADMIN)
- `GET /api/pitches/my-pitches` - Sân của tôi (OWNER)
- `PATCH /api/pitches/{id}/approve` - Duyệt sân (ADMIN)

## 🎯 Kết quả đạt được

✅ Hoàn thành 100% yêu cầu Sprint 1  
✅ Backend: 20 Java classes, 12+ API endpoints  
✅ Frontend: 9 React components/pages  
✅ Database: 2 tables với quan hệ FK  
✅ Giao diện responsive, thân thiện người dùng  
✅ Phân quyền rõ ràng theo role  

## 📧 Liên hệ

- **Sinh viên**: Nguyễn Văn Dũng
- **MSSV**: 4551190009
- **Email**: nguyenvandung6000@gmail.com

## 🛠️ Công nghệ sử dụng

- **Backend Framework:** Spring Boot 3.4.11
- **Security:** Spring Security + JWT
- **Database:** MySQL
- **ORM:** Spring Data JPA (Hibernate)
- **Build Tool:** Maven
- **Java Version:** 17

## 📦 Cài đặt

### 1. Yêu cầu hệ thống
- Java 17+
- MySQL 8.0+
- Maven 3.6+

### 2. Cài đặt MySQL

Tạo database:
```sql
CREATE DATABASE smartpitchbooking;
```

### 3. Cấu hình Database

Mở file `src/main/resources/application.properties` và cập nhật thông tin database:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartpitchbooking?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password
```

### 4. Cài đặt dependencies

```bash
mvnw clean install
```

## 🚀 Chạy ứng dụng

### Cách 1: Sử dụng Maven Wrapper (Windows)
```bash
mvnw.cmd spring-boot:run
```

### Cách 2: Sử dụng Maven (nếu đã cài)
```bash
mvn spring-boot:run
```

### Cách 3: Chạy file JAR
```bash
mvnw.cmd clean package
java -jar target/smartpitchbooking-0.0.1-SNAPSHOT.jar
```

Ứng dụng sẽ chạy tại: `http://localhost:8080`

## 📊 Dữ liệu mẫu

Khi khởi động lần đầu, hệ thống tự động tạo:

### Tài khoản
- **Admin:** 
  - Username: `admin`
  - Password: `admin123`
  
- **Chủ sân:**
  - Username: `owner1`
  - Password: `123456`
  
- **User thường:**
  - Username: `user1`
  - Password: `123456`

### Sân bóng mẫu
- Sân bóng Thành Công (Sân 5 người)
- Sân bóng Minh Khai (Sân 7 người)

## 📖 API Documentation

Xem chi tiết tại: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### Endpoints chính:

**Authentication:**
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

**Pitches:**
- `GET /api/pitches` - Xem tất cả sân (Public)
- `GET /api/pitches/{id}` - Xem chi tiết sân (Public)
- `POST /api/pitches` - Tạo sân mới (OWNER/ADMIN)
- `PUT /api/pitches/{id}` - Cập nhật sân (OWNER/ADMIN)
- `DELETE /api/pitches/{id}` - Xóa sân (OWNER/ADMIN)
- `GET /api/pitches/my-pitches` - Xem sân của tôi (OWNER/ADMIN)
- `GET /api/pitches/admin/all` - Xem tất cả sân (ADMIN)
- `PUT /api/pitches/admin/{id}/approve` - Duyệt sân (ADMIN)

## 🧪 Test API

### 1. Đăng ký tài khoản mới

```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@gmail.com",
  "password": "123456",
  "fullName": "Test User",
  "phoneNumber": "0123456789",
  "role": "OWNER"
}
```

### 2. Đăng nhập

```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "owner1",
  "password": "123456"
}
```

Response sẽ trả về token JWT:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 2,
  "username": "owner1",
  "email": "owner1@gmail.com",
  "fullName": "Nguyễn Văn A",
  "role": "OWNER"
}
```

### 3. Tạo sân mới (cần token)

```bash
POST http://localhost:8080/api/pitches
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "name": "Sân bóng Test",
  "description": "Mô tả sân",
  "address": "123 ABC",
  "city": "Hồ Chí Minh",
  "district": "Quận 1",
  "type": "PITCH_5",
  "pricePerHour": 200000,
  "openTime": "06:00",
  "closeTime": "22:00"
}
```

## 📁 Cấu trúc project

```
src/main/java/com/dung/smartpitchbooking/
├── config/
│   └── DataInitializer.java          # Khởi tạo dữ liệu mẫu
├── controller/
│   ├── AuthController.java           # API Authentication
│   └── PitchController.java          # API CRUD sân bóng
├── dto/
│   ├── RegisterRequest.java
│   ├── LoginRequest.java
│   ├── AuthResponse.java
│   ├── PitchRequest.java
│   └── PitchResponse.java
├── entity/
│   ├── User.java                     # Entity User
│   └── Pitch.java                    # Entity Pitch
├── exception/
│   └── GlobalExceptionHandler.java   # Xử lý lỗi toàn cục
├── repository/
│   ├── UserRepository.java
│   └── PitchRepository.java
├── security/
│   ├── JwtTokenProvider.java         # Tạo và validate JWT
│   ├── JwtAuthenticationFilter.java  # Filter JWT
│   ├── CustomUserDetailsService.java
│   └── SecurityConfig.java           # Cấu hình Spring Security
├── service/
│   ├── AuthService.java
│   └── PitchService.java
└── SmartpitchbookingApplication.java
```

## 🔐 Phân quyền

- **PUBLIC:** Xem danh sách sân, chi tiết sân
- **USER:** Đăng nhập, xem sân
- **OWNER:** Tạo/sửa/xóa sân của mình
- **ADMIN:** Quản lý tất cả, duyệt sân mới

## 🎯 Các tính năng Sprint 1

✅ Đăng ký tài khoản (USER, OWNER, ADMIN)  
✅ Đăng nhập với JWT  
✅ Tạo sân mới (OWNER/ADMIN)  
✅ Xem danh sách sân (Public)  
✅ Xem chi tiết sân (Public)  
✅ Sửa sân (OWNER/ADMIN - chỉ sân của mình)  
✅ Xóa sân (OWNER/ADMIN - chỉ sân của mình)  
✅ Duyệt sân (ADMIN)  
✅ Xem sân của tôi (OWNER)  

## 📝 TODO (Sprint tiếp theo)

- Tìm kiếm và lọc sân theo địa điểm, loại sân
- Xem khung giờ trống
- Đặt sân
- Quản lý lịch đặt
- Đánh giá sân
- Thanh toán
- Thông báo

## 👨‍💻 Sinh viên thực hiện

- **Họ tên:** Nguyễn Văn Dũng
- **MSSV:** 4551190009
- **Lớp:** Kỹ Thuật Phần Mềm K45
- **Email:** nguyenvandung6000@gmail.com

## 🙏 Giảng viên hướng dẫn

- **Phạm Văn Việt**

---

**Lưu ý:** Đây là phiên bản Sprint 1, chỉ bao gồm Authentication và CRUD Sân bóng theo yêu cầu giảng viên.
