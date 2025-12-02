# 📖 HƯỚNG DẪN SỬ DỤNG - ĐặtSân247

> Hướng dẫn chi tiết toàn bộ chức năng của hệ thống đặt sân bóng đá ĐặtSân247

---

## 📑 Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Đăng ký & Đăng nhập](#2-đăng-ký--đăng-nhập)
3. [Trang chủ & Tìm kiếm sân](#3-trang-chủ--tìm-kiếm-sân)
4. [Đặt sân bóng](#4-đặt-sân-bóng)
5. [Quản lý lịch đặt (USER)](#5-quản-lý-lịch-đặt-user)
6. [Đánh giá sân](#6-đánh-giá-sân)
7. [Quản lý tài khoản](#7-quản-lý-tài-khoản)
8. [Hướng dẫn cho Chủ sân (OWNER)](#8-hướng-dẫn-cho-chủ-sân-owner)
9. [Hướng dẫn cho Quản trị viên (ADMIN)](#9-hướng-dẫn-cho-quản-trị-viên-admin)

---

## 1. Giới thiệu

### 🎯 ĐặtSân247 là gì?
ĐặtSân247 là nền tảng đặt sân bóng đá trực tuyến, giúp người chơi bóng dễ dàng tìm kiếm và đặt sân, đồng thời hỗ trợ chủ sân quản lý đơn đặt và doanh thu hiệu quả.

### 👥 Các vai trò trong hệ thống

| Vai trò | Mô tả | Quyền hạn chính |
|---------|-------|-----------------|
| **USER** | Người dùng thường | Tìm sân, đặt sân, đánh giá |
| **OWNER** | Chủ sân bóng | Quản lý sân, xác nhận đơn, xem thống kê |
| **ADMIN** | Quản trị viên | Duyệt sân, quản lý users, xem thống kê toàn hệ thống |

---

## 2. Đăng ký & Đăng nhập

### 📝 Đăng ký tài khoản mới

**Bước 1:** Truy cập trang web và nhấn nút **"Đăng ký ngay"** trên thanh điều hướng

**Bước 2:** Điền thông tin đăng ký:
- 👤 **Họ và tên:** Tên đầy đủ của bạn
- 📧 **Username:** Tên đăng nhập (duy nhất)
- 🔐 **Mật khẩu:** Tối thiểu 6 ký tự
- 🔐 **Xác nhận mật khẩu:** Nhập lại mật khẩu
- 📱 **Số điện thoại:** Để liên hệ khi đặt sân
- 🏠 **Địa chỉ:** (Tùy chọn)
- 🎭 **Vai trò:** Chọn USER hoặc OWNER

**Bước 3:** Nhấn **"Đăng ký"** để hoàn tất

> ⚠️ **Lưu ý:** 
> - Username không được trùng với tài khoản đã có
> - Nếu đăng ký làm OWNER, bạn có thể đăng sân sau khi đăng nhập

### 🔑 Đăng nhập

**Bước 1:** Nhấn **"Đăng nhập"** trên thanh điều hướng

**Bước 2:** Nhập Username và Mật khẩu

**Bước 3:** Nhấn **"Đăng nhập"**

> ⚠️ **Lưu ý:**
> - Nếu tài khoản bị khóa, hệ thống sẽ thông báo. Liên hệ Admin để mở khóa
> - Sau khi đăng nhập, bạn sẽ được chuyển về trang chủ

---

## 3. Trang chủ & Tìm kiếm sân

### 🏠 Trang chủ

Trang chủ hiển thị:
- 🎯 Banner giới thiệu với nút "Tìm Sân Ngay"
- 🔍 Thanh tìm kiếm & bộ lọc
- ⚽ Danh sách sân bóng đã được duyệt

### 🔍 Tìm kiếm sân

#### Cách 1: Tìm theo từ khóa
1. Nhập tên sân hoặc địa chỉ vào ô **"Tìm kiếm"**
2. Nhấn **"Tìm kiếm"** hoặc Enter

#### Cách 2: Lọc theo tiêu chí

| Bộ lọc | Mô tả |
|--------|-------|
| 🏙️ **Thành phố** | Chọn thành phố từ danh sách |
| 📍 **Quận/Huyện** | Chọn quận (sau khi chọn thành phố) |
| ⚽ **Loại sân** | Sân 5, Sân 7, hoặc Sân 11 |
| 💰 **Khoảng giá** | Kéo thanh trượt để chọn giá min-max |

#### Cách 3: Kết hợp nhiều tiêu chí
Bạn có thể kết hợp từ khóa + các bộ lọc để tìm chính xác hơn

**Ví dụ:** Tìm "Sân 7" ở "Quận 1" với giá từ 200.000đ - 500.000đ

### 📋 Xem chi tiết sân

Nhấn vào thẻ sân để xem thông tin chi tiết:
- 📸 Hình ảnh sân
- 📝 Mô tả chi tiết
- 💰 Giá thuê/giờ
- ⏰ Giờ hoạt động
- 📍 Địa chỉ đầy đủ
- 📞 Thông tin liên hệ chủ sân
- ⭐ Đánh giá từ người dùng

---

## 4. Đặt sân bóng

### 📅 Quy trình đặt sân

**Bước 1:** Chọn sân muốn đặt từ danh sách

**Bước 2:** Trong trang chi tiết sân, chọn **ngày đặt**
- Không thể chọn ngày trong quá khứ

**Bước 3:** Xem các **khung giờ còn trống**
- 🟢 Xanh: Còn trống
- 🔴 Đỏ: Đã được đặt

**Bước 4:** Chọn **giờ bắt đầu** và **giờ kết thúc**
- Giờ phải nằm trong khung giờ hoạt động của sân
- Không được trùng với slot đã đặt

**Bước 5:** Nhập thông tin bổ sung:
- 📱 **Số điện thoại liên hệ**
- 📝 **Ghi chú** (nếu có)

**Bước 6:** Kiểm tra thông tin và nhấn **"Đặt sân"**

### 💰 Tính tiền

```
Tổng tiền = Giá/giờ × Số giờ đặt
```

**Ví dụ:** Sân giá 300.000đ/giờ, đặt từ 17:00-19:00 (2 giờ)
→ Tổng: 300.000 × 2 = **600.000đ**

### ⚠️ Lưu ý quan trọng

1. Bạn phải **đăng nhập** mới được đặt sân
2. Sau khi đặt, đơn ở trạng thái **PENDING** (Chờ xác nhận)
3. Chờ chủ sân **xác nhận** hoặc **từ chối**
4. Chỉ được **hủy đơn** khi đang ở trạng thái PENDING

---

## 5. Quản lý lịch đặt (USER)

### 📋 Xem lịch đặt của tôi

**Bước 1:** Đăng nhập vào hệ thống

**Bước 2:** Nhấn **"📅 Lịch đặt"** trên thanh điều hướng

### 🏷️ Các trạng thái đơn đặt

| Trạng thái | Màu | Mô tả |
|------------|-----|-------|
| **PENDING** | 🟡 Vàng | Chờ chủ sân xác nhận |
| **CONFIRMED** | 🟢 Xanh | Đã được xác nhận |
| **REJECTED** | 🔴 Đỏ | Bị từ chối (có lý do) |
| **COMPLETED** | 🔵 Xanh dương | Đã hoàn thành |
| **CANCELLED** | ⚫ Xám | Đã hủy |

### ❌ Hủy đơn đặt sân

**Điều kiện:** Chỉ được hủy khi đơn ở trạng thái **PENDING**

**Cách thực hiện:**
1. Vào trang **"Lịch đặt"**
2. Tìm đơn muốn hủy
3. Nhấn nút **"Hủy"**
4. Xác nhận hủy

> ⚠️ **Lưu ý:** 
> - Không thể hủy đơn đã được xác nhận (CONFIRMED)
> - Nếu muốn hủy đơn đã xác nhận, liên hệ trực tiếp chủ sân

### 🔍 Lọc đơn theo trạng thái

Sử dụng các tab để lọc:
- **Tất cả** - Hiển thị tất cả đơn
- **Chờ duyệt** - Đơn PENDING
- **Đã xác nhận** - Đơn CONFIRMED
- **Đã hoàn thành** - Đơn COMPLETED
- **Đã hủy** - Đơn CANCELLED/REJECTED

---

## 6. Đánh giá sân

### ⭐ Khi nào được đánh giá?

Bạn chỉ được đánh giá sân **sau khi đã hoàn thành** ít nhất một lần đặt sân tại đó (đơn ở trạng thái COMPLETED).

### ✍️ Cách đánh giá

**Bước 1:** Vào trang chi tiết sân

**Bước 2:** Kéo xuống phần **"Đánh giá & Bình luận"**

**Bước 3:** Chọn số sao (1-5 ⭐)

**Bước 4:** Viết bình luận

**Bước 5:** Nhấn **"Gửi đánh giá"**

### 🗑️ Xóa đánh giá

Bạn có thể xóa đánh giá của chính mình bằng cách nhấn nút **"Xóa"** bên cạnh đánh giá.

---

## 7. Quản lý tài khoản

### 👤 Xem thông tin cá nhân

**Bước 1:** Nhấn vào avatar/tên của bạn trên thanh điều hướng

**Bước 2:** Chọn **"Tài khoản"** hoặc vào trang Profile

### ✏️ Cập nhật thông tin

Trong trang Profile, bạn có thể chỉnh sửa:
- 👤 Họ và tên
- 📱 Số điện thoại
- 🏠 Địa chỉ

Nhấn **"Lưu thay đổi"** để cập nhật.

### 🔐 Đổi mật khẩu

**Bước 1:** Vào trang Profile

**Bước 2:** Chọn tab **"Đổi mật khẩu"**

**Bước 3:** Nhập:
- Mật khẩu hiện tại
- Mật khẩu mới
- Xác nhận mật khẩu mới

**Bước 4:** Nhấn **"Đổi mật khẩu"**

> ⚠️ **Yêu cầu:** Mật khẩu mới phải có ít nhất 6 ký tự

### 🚪 Đăng xuất

Nhấn nút **"🚪 Đăng xuất"** trên thanh điều hướng.

---

## 8. Hướng dẫn cho Chủ sân (OWNER)

### 🏟️ Quản lý sân của tôi

#### Xem danh sách sân
1. Đăng nhập với tài khoản OWNER
2. Nhấn **"🏟️ Sân của tôi"** trên menu

#### Thêm sân mới

**Bước 1:** Nhấn nút **"+ Thêm sân mới"**

**Bước 2:** Điền thông tin sân:

| Trường | Mô tả | Bắt buộc |
|--------|-------|----------|
| Tên sân | Tên hiển thị của sân | ✅ |
| Loại sân | Sân 5 / Sân 7 / Sân 11 | ✅ |
| Thành phố | Thành phố đặt sân | ✅ |
| Quận/Huyện | Quận/Huyện | ✅ |
| Địa chỉ chi tiết | Số nhà, đường... | ✅ |
| Giá/giờ | Giá thuê mỗi giờ (VNĐ) | ✅ |
| Giờ mở cửa | Giờ bắt đầu hoạt động | ✅ |
| Giờ đóng cửa | Giờ kết thúc hoạt động | ✅ |
| Mô tả | Mô tả chi tiết về sân | |
| URL hình ảnh | Link hình ảnh sân | |

**Bước 3:** Nhấn **"Tạo sân"**

> ⚠️ **Lưu ý:** Sân mới tạo sẽ ở trạng thái **"Chờ duyệt"**. Admin sẽ xem xét và duyệt sân của bạn.

#### Sửa thông tin sân

1. Tìm sân trong danh sách
2. Nhấn nút **"✏️ Sửa"**
3. Chỉnh sửa thông tin
4. Nhấn **"Cập nhật"**

#### Xóa sân

1. Tìm sân trong danh sách
2. Nhấn nút **"🗑️ Xóa"**
3. Xác nhận xóa

> ⚠️ **Cảnh báo:** Xóa sân sẽ xóa luôn các đơn đặt liên quan!

### 📋 Quản lý đơn đặt sân

#### Xem danh sách đơn
1. Nhấn **"📋 Đơn đặt"** trên menu
2. Xem tất cả đơn đặt sân của các sân bạn sở hữu

#### Xác nhận đơn

1. Tìm đơn có trạng thái **PENDING**
2. Xem thông tin: Khách hàng, SĐT, Ngày giờ, Sân
3. Nhấn **"✅ Xác nhận"**

#### Từ chối đơn

1. Tìm đơn có trạng thái **PENDING**
2. Nhấn **"❌ Từ chối"**
3. Nhập **lý do từ chối**
4. Xác nhận

### 📊 Xem thống kê doanh thu

#### Truy cập thống kê
Nhấn **"📊 Thống kê"** trên menu

#### Thông tin hiển thị

**Tổng quan:**
- 💰 Doanh thu tháng này
- 💵 Tổng doanh thu
- 📋 Số đơn theo trạng thái

**Biểu đồ:**
- 📈 Biểu đồ doanh thu theo ngày
- 🏟️ Doanh thu từng sân

#### Lọc theo thời gian

1. Chọn **Ngày bắt đầu** và **Ngày kết thúc**
2. Nhấn **"Lọc"**
3. Xem kết quả thống kê trong khoảng thời gian đã chọn

### 📥 Xuất báo cáo

#### Xuất file Excel
1. Vào trang Thống kê
2. Nhấn **"📥 Xuất Excel"**
3. File .xlsx sẽ được tải về

**Nội dung file Excel:**
- Danh sách tất cả đơn đặt sân
- Thông tin: Mã đơn, Khách hàng, Sân, Ngày giờ, Tổng tiền, Trạng thái

#### Xuất file PDF
1. Vào trang Thống kê
2. Nhấn **"📥 Xuất PDF"**
3. File .pdf sẽ được tải về

**Nội dung file PDF:**
- Báo cáo tổng hợp doanh thu
- Thông tin chủ sân
- Tổng số đơn, tổng doanh thu

---

## 9. Hướng dẫn cho Quản trị viên (ADMIN)

### ✅ Duyệt sân mới

#### Truy cập trang duyệt sân
1. Đăng nhập với tài khoản ADMIN
2. Nhấn **"✅ Duyệt sân"** trên menu

#### Xem danh sách sân chờ duyệt
- Danh sách hiển thị tất cả sân (đã duyệt + chưa duyệt)
- Sân chưa duyệt có nhãn **"Chờ duyệt"**

#### Duyệt sân
1. Tìm sân có trạng thái "Chờ duyệt"
2. Xem thông tin chi tiết
3. Nhấn **"✅ Duyệt"**
4. Sân sẽ được hiển thị công khai

#### Xóa sân
1. Tìm sân muốn xóa
2. Nhấn **"🗑️ Xóa"**
3. Xác nhận xóa

### 👥 Quản lý người dùng

#### Truy cập trang quản lý users
Nhấn **"👥 Quản lý"** trên menu

#### Xem danh sách users

Bảng hiển thị thông tin:
- ID
- Họ tên
- Username
- Email/SĐT
- Vai trò (USER/OWNER)
- Trạng thái (Hoạt động/Bị khóa)
- Ngày tạo

#### Lọc theo vai trò
Sử dụng các tab:
- **Tất cả**
- **USER** - Chỉ người dùng
- **OWNER** - Chỉ chủ sân

#### Khóa/Mở khóa tài khoản

1. Tìm user trong danh sách
2. Nhấn nút **"🔒 Khóa"** hoặc **"🔓 Mở khóa"**
3. Trạng thái sẽ được cập nhật

> ⚠️ **Lưu ý:** User bị khóa sẽ không thể đăng nhập

#### Thay đổi vai trò

1. Tìm user trong danh sách
2. Nhấn nút **"Đổi role"**
3. Chọn vai trò mới (USER ↔ OWNER)
4. Xác nhận

#### Xóa tài khoản

1. Tìm user trong danh sách
2. Nhấn nút **"🗑️ Xóa"**
3. Xác nhận xóa

> ⚠️ **Cảnh báo:** Thao tác này sẽ khóa tài khoản vĩnh viễn

### 📊 Xem thống kê hệ thống

Trong trang Dashboard, Admin có thể xem:
- 👥 Tổng số người dùng
- 🏟️ Tổng số sân
- 📋 Tổng số đơn đặt
- 💰 Tổng doanh thu hệ thống

---

## 📞 Hỗ trợ

Nếu bạn gặp vấn đề khi sử dụng, vui lòng liên hệ:

- 📧 **Email:** nguyenvandung6000@gmail.com
- 📱 **Hotline:** 1900-xxxx

---

<div align="center">
  <br/>
  <strong>⚽ ĐặtSân247 - Đặt sân bóng chưa bao giờ dễ dàng đến thế! ⚽</strong>
  <br/><br/>
  © 2025 ĐặtSân247. All rights reserved.
</div>
