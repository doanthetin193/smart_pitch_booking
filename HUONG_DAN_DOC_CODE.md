# 📚 HƯỚNG DẪN ĐỌC HIỂU CODE - ĐặtSân247

> Tài liệu này hướng dẫn bạn đọc code theo **thứ tự từ dễ đến khó**, phù hợp cho người mới bắt đầu.

---

## 🎯 Tổng quan kiến trúc

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│                    http://localhost:5173                        │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP Request/Response (JSON)
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Spring Boot)                    │
│                     http://localhost:8080                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │Controller│→ │ Service  │→ │Repository│→ │ Database (MySQL) │ │
│  │ (API)    │  │ (Logic)  │  │  (Query) │  │                  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Luồng hoạt động:**
1. User tương tác với **Frontend** (React)
2. Frontend gửi request đến **Backend** (Spring Boot)
3. **Controller** nhận request, gọi **Service**
4. **Service** xử lý logic, gọi **Repository**
5. **Repository** truy vấn **Database** (MySQL)
6. Dữ liệu trả về theo chiều ngược lại

---

## 📖 THỨ TỰ ĐỌC CODE

---

## PHẦN 1: CẤU HÌNH CƠ BẢN (Đọc trước)

### 1.1 `pom.xml` ⭐ ĐỌC ĐẦU TIÊN
📍 **Vị trí:** `d:\smartpitchbooking\pom.xml`

**Đây là gì?** File cấu hình Maven - khai báo các thư viện (dependencies) mà project sử dụng.

**Ý chính cần hiểu:**
- `spring-boot-starter-web` → Tạo REST API
- `spring-boot-starter-data-jpa` → Kết nối database
- `spring-boot-starter-security` → Bảo mật, phân quyền
- `jjwt` → Tạo JWT token để xác thực
- `mysql-connector-j` → Driver kết nối MySQL
- `lombok` → Tự động sinh getter/setter
- `poi-ooxml` → Xuất file Excel
- `itext7-core` → Xuất file PDF

---

### 1.2 `application.properties`
📍 **Vị trí:** `src/main/resources/application.properties`

**Đây là gì?** File cấu hình ứng dụng Spring Boot.

**Ý chính cần hiểu:**
```properties
# Kết nối database MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/smartpitchbooking

# JPA tự động tạo/cập nhật bảng
spring.jpa.hibernate.ddl-auto=update

# Cấu hình JWT
jwt.secret=... (khóa bí mật để mã hóa token)
jwt.expiration=86400000 (thời hạn token = 24h)
```

---

### 1.3 `SmartpitchbookingApplication.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/SmartpitchbookingApplication.java`

**Đây là gì?** File chính để khởi động ứng dụng Spring Boot.

**Ý chính:**
- Annotation `@SpringBootApplication` = đánh dấu đây là app Spring Boot
- Method `main()` = điểm khởi đầu chương trình

---

## PHẦN 2: ENTITY (Các đối tượng dữ liệu)

> 💡 **Entity = Lớp đại diện cho 1 bảng trong database**

