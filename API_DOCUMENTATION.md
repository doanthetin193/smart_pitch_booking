# 📡 TÀI LIỆU API - ĐặtSân247

> Tài liệu mô tả chi tiết tất cả API endpoints của hệ thống ĐặtSân247

---

## 📑 Mục lục

1. [Thông tin chung](#thông-tin-chung)
2. [Authentication APIs](#1-authentication-apis)
3. [User APIs](#2-user-apis)
4. [Pitch APIs](#3-pitch-apis)
5. [Booking APIs](#4-booking-apis)
6. [Review APIs](#5-review-apis)
7. [Statistics APIs](#6-statistics-apis)
8. [Report APIs](#7-report-apis)
9. [Admin APIs](#8-admin-apis)

---

## Thông tin chung

### Base URL
```
http://localhost:8080/api
```

### Headers

**Public APIs (không cần token):**
```
Content-Type: application/json
```

**Protected APIs (cần token):**
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Response Format

**Thành công:**
```json
{
    "data": { ... },
    "status": 200
}
```

**Lỗi:**
```json
{
    "message": "Mô tả lỗi",
    "status": 400
}
```

### HTTP Status Codes

| Code | Ý nghĩa |
|------|---------|
| 200 | OK - Thành công |
| 201 | Created - Tạo mới thành công |
| 400 | Bad Request - Request không hợp lệ |
| 401 | Unauthorized - Chưa đăng nhập hoặc token hết hạn |
| 403 | Forbidden - Không có quyền truy cập |
| 404 | Not Found - Không tìm thấy resource |
| 500 | Internal Server Error - Lỗi server |

---

## 1. Authentication APIs

### 1.1 Đăng ký tài khoản

```
POST /api/auth/register
```

**Request Body:**
```json
{
    "username": "user123",
    "password": "123456",
    "fullName": "Nguyễn Văn A",
    "phoneNumber": "0901234567",
    "address": "123 Đường ABC, Quận 1, TP.HCM",
    "role": "USER"
}
```

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| username | String | ✅ | Tên đăng nhập (unique) |
| password | String | ✅ | Mật khẩu (min 6 ký tự) |
| fullName | String | ✅ | Họ và tên |
| phoneNumber | String | ❌ | Số điện thoại |
| address | String | ❌ | Địa chỉ |
| role | String | ✅ | Vai trò: `USER` hoặc `OWNER` |

**Response Success (201):**
```json
{
    "message": "Đăng ký thành công"
}
```

**Response Error (400):**
```json
{
    "message": "Username đã tồn tại"
}
```

---

### 1.2 Đăng nhập

```
POST /api/auth/login
```

**Request Body:**
```json
{
    "username": "user123",
    "password": "123456"
}
```

**Response Success (200):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "id": 1,
    "username": "user123",
    "fullName": "Nguyễn Văn A",
    "phoneNumber": "0901234567",
    "address": "123 Đường ABC",
    "role": "USER"
}
```

**Response Error (401):**
```json
{
    "message": "Sai username hoặc password"
}
```

```json
{
    "message": "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin để được hỗ trợ."
}
```

---

## 2. User APIs

### 2.1 Lấy thông tin cá nhân

```
GET /api/users/profile
```

**Headers:** `Authorization: Bearer <token>`

**Response Success (200):**
```json
{
    "id": 1,
    "username": "user123",
    "fullName": "Nguyễn Văn A",
    "phoneNumber": "0901234567",
    "address": "123 Đường ABC",
    "role": "USER",
    "enabled": true,
    "createdAt": "2025-01-01T10:00:00"
}
```

---

### 2.2 Cập nhật thông tin cá nhân

```
PUT /api/users/profile
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
    "fullName": "Nguyễn Văn B",
    "phoneNumber": "0909999999",
    "address": "456 Đường XYZ"
}
```

**Response Success (200):**
```json
{
    "id": 1,
    "username": "user123",
    "fullName": "Nguyễn Văn B",
    "phoneNumber": "0909999999",
    "address": "456 Đường XYZ",
    "role": "USER",
    "enabled": true
}
```

---

### 2.3 Đổi mật khẩu

```
PUT /api/users/change-password
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
    "currentPassword": "123456",
    "newPassword": "newpass123"
}
```

**Response Success (200):**
```json
{
    "message": "Đổi mật khẩu thành công"
}
```

**Response Error (400):**
```json
{
    "message": "Mật khẩu hiện tại không đúng"
}
```

---

## 3. Pitch APIs

### 3.1 Lấy danh sách sân (Public)

```
GET /api/pitches
```

**Response Success (200):**
```json
[
    {
        "id": 1,
        "name": "Sân Thống Nhất",
        "type": "PITCH_7",
        "city": "TP. Hồ Chí Minh",
        "district": "Quận 10",
        "address": "123 Đường ABC",
        "pricePerHour": 300000,
        "openTime": "06:00",
        "closeTime": "22:00",
        "description": "Sân cỏ nhân tạo chất lượng cao",
        "imageUrl": "https://example.com/image.jpg",
        "approved": true,
        "ownerId": 2,
        "ownerName": "Chủ sân A",
        "ownerPhone": "0901234567",
        "averageRating": 4.5,
        "totalReviews": 10
    }
]
```

---

### 3.2 Lấy chi tiết sân (Public)

```
GET /api/pitches/{id}
```

**Path Parameters:**
| Param | Type | Mô tả |
|-------|------|-------|
| id | Long | ID của sân |

**Response Success (200):**
```json
{
    "id": 1,
    "name": "Sân Thống Nhất",
    "type": "PITCH_7",
    "city": "TP. Hồ Chí Minh",
    "district": "Quận 10",
    "address": "123 Đường ABC",
    "pricePerHour": 300000,
    "openTime": "06:00",
    "closeTime": "22:00",
    "description": "Sân cỏ nhân tạo chất lượng cao",
    "imageUrl": "https://example.com/image.jpg",
    "approved": true,
    "ownerId": 2,
    "ownerName": "Chủ sân A",
    "ownerPhone": "0901234567",
    "averageRating": 4.5,
    "totalReviews": 10
}
```

---

### 3.3 Tìm kiếm sân (Public)

```
GET /api/pitches/search
```

**Query Parameters:**
| Param | Type | Required | Mô tả |
|-------|------|----------|-------|
| keyword | String | ❌ | Từ khóa tìm kiếm (tên, địa chỉ) |
| city | String | ❌ | Thành phố |
| district | String | ❌ | Quận/Huyện |
| type | String | ❌ | Loại sân: `PITCH_5`, `PITCH_7`, `PITCH_11` |
| minPrice | BigDecimal | ❌ | Giá tối thiểu |
| maxPrice | BigDecimal | ❌ | Giá tối đa |

**Ví dụ:**
```
GET /api/pitches/search?city=TP. Hồ Chí Minh&type=PITCH_7&minPrice=200000&maxPrice=500000
```

**Response Success (200):**
```json
[
    {
        "id": 1,
        "name": "Sân Thống Nhất",
        "type": "PITCH_7",
        "city": "TP. Hồ Chí Minh",
        "pricePerHour": 300000,
        ...
    }
]
```

---

### 3.4 Lấy danh sách thành phố (Public)

```
GET /api/pitches/cities
```

**Response Success (200):**
```json
[
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng"
]
```

---

### 3.5 Lấy danh sách quận theo thành phố (Public)

```
GET /api/pitches/districts?city=TP. Hồ Chí Minh
```

**Response Success (200):**
```json
[
    "Quận 1",
    "Quận 3",
    "Quận 10"
]
```

---

### 3.6 Lấy khoảng giá (Public)

```
GET /api/pitches/price-range
```

**Response Success (200):**
```json
{
    "min": 150000,
    "max": 800000
}
```

---

### 3.7 Tạo sân mới (OWNER)

```
POST /api/pitches
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER` hoặc `ADMIN`

**Request Body:**
```json
{
    "name": "Sân Mới",
    "type": "PITCH_5",
    "city": "TP. Hồ Chí Minh",
    "district": "Quận 7",
    "address": "789 Đường DEF",
    "pricePerHour": 250000,
    "openTime": "06:00",
    "closeTime": "23:00",
    "description": "Sân mới, cỏ đẹp",
    "imageUrl": "https://example.com/new-image.jpg"
}
```

**Response Success (201):**
```json
{
    "id": 10,
    "name": "Sân Mới",
    "type": "PITCH_5",
    "approved": false,
    ...
}
```

> ⚠️ **Lưu ý:** Sân mới tạo có `approved = false`, cần Admin duyệt

---

### 3.8 Sửa thông tin sân (OWNER)

```
PUT /api/pitches/{id}
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER` (chỉ sửa sân của mình) hoặc `ADMIN`

**Request Body:** Giống như tạo sân

**Response Success (200):**
```json
{
    "id": 10,
    "name": "Sân Mới (Updated)",
    ...
}
```

---

### 3.9 Xóa sân (OWNER)

```
DELETE /api/pitches/{id}
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER` (chỉ xóa sân của mình) hoặc `ADMIN`

**Response Success (200):**
```json
{
    "message": "Xóa sân thành công"
}
```

---

### 3.10 Lấy sân của tôi (OWNER)

```
GET /api/pitches/my-pitches
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER`

**Response Success (200):**
```json
[
    {
        "id": 1,
        "name": "Sân của tôi",
        "approved": true,
        ...
    },
    {
        "id": 2,
        "name": "Sân mới",
        "approved": false,
        ...
    }
]
```

---

### 3.11 Lấy tất cả sân (ADMIN)

```
GET /api/pitches/admin/all
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `ADMIN`

**Response:** Trả về tất cả sân (kể cả chưa duyệt)

---

### 3.12 Duyệt sân (ADMIN)

```
PUT /api/pitches/admin/{id}/approve
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `ADMIN`

**Response Success (200):**
```json
{
    "id": 10,
    "name": "Sân Mới",
    "approved": true,
    ...
}
```

---

## 4. Booking APIs

### 4.1 Lấy khung giờ trống (Public)

```
GET /api/bookings/available-slots/{pitchId}?date=2025-12-15
```

**Path Parameters:**
| Param | Type | Mô tả |
|-------|------|-------|
| pitchId | Long | ID của sân |

**Query Parameters:**
| Param | Type | Required | Mô tả |
|-------|------|----------|-------|
| date | Date | ✅ | Ngày cần xem (YYYY-MM-DD) |

**Response Success (200):**
```json
[
    {
        "startTime": "06:00",
        "endTime": "07:00",
        "available": true
    },
    {
        "startTime": "07:00",
        "endTime": "08:00",
        "available": true
    },
    {
        "startTime": "08:00",
        "endTime": "09:00",
        "available": false
    },
    {
        "startTime": "09:00",
        "endTime": "10:00",
        "available": true
    }
]
```

---

### 4.2 Đặt sân (USER)

```
POST /api/bookings
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
    "pitchId": 1,
    "bookingDate": "2025-12-15",
    "startTime": "17:00",
    "endTime": "19:00",
    "phoneNumber": "0901234567",
    "note": "Đặt cho team công ty"
}
```

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| pitchId | Long | ✅ | ID sân |
| bookingDate | Date | ✅ | Ngày đặt (YYYY-MM-DD) |
| startTime | Time | ✅ | Giờ bắt đầu (HH:mm) |
| endTime | Time | ✅ | Giờ kết thúc (HH:mm) |
| phoneNumber | String | ✅ | SĐT liên hệ |
| note | String | ❌ | Ghi chú |

**Response Success (201):**
```json
{
    "id": 100,
    "userId": 1,
    "userName": "Nguyễn Văn A",
    "userPhone": "0901234567",
    "pitchId": 1,
    "pitchName": "Sân Thống Nhất",
    "pitchAddress": "123 Đường ABC",
    "pitchType": "PITCH_7",
    "ownerId": 2,
    "ownerName": "Chủ sân A",
    "ownerPhone": "0909999999",
    "bookingDate": "2025-12-15",
    "startTime": "17:00",
    "endTime": "19:00",
    "totalPrice": 600000,
    "status": "PENDING",
    "note": "Đặt cho team công ty",
    "phoneNumber": "0901234567",
    "rejectReason": null,
    "createdAt": "2025-12-02T10:30:00"
}
```

**Response Error (400):**
```json
{
    "message": "Khung giờ này đã được đặt"
}
```

```json
{
    "message": "Không thể đặt sân trong quá khứ"
}
```

```json
{
    "message": "Giờ đặt phải nằm trong khung giờ hoạt động của sân (06:00 - 22:00)"
}
```

---

### 4.3 Lấy lịch đặt của tôi (USER)

```
GET /api/bookings/my-bookings
```

**Headers:** `Authorization: Bearer <token>`

**Response Success (200):**
```json
[
    {
        "id": 100,
        "pitchName": "Sân Thống Nhất",
        "bookingDate": "2025-12-15",
        "startTime": "17:00",
        "endTime": "19:00",
        "totalPrice": 600000,
        "status": "PENDING",
        ...
    },
    {
        "id": 99,
        "pitchName": "Sân ABC",
        "bookingDate": "2025-12-10",
        "status": "COMPLETED",
        ...
    }
]
```

---

### 4.4 Xem chi tiết booking (USER)

```
GET /api/bookings/{id}
```

**Headers:** `Authorization: Bearer <token>`

**Response Success (200):** Trả về BookingResponse đầy đủ

---

### 4.5 Hủy đặt sân (USER)

```
PUT /api/bookings/{id}/cancel
```

**Headers:** `Authorization: Bearer <token>`

**Response Success (200):**
```json
{
    "id": 100,
    "status": "CANCELLED",
    ...
}
```

**Response Error (400):**
```json
{
    "message": "Không thể hủy đơn đã được xác nhận hoặc đã hoàn thành"
}
```

> ⚠️ **Lưu ý:** Chỉ hủy được khi status = `PENDING`

---

### 4.6 Lấy tất cả đơn đặt (OWNER)

```
GET /api/bookings/owner/all
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER`

**Response:** Trả về tất cả booking của các sân thuộc owner

---

### 4.7 Lấy đơn chờ duyệt (OWNER)

```
GET /api/bookings/owner/pending
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER`

**Response:** Trả về booking có status = `PENDING`

---

### 4.8 Xác nhận đơn (OWNER)

```
PUT /api/bookings/owner/{id}/confirm
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER`

**Response Success (200):**
```json
{
    "id": 100,
    "status": "CONFIRMED",
    ...
}
```

**Response Error (400):**
```json
{
    "message": "Chỉ có thể xác nhận đơn đang chờ duyệt"
}
```

---

### 4.9 Từ chối đơn (OWNER)

```
PUT /api/bookings/owner/{id}/reject
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER`

**Request Body:**
```json
{
    "reason": "Sân đang bảo trì"
}
```

**Response Success (200):**
```json
{
    "id": 100,
    "status": "REJECTED",
    "rejectReason": "Sân đang bảo trì",
    ...
}
```

---

## 5. Review APIs

### 5.1 Lấy đánh giá của sân (Public)

```
GET /api/reviews/pitch/{pitchId}
```

**Response Success (200):**
```json
[
    {
        "id": 1,
        "userId": 1,
        "userName": "Nguyễn Văn A",
        "pitchId": 1,
        "rating": 5,
        "comment": "Sân đẹp, cỏ tốt!",
        "createdAt": "2025-12-01T15:00:00"
    },
    {
        "id": 2,
        "userId": 3,
        "userName": "Trần Văn B",
        "pitchId": 1,
        "rating": 4,
        "comment": "Giá hơi cao nhưng chất lượng OK",
        "createdAt": "2025-11-28T10:00:00"
    }
]
```

---

### 5.2 Lấy tổng hợp đánh giá (Public)

```
GET /api/reviews/pitch/{pitchId}/summary
```

**Response Success (200):**
```json
{
    "averageRating": 4.5,
    "totalReviews": 10,
    "ratingDistribution": {
        "5": 6,
        "4": 3,
        "3": 1,
        "2": 0,
        "1": 0
    }
}
```

---

### 5.3 Kiểm tra có thể đánh giá (USER)

```
GET /api/reviews/pitch/{pitchId}/check
```

**Headers:** `Authorization: Bearer <token>`

**Response Success (200):**
```json
{
    "canReview": true,
    "hasReviewed": false
}
```

> `canReview = true` khi user đã có ít nhất 1 booking COMPLETED tại sân này

---

### 5.4 Tạo đánh giá (USER)

```
POST /api/reviews
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
    "pitchId": 1,
    "rating": 5,
    "comment": "Sân rất đẹp, chủ sân nhiệt tình!"
}
```

| Field | Type | Required | Mô tả |
|-------|------|----------|-------|
| pitchId | Long | ✅ | ID sân |
| rating | Integer | ✅ | Điểm đánh giá (1-5) |
| comment | String | ❌ | Bình luận |

**Response Success (201):**
```json
{
    "id": 10,
    "userId": 1,
    "userName": "Nguyễn Văn A",
    "pitchId": 1,
    "rating": 5,
    "comment": "Sân rất đẹp, chủ sân nhiệt tình!",
    "createdAt": "2025-12-02T11:00:00"
}
```

**Response Error (400):**
```json
{
    "message": "Bạn cần đặt sân và hoàn thành trước khi đánh giá"
}
```

```json
{
    "message": "Bạn đã đánh giá sân này rồi"
}
```

---

### 5.5 Xóa đánh giá (USER)

```
DELETE /api/reviews/{id}
```

**Headers:** `Authorization: Bearer <token>`

**Response Success (200):**
```json
{
    "message": "Đã xóa đánh giá"
}
```

**Response Error (400):**
```json
{
    "message": "Bạn không có quyền xóa đánh giá này"
}
```

---

### 5.6 Admin xóa đánh giá (ADMIN)

```
DELETE /api/reviews/admin/{id}
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `ADMIN`

**Response Success (200):**
```json
{
    "message": "Đã xóa đánh giá"
}
```

---

## 6. Statistics APIs

### 6.1 Thống kê cho Owner

```
GET /api/statistics/owner
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER`

**Query Parameters:**
| Param | Type | Required | Mô tả |
|-------|------|----------|-------|
| startDate | Date | ❌ | Ngày bắt đầu (YYYY-MM-DD) |
| endDate | Date | ❌ | Ngày kết thúc (YYYY-MM-DD) |

**Ví dụ:**
```
GET /api/statistics/owner?startDate=2025-12-01&endDate=2025-12-31
```

**Response Success (200):**
```json
{
    "totalRevenue": 15000000,
    "monthlyRevenue": 5000000,
    "totalBookings": 50,
    "pendingBookings": 5,
    "confirmedBookings": 10,
    "completedBookings": 30,
    "cancelledBookings": 5,
    "dailyRevenue": [
        {
            "date": "2025-12-01",
            "revenue": 1200000
        },
        {
            "date": "2025-12-02",
            "revenue": 900000
        }
    ],
    "pitchRevenue": [
        {
            "pitchId": 1,
            "pitchName": "Sân Thống Nhất",
            "revenue": 8000000,
            "bookingCount": 25
        },
        {
            "pitchId": 2,
            "pitchName": "Sân ABC",
            "revenue": 7000000,
            "bookingCount": 25
        }
    ]
}
```

---

### 6.2 Thống kê cho Admin

```
GET /api/statistics/admin
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `ADMIN`

**Response Success (200):**
```json
{
    "totalUsers": 100,
    "totalOwners": 20,
    "totalPitches": 50,
    "approvedPitches": 45,
    "pendingPitches": 5,
    "totalBookings": 500,
    "totalRevenue": 150000000
}
```

---

## 7. Report APIs

### 7.1 Xuất báo cáo Excel (OWNER)

```
GET /api/reports/owner/excel
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER`

**Query Parameters:**
| Param | Type | Required | Mô tả |
|-------|------|----------|-------|
| startDate | Date | ❌ | Ngày bắt đầu |
| endDate | Date | ❌ | Ngày kết thúc |

**Response:** File `.xlsx` download

**Content-Type:** `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

**Nội dung file Excel:**
| Mã đơn | Khách hàng | SĐT | Sân | Ngày | Giờ | Tổng tiền | Trạng thái |
|--------|------------|-----|-----|------|-----|-----------|------------|
| 100 | Nguyễn Văn A | 0901234567 | Sân Thống Nhất | 2025-12-15 | 17:00-19:00 | 600,000 | COMPLETED |

---

### 7.2 Xuất báo cáo PDF (OWNER)

```
GET /api/reports/owner/pdf
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `OWNER`

**Query Parameters:** Giống Excel

**Response:** File `.pdf` download

**Content-Type:** `application/pdf`

**Nội dung file PDF:**
- Tiêu đề: "BÁO CÁO DOANH THU"
- Thông tin chủ sân
- Khoảng thời gian báo cáo
- Tổng số đơn, tổng doanh thu
- Bảng chi tiết các đơn

---

## 8. Admin APIs

### 8.1 Lấy danh sách users

```
GET /api/admin/users
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `ADMIN`

**Response Success (200):**
```json
[
    {
        "id": 1,
        "username": "user1",
        "fullName": "Nguyễn Văn A",
        "phoneNumber": "0901234567",
        "address": "123 ABC",
        "role": "USER",
        "enabled": true,
        "createdAt": "2025-01-01T00:00:00"
    },
    {
        "id": 2,
        "username": "owner1",
        "fullName": "Chủ sân B",
        "role": "OWNER",
        "enabled": true,
        ...
    }
]
```

> ⚠️ Không trả về tài khoản ADMIN

---

### 8.2 Lấy users theo role

```
GET /api/admin/users/role/{role}
```

**Path Parameters:**
| Param | Type | Mô tả |
|-------|------|-------|
| role | String | `USER` hoặc `OWNER` |

**Ví dụ:**
```
GET /api/admin/users/role/OWNER
```

---

### 8.3 Lấy chi tiết user

```
GET /api/admin/users/{userId}
```

---

### 8.4 Khóa/Mở khóa tài khoản

```
PUT /api/admin/users/{userId}/toggle-status
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `ADMIN`

**Response Success (200):**
```json
{
    "id": 5,
    "username": "user5",
    "enabled": false,
    ...
}
```

> Toggle: Nếu đang `enabled=true` → chuyển thành `false` và ngược lại

---

### 8.5 Thay đổi role

```
PUT /api/admin/users/{userId}/change-role
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `ADMIN`

**Request Body:**
```json
{
    "role": "OWNER"
}
```

**Response Success (200):**
```json
{
    "id": 5,
    "username": "user5",
    "role": "OWNER",
    ...
}
```

---

### 8.6 Xóa user

```
DELETE /api/admin/users/{userId}
```

**Headers:** `Authorization: Bearer <token>`

**Required Role:** `ADMIN`

**Response Success (200):**
```json
{
    "message": "Đã khóa tài khoản người dùng"
}
```

> ⚠️ Thực chất là soft delete (set `enabled = false`)

---

## 📝 Ghi chú bổ sung

### Enum Values

**Role:**
```
USER, OWNER, ADMIN
```

**PitchType:**
```
PITCH_5, PITCH_7, PITCH_11
```

**BookingStatus:**
```
PENDING, CONFIRMED, REJECTED, COMPLETED, CANCELLED
```

### Date/Time Format

| Type | Format | Ví dụ |
|------|--------|-------|
| Date | YYYY-MM-DD | 2025-12-15 |
| Time | HH:mm | 17:00 |
| DateTime | ISO 8601 | 2025-12-15T17:00:00 |

### Pagination (nếu cần mở rộng)

Hiện tại API chưa có pagination. Nếu cần, có thể thêm:

```
GET /api/pitches?page=0&size=10&sort=createdAt,desc
```

---

## 🔗 Postman Collection

Để test API, bạn có thể import collection vào Postman:

1. Tạo Environment với variable:
   - `baseUrl`: `http://localhost:8080/api`
   - `token`: (lấy sau khi login)

2. Sử dụng Pre-request Script để tự động thêm token:
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

---

<div align="center">
  <strong>⚽ ĐặtSân247 - API Documentation ⚽</strong>
  <br/><br/>
  Version: 1.0.0 | Last Updated: December 2025
</div>