### 2.1 `User.java` ⭐ ĐỌC TRƯỚC
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/entity/User.java`

**Đây là gì?** Đại diện cho bảng `users` - thông tin người dùng.

**Ý chính cần hiểu:**
- `@Entity` → Đánh dấu đây là entity (tương ứng 1 bảng DB)
- `@Id` + `@GeneratedValue` → Khóa chính, tự tăng
- `@Column` → Tương ứng 1 cột trong bảng
- `@Enumerated` → Lưu enum dạng text (USER, OWNER, ADMIN)
- Các trường: id, username, password, fullName, phoneNumber, address, role, enabled

---

### 2.2 `Pitch.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/entity/Pitch.java`

**Đây là gì?** Đại diện cho bảng `pitches` - thông tin sân bóng.

**Ý chính cần hiểu:**
- `@ManyToOne` → Nhiều sân thuộc về 1 owner (quan hệ N-1)
- `@JoinColumn` → Khóa ngoại liên kết với bảng User
- Các trường: id, name, type (PITCH_5, PITCH_7, PITCH_11), address, city, district, pricePerHour, openTime, closeTime, approved, owner

---

### 2.3 `Booking.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/entity/Booking.java`

**Đây là gì?** Đại diện cho bảng `bookings` - thông tin đặt sân.

**Ý chính cần hiểu:**
- Quan hệ: 1 Booking thuộc về 1 User và 1 Pitch
- `BookingStatus` enum: PENDING, CONFIRMED, REJECTED, COMPLETED, CANCELLED
- Các trường: id, user, pitch, bookingDate, startTime, endTime, totalPrice, status, phoneNumber, note, rejectReason

---

### 2.4 `Review.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/entity/Review.java`

**Đây là gì?** Đại diện cho bảng `reviews` - đánh giá sân.

**Ý chính cần hiểu:**
- Quan hệ: 1 Review thuộc về 1 User và 1 Pitch
- Các trường: id, user, pitch, rating (1-5), comment, createdAt

---

## PHẦN 3: REPOSITORY (Truy vấn Database)

> 💡 **Repository = Interface để truy vấn database, Spring tự động implement**

### 3.1 `UserRepository.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/repository/UserRepository.java`

**Đây là gì?** Interface truy vấn bảng users.

**Ý chính cần hiểu:**
- Kế thừa `JpaRepository<User, Long>` → Có sẵn các method: save(), findById(), findAll(), delete()...
- Tự định nghĩa thêm: `findByUsername()`, `existsByUsername()`
- Spring Data JPA tự động tạo query từ tên method!

---

### 3.2 `PitchRepository.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/repository/PitchRepository.java`

**Ý chính cần hiểu:**
- `findByApprovedTrue()` → Lấy sân đã duyệt
- `findByOwner()` → Lấy sân theo chủ sân
- `@Query` → Viết câu query JPQL tùy chỉnh

---

### 3.3 `BookingRepository.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/repository/BookingRepository.java`

**Ý chính cần hiểu:**
- `findByUser()` → Lấy booking của user
- `findByPitchOwner()` → Lấy booking của các sân thuộc owner
- `findOverlappingBookings()` → Kiểm tra trùng lịch

---

### 3.4 `ReviewRepository.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/repository/ReviewRepository.java`

**Ý chính cần hiểu:**
- `findByPitch()` → Lấy đánh giá của sân
- `calculateAverageRating()` → Tính điểm trung bình

---

## PHẦN 4: DTO (Data Transfer Object)

> 💡 **DTO = Đối tượng để truyền dữ liệu giữa client và server**

📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/dto/`

### Các DTO quan trọng:

| File | Mục đích |
|------|----------|
| `LoginRequest.java` | Dữ liệu đăng nhập (username, password) |
| `RegisterRequest.java` | Dữ liệu đăng ký |
| `AuthResponse.java` | Trả về token + thông tin user |
| `PitchRequest.java` | Dữ liệu tạo/sửa sân |
| `PitchResponse.java` | Trả về thông tin sân |
| `BookingRequest.java` | Dữ liệu đặt sân |
| `BookingResponse.java` | Trả về thông tin booking |
| `ReviewRequest.java` | Dữ liệu đánh giá |
| `ReviewResponse.java` | Trả về thông tin đánh giá |

**Tại sao cần DTO?**
- Không trả về trực tiếp Entity (tránh lộ thông tin nhạy cảm như password)
- Kiểm soát dữ liệu đầu vào/đầu ra
- Validation dữ liệu với `@NotBlank`, `@Min`, `@Max`...

---

## PHẦN 5: SECURITY (Bảo mật) ⭐ QUAN TRỌNG

📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/security/`

### 5.1 `JwtUtils.java`
**Đây là gì?** Utility class để tạo và xác thực JWT token.

**Ý chính cần hiểu:**
- `generateToken(username)` → Tạo token từ username
- `validateToken(token)` → Kiểm tra token hợp lệ
- `getUsernameFromToken(token)` → Lấy username từ token

---

### 5.2 `JwtAuthenticationFilter.java`
**Đây là gì?** Filter chạy trước mỗi request để kiểm tra token.

**Ý chính cần hiểu:**
- Chạy trước mọi request
- Lấy token từ header `Authorization: Bearer <token>`
- Nếu token hợp lệ → Cho phép request đi tiếp
- Nếu không → Trả về lỗi 401 Unauthorized

---

### 5.3 `SecurityConfig.java`
**Đây là gì?** Cấu hình bảo mật cho ứng dụng.

**Ý chính cần hiểu:**
```java
// Các đường dẫn public (ai cũng truy cập được)
.requestMatchers("/api/auth/**").permitAll()
.requestMatchers("/api/pitches", "/api/pitches/{id}").permitAll()

// Các đường dẫn yêu cầu role cụ thể
.requestMatchers("/api/admin/**").hasRole("ADMIN")
.requestMatchers("/api/pitches/my-pitches").hasRole("OWNER")

// Còn lại yêu cầu đăng nhập
.anyRequest().authenticated()
```

---

### 5.4 `UserDetailsServiceImpl.java`
**Đây là gì?** Load thông tin user từ database cho Spring Security.

**Ý chính cần hiểu:**
- Implement `UserDetailsService` của Spring Security
- Method `loadUserByUsername()` → Tìm user trong DB

---

## PHẦN 6: SERVICE (Logic nghiệp vụ) ⭐ QUAN TRỌNG NHẤT

> 💡 **Service = Nơi chứa toàn bộ logic xử lý của ứng dụng**

📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/service/`

### 6.1 `AuthService.java` - Đọc trước
**Chức năng:** Đăng ký, đăng nhập

**Các method quan trọng:**
- `register()` → Tạo tài khoản mới, mã hóa password
- `login()` → Kiểm tra username/password, tạo JWT token

---

### 6.2 `UserService.java`
**Chức năng:** Quản lý profile

**Các method quan trọng:**
- `getProfile()` → Lấy thông tin cá nhân
- `updateProfile()` → Cập nhật thông tin
- `changePassword()` → Đổi mật khẩu

---

### 6.3 `PitchService.java`
**Chức năng:** CRUD sân bóng, tìm kiếm

**Các method quan trọng:**
- `getApprovedPitches()` → Lấy sân đã duyệt
- `createPitch()` → Tạo sân mới (OWNER)
- `updatePitch()` → Sửa sân
- `deletePitch()` → Xóa sân
- `approvePitch()` → Duyệt sân (ADMIN)
- `searchPitches()` → Tìm kiếm + lọc

---

### 6.4 `BookingService.java` ⭐ PHỨC TẠP NHẤT
**Chức năng:** Đặt sân, quản lý đơn

**Các method quan trọng:**
- `getAvailableTimeSlots()` → Lấy khung giờ trống
- `createBooking()` → Tạo đơn đặt sân (kiểm tra trùng lịch)
- `confirmBooking()` → OWNER xác nhận
- `rejectBooking()` → OWNER từ chối
- `cancelBooking()` → USER hủy (chỉ khi PENDING)
- `getMyBookings()` → Lấy đơn của user
- `getBookingsForOwner()` → Lấy đơn cho owner

---

### 6.5 `ReviewService.java`
**Chức năng:** Đánh giá sân

**Các method quan trọng:**
- `getReviewsByPitch()` → Lấy đánh giá của sân
- `createReview()` → Tạo đánh giá (kiểm tra đã đặt sân chưa)
- `deleteReview()` → Xóa đánh giá

---

### 6.6 `StatisticsService.java`
**Chức năng:** Thống kê doanh thu

**Các method quan trọng:**
- `getOwnerStatistics()` → Thống kê cho OWNER
- `getAdminStats()` → Thống kê cho ADMIN

---

### 6.7 `ReportService.java`
**Chức năng:** Xuất báo cáo

**Các method quan trọng:**
- `generateExcelReport()` → Tạo file Excel
- `generatePdfReport()` → Tạo file PDF

---

### 6.8 `AdminService.java`
**Chức năng:** Quản lý users (ADMIN)

**Các method quan trọng:**
- `getAllUsers()` → Lấy danh sách users
- `toggleUserStatus()` → Khóa/Mở khóa
- `changeUserRole()` → Đổi role
- `deleteUser()` → Xóa user

---

## PHẦN 7: CONTROLLER (API Endpoints)

> 💡 **Controller = Nhận request từ client, gọi Service xử lý, trả về response**

📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/controller/`

### Thứ tự đọc:

| # | File | API Prefix | Chức năng |
|---|------|------------|-----------|
| 1 | `AuthController.java` | `/api/auth` | Đăng ký, đăng nhập |
| 2 | `UserController.java` | `/api/users` | Profile, đổi mật khẩu |
| 3 | `PitchController.java` | `/api/pitches` | CRUD sân, tìm kiếm |
| 4 | `BookingController.java` | `/api/bookings` | Đặt sân, xác nhận |
| 5 | `ReviewController.java` | `/api/reviews` | Đánh giá |
| 6 | `StatisticsController.java` | `/api/statistics` | Thống kê |
| 7 | `ReportController.java` | `/api/reports` | Xuất Excel/PDF |
| 8 | `AdminController.java` | `/api/admin` | Quản lý users |

**Ý chính cần hiểu trong mỗi Controller:**
- `@RestController` → Đánh dấu đây là REST API controller
- `@RequestMapping("/api/xxx")` → Prefix cho tất cả API trong controller
- `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` → Loại HTTP method
- `@PreAuthorize("hasRole('ADMIN')")` → Phân quyền truy cập
- `@RequestBody` → Dữ liệu từ body request
- `@PathVariable` → Dữ liệu từ URL path (VD: /api/pitches/{id})
- `@RequestParam` → Dữ liệu từ query string (VD: ?city=HCM)

---

## PHẦN 8: CÁC FILE PHỤ TRỢ

### 8.1 `DataInitializer.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/config/DataInitializer.java`

**Đây là gì?** Tạo dữ liệu mẫu khi khởi động ứng dụng.

**Ý chính:**
- Tạo 3 tài khoản: admin, owner1, user1
- Tạo 6 sân bóng mẫu cho owner1

---

### 8.2 `BookingScheduler.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/scheduler/BookingScheduler.java`

**Đây là gì?** Scheduled task chạy tự động.

**Ý chính:**
- `@Scheduled(cron = "0 */5 * * * *")` → Chạy mỗi 5 phút
- Tự động chuyển CONFIRMED → COMPLETED khi hết giờ chơi

---

### 8.3 `GlobalExceptionHandler.java`
📍 **Vị trí:** `src/main/java/com/dung/smartpitchbooking/exception/GlobalExceptionHandler.java`

**Đây là gì?** Xử lý exception toàn cục.

**Ý chính:**
- Bắt tất cả exception và trả về response thống nhất
- Xử lý lỗi validation, runtime exception...

---

## PHẦN 9: FRONTEND (React)

📍 **Vị trí:** `frontend/src/`

### Thứ tự đọc Frontend:

| # | File | Mô tả |
|---|------|-------|
| 1 | `main.jsx` | Entry point, setup Router |
| 2 | `App.jsx` | Component gốc, định nghĩa routes |
| 3 | `contexts/AuthContext.jsx` | Quản lý trạng thái đăng nhập |
| 4 | `services/api.js` | Gọi API backend bằng Axios |
| 5 | `components/Navbar.jsx` | Thanh điều hướng |
| 6 | `components/SearchFilter.jsx` | Bộ lọc tìm kiếm |
| 7 | `pages/Login.jsx` | Trang đăng nhập |
| 8 | `pages/Register.jsx` | Trang đăng ký |
| 9 | `pages/Home.jsx` | Trang chủ |
| 10 | `pages/PitchDetail.jsx` | Chi tiết sân + đặt sân |
| 11 | `pages/MyBookings.jsx` | Lịch đặt của user |
| 12 | `pages/Profile.jsx` | Trang cá nhân |
| 13 | `pages/MyPitches.jsx` | Sân của owner |
| 14 | `pages/OwnerBookings.jsx` | Đơn đặt cho owner |
| 15 | `pages/OwnerStatistics.jsx` | Thống kê owner |
| 16 | `pages/AdminDashboard.jsx` | Duyệt sân (admin) |
| 17 | `pages/AdminUsers.jsx` | Quản lý users (admin) |

---

## 🗺️ SƠ ĐỒ TỔNG HỢP

```
📁 smartpitchbooking/
│
├── 📄 pom.xml                    ← (1) Đọc đầu tiên
│
├── 📁 src/main/
│   ├── 📁 resources/
│   │   └── 📄 application.properties  ← (2) Cấu hình
│   │
│   └── 📁 java/com/dung/smartpitchbooking/
│       │
│       ├── 📄 SmartpitchbookingApplication.java  ← (3) Entry point
│       │
│       ├── 📁 entity/            ← (4) Đọc tiếp theo
│       │   ├── User.java         ← Đọc trước
│       │   ├── Pitch.java
│       │   ├── Booking.java
│       │   └── Review.java
│       │
│       ├── 📁 repository/        ← (5)
│       │   ├── UserRepository.java
│       │   ├── PitchRepository.java
│       │   ├── BookingRepository.java
│       │   └── ReviewRepository.java
│       │
│       ├── 📁 dto/               ← (6)
│       │   └── (Các DTO files)
│       │
│       ├── 📁 security/          ← (7) Quan trọng
│       │   ├── JwtUtils.java
│       │   ├── JwtAuthenticationFilter.java
│       │   ├── SecurityConfig.java
│       │   └── UserDetailsServiceImpl.java
│       │
│       ├── 📁 service/           ← (8) Quan trọng nhất
│       │   ├── AuthService.java      ← Đọc trước
│       │   ├── UserService.java
│       │   ├── PitchService.java
│       │   ├── BookingService.java   ← Phức tạp nhất
│       │   ├── ReviewService.java
│       │   ├── StatisticsService.java
│       │   ├── ReportService.java
│       │   └── AdminService.java
│       │
│       ├── 📁 controller/        ← (9)
│       │   ├── AuthController.java
│       │   ├── UserController.java
│       │   ├── PitchController.java
│       │   ├── BookingController.java
│       │   ├── ReviewController.java
│       │   ├── StatisticsController.java
│       │   ├── ReportController.java
│       │   └── AdminController.java
│       │
│       ├── 📁 config/            ← (10)
│       ├── 📁 scheduler/
│       └── 📁 exception/
│
└── 📁 frontend/src/              ← (11) Đọc sau cùng
    ├── main.jsx
    ├── App.jsx
    ├── contexts/
    ├── services/
    ├── components/
    └── pages/
```

---

## 💡 MẸO KHI ĐỌC CODE

1. **Đọc Entity trước** → Hiểu cấu trúc dữ liệu
2. **Đọc Service tiếp** → Hiểu logic xử lý
3. **Đọc Controller** → Hiểu API endpoints
4. **Đọc Security** → Hiểu cách xác thực
5. **Đọc Frontend sau** → Hiểu giao diện

**Khi không hiểu:**
- Copy đoạn code vào ChatGPT hỏi: "Giải thích đoạn code này"
- Tìm annotation trên Google: "@Entity spring boot là gì"
- Debug bằng cách đặt breakpoint và chạy từng bước

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] Hiểu cấu trúc project
- [ ] Hiểu 4 Entity chính
- [ ] Hiểu Repository pattern
- [ ] Hiểu JWT authentication
- [ ] Hiểu luồng đăng nhập
- [ ] Hiểu luồng đặt sân
- [ ] Hiểu cách phân quyền
- [ ] Hiểu Frontend React
- [ ] Có thể tự thêm tính năng mới!

---

<div align="center">
  <strong>Chúc bạn học tốt! 🚀</strong>
</div>
