# 📊 SƠ ĐỒ HỆ THỐNG - ĐặtSân247

> File này chứa code PlantUML để vẽ các sơ đồ hệ thống.
> 
> **Cách sử dụng:**
> 1. Copy code PlantUML
> 2. Truy cập [PlantUML Online](https://www.plantuml.com/plantuml/uml/) hoặc [PlantText](https://www.planttext.com/)
> 3. Paste code và nhấn Submit để xem sơ đồ

---

## 📑 Mục lục

1. [Sơ đồ Actor](#1-sơ-đồ-actor)
2. [Sơ đồ Use Case tổng quan](#2-sơ-đồ-use-case-tổng-quan)
3. [Sơ đồ Use Case chi tiết](#3-sơ-đồ-use-case-chi-tiết)
4. [Sơ đồ Class (Entity)](#4-sơ-đồ-class-entity)
5. [Sơ đồ Sequence - Luồng hoạt động](#5-sơ-đồ-sequence---luồng-hoạt-động)
6. [Sơ đồ Activity - Quy trình](#6-sơ-đồ-activity---quy-trình)
7. [Sơ đồ Component - Kiến trúc](#7-sơ-đồ-component---kiến-trúc)
8. [Sơ đồ ERD - Database](#8-sơ-đồ-erd---database)

---

## 1. Sơ đồ Actor

```plantuml
@startuml Actor Diagram
skinparam actorStyle awesome
skinparam backgroundColor #FEFEFE

title Sơ đồ Actor - Hệ thống ĐặtSân247

actor "Khách\n(Guest)" as Guest #LightGray
actor "Người dùng\n(USER)" as User #LightBlue
actor "Chủ sân\n(OWNER)" as Owner #LightGreen
actor "Quản trị viên\n(ADMIN)" as Admin #Orange

rectangle "Hệ thống ĐặtSân247" as System {
}

Guest --> System : Xem sân, Tìm kiếm
User --> System : Đặt sân, Đánh giá
Owner --> System : Quản lý sân, Xác nhận đơn
Admin --> System : Duyệt sân, Quản lý users

note right of Guest
  Chưa đăng nhập
  Chỉ xem thông tin
end note

note right of User
  Đã đăng nhập
  Role = USER
end note

note right of Owner
  Đã đăng nhập
  Role = OWNER
end note

note right of Admin
  Đã đăng nhập
  Role = ADMIN
end note

@enduml
```

---

## 2. Sơ đồ Use Case tổng quan

```plantuml
@startuml Use Case Overview
skinparam backgroundColor #FEFEFE
skinparam usecase {
    BackgroundColor<<main>> LightYellow
    BackgroundColor<<user>> LightBlue
    BackgroundColor<<owner>> LightGreen
    BackgroundColor<<admin>> Orange
}

title Sơ đồ Use Case Tổng quan - ĐặtSân247

left to right direction

actor "Guest" as G
actor "User" as U
actor "Owner" as O
actor "Admin" as A

rectangle "Hệ thống ĐặtSân247" {
    ' === PUBLIC ===
    package "Public" {
        usecase "Xem danh sách sân" as UC1 <<main>>
        usecase "Tìm kiếm sân" as UC2 <<main>>
        usecase "Xem chi tiết sân" as UC3 <<main>>
        usecase "Đăng ký" as UC4
        usecase "Đăng nhập" as UC5
    }
    
    ' === USER ===
    package "User Features" {
        usecase "Đặt sân" as UC6 <<user>>
        usecase "Xem lịch đặt" as UC7 <<user>>
        usecase "Hủy đặt sân" as UC8 <<user>>
        usecase "Đánh giá sân" as UC9 <<user>>
        usecase "Quản lý profile" as UC10 <<user>>
    }
    
    ' === OWNER ===
    package "Owner Features" {
        usecase "Quản lý sân" as UC11 <<owner>>
        usecase "Xác nhận/Từ chối đơn" as UC12 <<owner>>
        usecase "Xem thống kê" as UC13 <<owner>>
        usecase "Xuất báo cáo" as UC14 <<owner>>
    }
    
    ' === ADMIN ===
    package "Admin Features" {
        usecase "Duyệt sân" as UC15 <<admin>>
        usecase "Quản lý users" as UC16 <<admin>>
        usecase "Xem thống kê hệ thống" as UC17 <<admin>>
    }
}

' Relationships
G --> UC1
G --> UC2
G --> UC3
G --> UC4
G --> UC5

U --> UC1
U --> UC2
U --> UC3
U --> UC6
U --> UC7
U --> UC8
U --> UC9
U --> UC10

O --> UC11
O --> UC12
O --> UC13
O --> UC14

A --> UC15
A --> UC16
A --> UC17

@enduml
```

---

## 3. Sơ đồ Use Case chi tiết

### 3.1 Use Case - Đặt sân

```plantuml
@startuml Use Case - Booking
skinparam backgroundColor #FEFEFE

title Use Case chi tiết: Đặt sân

left to right direction

actor "User" as U

rectangle "Module Đặt sân" {
    usecase "Xem khung giờ trống" as UC1
    usecase "Chọn ngày đặt" as UC2
    usecase "Chọn giờ đặt" as UC3
    usecase "Nhập thông tin liên hệ" as UC4
    usecase "Xác nhận đặt sân" as UC5
    usecase "Xem lịch đặt" as UC6
    usecase "Hủy đặt sân" as UC7
    usecase "Kiểm tra trùng lịch" as UC8
    usecase "Tính tổng tiền" as UC9
}

U --> UC1
U --> UC2
U --> UC6
U --> UC7

UC2 ..> UC1 : <<include>>
UC3 ..> UC8 : <<include>>
UC5 ..> UC9 : <<include>>
UC2 <.. UC3 : <<extend>>
UC3 <.. UC4 : <<extend>>
UC4 <.. UC5 : <<extend>>

note right of UC8
  Kiểm tra không trùng
  với booking đã có
end note

@enduml
```

### 3.2 Use Case - Quản lý sân (Owner)

```plantuml
@startuml Use Case - Pitch Management
skinparam backgroundColor #FEFEFE

title Use Case chi tiết: Quản lý sân (Owner)

left to right direction

actor "Owner" as O
actor "Admin" as A

rectangle "Module Quản lý sân" {
    usecase "Xem danh sách sân của tôi" as UC1
    usecase "Thêm sân mới" as UC2
    usecase "Sửa thông tin sân" as UC3
    usecase "Xóa sân" as UC4
    usecase "Xem trạng thái duyệt" as UC5
    usecase "Duyệt sân" as UC6
    usecase "Validate thông tin" as UC7
}

O --> UC1
O --> UC2
O --> UC3
O --> UC4
O --> UC5

A --> UC6

UC2 ..> UC7 : <<include>>
UC3 ..> UC7 : <<include>>

note right of UC2
  Sân mới tạo có
  trạng thái: Chờ duyệt
end note

note right of UC6
  Chỉ Admin mới
  được duyệt sân
end note

@enduml
```

### 3.3 Use Case - Quản lý đơn đặt (Owner)

```plantuml
@startuml Use Case - Order Management
skinparam backgroundColor #FEFEFE

title Use Case chi tiết: Quản lý đơn đặt (Owner)

left to right direction

actor "Owner" as O

rectangle "Module Quản lý đơn" {
    usecase "Xem tất cả đơn đặt" as UC1
    usecase "Lọc đơn theo trạng thái" as UC2
    usecase "Xem chi tiết đơn" as UC3
    usecase "Xác nhận đơn" as UC4
    usecase "Từ chối đơn" as UC5
    usecase "Nhập lý do từ chối" as UC6
    usecase "Gửi thông báo" as UC7
}

O --> UC1
O --> UC2
O --> UC3
O --> UC4
O --> UC5

UC5 ..> UC6 : <<include>>
UC4 ..> UC7 : <<include>>
UC5 ..> UC7 : <<include>>

note right of UC4
  Chỉ xác nhận đơn
  trạng thái PENDING
end note

@enduml
```

---

## 4. Sơ đồ Class (Entity)

```plantuml
@startuml Class Diagram - Entity
skinparam backgroundColor #FEFEFE
skinparam class {
    BackgroundColor White
    BorderColor Black
    ArrowColor Black
}

title Sơ đồ Class - Entity

enum Role {
    USER
    OWNER
    ADMIN
}

enum PitchType {
    PITCH_5
    PITCH_7
    PITCH_11
}

enum BookingStatus {
    PENDING
    CONFIRMED
    REJECTED
    COMPLETED
    CANCELLED
}

class User {
    - id: Long
    - username: String
    - password: String
    - fullName: String
    - phoneNumber: String
    - address: String
    - role: Role
    - enabled: Boolean
    - createdAt: LocalDateTime
    --
    + getters()
    + setters()
}

class Pitch {
    - id: Long
    - name: String
    - type: PitchType
    - city: String
    - district: String
    - address: String
    - pricePerHour: BigDecimal
    - openTime: LocalTime
    - closeTime: LocalTime
    - description: String
    - imageUrl: String
    - approved: Boolean
    - createdAt: LocalDateTime
    --
    + getters()
    + setters()
}

class Booking {
    - id: Long
    - bookingDate: LocalDate
    - startTime: LocalTime
    - endTime: LocalTime
    - totalPrice: BigDecimal
    - status: BookingStatus
    - phoneNumber: String
    - note: String
    - rejectReason: String
    - createdAt: LocalDateTime
    --
    + getters()
    + setters()
}

class Review {
    - id: Long
    - rating: Integer
    - comment: String
    - createdAt: LocalDateTime
    --
    + getters()
    + setters()
}

' Relationships
User "1" -- "*" Pitch : owns >
User "1" -- "*" Booking : books >
Pitch "1" -- "*" Booking : has >
User "1" -- "*" Review : writes >
Pitch "1" -- "*" Review : receives >

User -- Role
Pitch -- PitchType
Booking -- BookingStatus

@enduml
```

---

## 5. Sơ đồ Sequence - Luồng hoạt động

### 5.1 Sequence - Đăng nhập

```plantuml
@startuml Sequence - Login
skinparam backgroundColor #FEFEFE

title Luồng Đăng nhập

actor User as U
participant "Frontend\n(React)" as FE
participant "AuthController" as AC
participant "AuthService" as AS
participant "UserRepository" as UR
participant "JwtUtils" as JWT
database "MySQL" as DB

U -> FE: Nhập username, password
FE -> AC: POST /api/auth/login\n{username, password}
AC -> AS: login(request)

AS -> UR: findByUsername(username)
UR -> DB: SELECT * FROM users
DB --> UR: User entity
UR --> AS: User

alt User không tồn tại
    AS --> AC: throw Exception
    AC --> FE: 401 Unauthorized
    FE --> U: "Sai username hoặc password"
else User tồn tại
    AS -> AS: checkPassword(password, user.password)
    
    alt Sai password
        AS --> AC: throw Exception
        AC --> FE: 401 Unauthorized
        FE --> U: "Sai username hoặc password"
    else Đúng password
        alt Tài khoản bị khóa
            AS --> AC: throw Exception
            AC --> FE: 401 Unauthorized
            FE --> U: "Tài khoản đã bị khóa"
        else Tài khoản hoạt động
            AS -> JWT: generateToken(username)
            JWT --> AS: JWT Token
            AS --> AC: AuthResponse(token, user)
            AC --> FE: 200 OK + {token, user}
            FE -> FE: Lưu token vào localStorage
            FE --> U: Chuyển về trang chủ
        end
    end
end

@enduml
```

### 5.2 Sequence - Đặt sân

```plantuml
@startuml Sequence - Booking
skinparam backgroundColor #FEFEFE

title Luồng Đặt sân

actor User as U
participant "Frontend\n(React)" as FE
participant "BookingController" as BC
participant "BookingService" as BS
participant "BookingRepository" as BR
participant "PitchRepository" as PR
database "MySQL" as DB

== Bước 1: Xem khung giờ trống ==
U -> FE: Chọn sân, chọn ngày
FE -> BC: GET /api/bookings/available-slots/{pitchId}?date=...
BC -> BS: getAvailableTimeSlots(pitchId, date)
BS -> PR: findById(pitchId)
PR -> DB: SELECT * FROM pitches
DB --> PR: Pitch
PR --> BS: Pitch

BS -> BR: findByPitchAndDate(pitch, date)
BR -> DB: SELECT * FROM bookings
DB --> BR: List<Booking>
BR --> BS: List<Booking>

BS -> BS: Tính các slot còn trống
BS --> BC: List<TimeSlotResponse>
BC --> FE: 200 OK + slots
FE --> U: Hiển thị khung giờ

== Bước 2: Đặt sân ==
U -> FE: Chọn giờ, nhập SĐT, ghi chú
FE -> BC: POST /api/bookings\n{pitchId, date, startTime, endTime, phone}
BC -> BS: createBooking(request)

BS -> BS: Validate dữ liệu
BS -> BR: findOverlappingBookings(...)
BR -> DB: SELECT * FROM bookings WHERE...
DB --> BR: List<Booking>
BR --> BS: List<Booking>

alt Có trùng lịch
    BS --> BC: throw Exception
    BC --> FE: 400 Bad Request
    FE --> U: "Khung giờ đã được đặt"
else Không trùng
    BS -> BS: Tính totalPrice
    BS -> BR: save(booking)
    BR -> DB: INSERT INTO bookings
    DB --> BR: Booking saved
    BR --> BS: Booking
    BS --> BC: BookingResponse
    BC --> FE: 201 Created
    FE --> U: "Đặt sân thành công!"
end

@enduml
```

### 5.3 Sequence - Xác nhận đơn (Owner)

```plantuml
@startuml Sequence - Confirm Booking
skinparam backgroundColor #FEFEFE

title Luồng Xác nhận đơn đặt (Owner)

actor Owner as O
participant "Frontend\n(React)" as FE
participant "BookingController" as BC
participant "BookingService" as BS
participant "BookingRepository" as BR
database "MySQL" as DB

O -> FE: Xem danh sách đơn PENDING
FE -> BC: GET /api/bookings/owner/pending
BC -> BS: getBookingsForOwnerByStatus(PENDING)
BS -> BR: findByPitchOwnerAndStatus(owner, PENDING)
BR -> DB: SELECT * FROM bookings
DB --> BR: List<Booking>
BR --> BS: List<Booking>
BS --> BC: List<BookingResponse>
BC --> FE: 200 OK
FE --> O: Hiển thị danh sách

O -> FE: Nhấn "Xác nhận" đơn
FE -> BC: PUT /api/bookings/owner/{id}/confirm
BC -> BS: confirmBooking(id)

BS -> BR: findById(id)
BR -> DB: SELECT * FROM bookings
DB --> BR: Booking
BR --> BS: Booking

BS -> BS: Kiểm tra quyền (owner của sân)
BS -> BS: Kiểm tra status == PENDING

alt Không có quyền hoặc status != PENDING
    BS --> BC: throw Exception
    BC --> FE: 400 Bad Request
    FE --> O: Thông báo lỗi
else OK
    BS -> BS: booking.setStatus(CONFIRMED)
    BS -> BR: save(booking)
    BR -> DB: UPDATE bookings SET status='CONFIRMED'
    DB --> BR: OK
    BR --> BS: Booking
    BS --> BC: BookingResponse
    BC --> FE: 200 OK
    FE --> O: "Đã xác nhận đơn"
end

@enduml
```

### 5.4 Sequence - Duyệt sân (Admin)

```plantuml
@startuml Sequence - Approve Pitch
skinparam backgroundColor #FEFEFE

title Luồng Duyệt sân (Admin)

actor Admin as A
participant "Frontend\n(React)" as FE
participant "PitchController" as PC
participant "PitchService" as PS
participant "PitchRepository" as PR
database "MySQL" as DB

A -> FE: Xem danh sách sân chờ duyệt
FE -> PC: GET /api/pitches/admin/all
PC -> PS: getAllPitches()
PS -> PR: findAll()
PR -> DB: SELECT * FROM pitches
DB --> PR: List<Pitch>
PR --> PS: List<Pitch>
PS --> PC: List<PitchResponse>
PC --> FE: 200 OK
FE --> A: Hiển thị (lọc approved=false)

A -> FE: Nhấn "Duyệt" sân
FE -> PC: PUT /api/pitches/admin/{id}/approve
PC -> PS: approvePitch(id)

PS -> PR: findById(id)
PR -> DB: SELECT * FROM pitches
DB --> PR: Pitch
PR --> PS: Pitch

PS -> PS: pitch.setApproved(true)
PS -> PR: save(pitch)
PR -> DB: UPDATE pitches SET approved=true
DB --> PR: OK
PR --> PS: Pitch
PS --> PC: PitchResponse
PC --> FE: 200 OK
FE --> A: "Đã duyệt sân"

@enduml
```

---

## 6. Sơ đồ Activity - Quy trình

### 6.1 Activity - Quy trình đặt sân hoàn chỉnh

```plantuml
@startuml Activity - Booking Process
skinparam backgroundColor #FEFEFE

title Quy trình Đặt sân hoàn chỉnh

start

:User truy cập trang chủ;

:Tìm kiếm/Lọc sân;

:Chọn sân muốn đặt;

:Xem chi tiết sân;

if (Đã đăng nhập?) then (Chưa)
    :Chuyển đến trang đăng nhập;
    :Nhập username/password;
    
    if (Đăng nhập thành công?) then (Không)
        :Hiển thị lỗi;
        stop
    else (Có)
        :Lưu token;
    endif
else (Rồi)
endif

:Chọn ngày đặt;

:Hệ thống hiển thị khung giờ trống;

:Chọn giờ bắt đầu và kết thúc;

:Nhập số điện thoại liên hệ;

:Nhập ghi chú (tùy chọn);

:Xem tổng tiền;

:Nhấn "Đặt sân";

if (Kiểm tra trùng lịch?) then (Trùng)
    :Thông báo "Khung giờ đã được đặt";
    :Quay lại chọn giờ;
    backward :Chọn giờ khác;
else (Không trùng)
endif

:Tạo booking với status = PENDING;

:Thông báo "Đặt sân thành công";

:Đơn hiển thị trong "Lịch đặt";

fork
    :User chờ xác nhận;
fork again
    :Owner nhận thông báo đơn mới;
    
    if (Owner xác nhận?) then (Xác nhận)
        :Status = CONFIRMED;
    else (Từ chối)
        :Nhập lý do;
        :Status = REJECTED;
    endif
end fork

if (Status = CONFIRMED?) then (Có)
    :User đến chơi bóng;
    :Hết giờ chơi;
    :Scheduler tự động chuyển\nStatus = COMPLETED;
    :User có thể đánh giá sân;
else (Không)
    :User nhận thông báo bị từ chối;
endif

stop

@enduml
```

### 6.2 Activity - Quy trình trạng thái Booking

```plantuml
@startuml Activity - Booking Status
skinparam backgroundColor #FEFEFE

title Sơ đồ trạng thái Booking

[*] --> PENDING : User đặt sân

PENDING --> CONFIRMED : Owner xác nhận
PENDING --> REJECTED : Owner từ chối
PENDING --> CANCELLED : User hủy

CONFIRMED --> COMPLETED : Scheduler\n(hết giờ chơi)

REJECTED --> [*]
CANCELLED --> [*]
COMPLETED --> [*]

note right of PENDING
  Trạng thái ban đầu
  khi User vừa đặt
end note

note right of CONFIRMED
  Owner đã xác nhận
  User không thể hủy
end note

note right of COMPLETED
  Tự động chuyển khi
  endTime < now()
end note

@enduml
```

### 6.3 Activity - Quy trình đăng ký sân (Owner)

```plantuml
@startuml Activity - Register Pitch
skinparam backgroundColor #FEFEFE

title Quy trình Đăng ký sân mới (Owner)

start

:Owner đăng nhập;

:Vào "Sân của tôi";

:Nhấn "Thêm sân mới";

:Nhập thông tin sân;

note right
  - Tên sân
  - Loại sân (5/7/11)
  - Địa chỉ
  - Giá/giờ
  - Giờ hoạt động
  - Mô tả
  - Hình ảnh
end note

if (Validate thông tin?) then (Không hợp lệ)
    :Hiển thị lỗi validation;
    backward :Sửa thông tin;
else (Hợp lệ)
endif

:Tạo sân với approved = false;

:Thông báo "Tạo sân thành công, chờ duyệt";

:Sân hiển thị với nhãn "Chờ duyệt";

fork
    :Owner chờ Admin duyệt;
fork again
    :Admin xem danh sách sân mới;
    :Admin xem chi tiết sân;
    
    if (Admin duyệt?) then (Duyệt)
        :approved = true;
        :Sân hiển thị công khai;
    else (Xóa)
        :Xóa sân khỏi hệ thống;
    endif
end fork

stop

@enduml
```

---

## 7. Sơ đồ Component - Kiến trúc

### 7.1 Component - Kiến trúc tổng quan

```plantuml
@startuml Component - Architecture
skinparam backgroundColor #FEFEFE

title Kiến trúc hệ thống ĐặtSân247

package "Client" {
    [Web Browser] as Browser
}

package "Frontend (React + Vite)" {
    [React App] as ReactApp
    [React Router] as Router
    [Axios HTTP Client] as Axios
    [Auth Context] as AuthCtx
    
    package "Pages" {
        [Home]
        [Login/Register]
        [PitchDetail]
        [MyBookings]
        [OwnerPages]
        [AdminPages]
    }
    
    package "Components" {
        [Navbar]
        [SearchFilter]
    }
}

package "Backend (Spring Boot)" {
    package "Controller Layer" {
        [AuthController]
        [PitchController]
        [BookingController]
        [ReviewController]
        [StatisticsController]
        [AdminController]
    }
    
    package "Service Layer" {
        [AuthService]
        [PitchService]
        [BookingService]
        [ReviewService]
        [StatisticsService]
        [AdminService]
        [ReportService]
    }
    
    package "Repository Layer" {
        [UserRepository]
        [PitchRepository]
        [BookingRepository]
        [ReviewRepository]
    }
    
    package "Security" {
        [JWT Filter]
        [Security Config]
    }
    
    package "Scheduler" {
        [BookingScheduler]
    }
}

database "MySQL Database" as DB {
    [users]
    [pitches]
    [bookings]
    [reviews]
}

Browser --> ReactApp : HTTP
ReactApp --> Router
ReactApp --> Axios
ReactApp --> AuthCtx

Axios --> [AuthController] : REST API
Axios --> [PitchController] : REST API
Axios --> [BookingController] : REST API

[AuthController] --> [AuthService]
[PitchController] --> [PitchService]
[BookingController] --> [BookingService]

[AuthService] --> [UserRepository]
[PitchService] --> [PitchRepository]
[BookingService] --> [BookingRepository]

[UserRepository] --> DB
[PitchRepository] --> DB
[BookingRepository] --> DB
[ReviewRepository] --> DB

[JWT Filter] --> [Security Config]
[BookingScheduler] --> [BookingRepository]

@enduml
```

### 7.2 Component - Luồng Request/Response

```plantuml
@startuml Component - Request Flow
skinparam backgroundColor #FEFEFE

title Luồng Request/Response

actor User

node "Frontend\n:5173" as FE {
    component [React App]
    component [Axios]
}

node "Backend\n:8080" as BE {
    component [CORS Filter]
    component [JWT Filter]
    component [Controller]
    component [Service]
    component [Repository]
}

database "MySQL\n:3306" as DB

User -> [React App] : 1. Tương tác UI
[React App] -> [Axios] : 2. Gọi API
[Axios] -> [CORS Filter] : 3. HTTP Request\n+ JWT Token

[CORS Filter] -> [JWT Filter] : 4. Check CORS
[JWT Filter] -> [Controller] : 5. Validate Token

alt Token không hợp lệ
    [JWT Filter] --> [Axios] : 401 Unauthorized
else Token hợp lệ
    [Controller] -> [Service] : 6. Business Logic
    [Service] -> [Repository] : 7. Data Access
    [Repository] -> DB : 8. SQL Query
    DB --> [Repository] : 9. Result
    [Repository] --> [Service] : 10. Entity
    [Service] --> [Controller] : 11. DTO
    [Controller] --> [Axios] : 12. JSON Response
end

[Axios] --> [React App] : 13. Update State
[React App] --> User : 14. Render UI

@enduml
```

---

## 8. Sơ đồ ERD - Database

```plantuml
@startuml ERD - Database
skinparam backgroundColor #FEFEFE

title Sơ đồ ERD - Database ĐặtSân247

entity "users" as users {
    * id : BIGINT <<PK>>
    --
    * username : VARCHAR(50) <<UNIQUE>>
    * password : VARCHAR(255)
    * full_name : VARCHAR(100)
    phone_number : VARCHAR(20)
    address : VARCHAR(255)
    * role : ENUM('USER','OWNER','ADMIN')
    * enabled : BOOLEAN
    * created_at : DATETIME
}

entity "pitches" as pitches {
    * id : BIGINT <<PK>>
    --
    * name : VARCHAR(100)
    * type : ENUM('PITCH_5','PITCH_7','PITCH_11')
    * city : VARCHAR(50)
    * district : VARCHAR(50)
    * address : VARCHAR(255)
    * price_per_hour : DECIMAL(10,2)
    * open_time : TIME
    * close_time : TIME
    description : TEXT
    image_url : VARCHAR(500)
    * approved : BOOLEAN
    * created_at : DATETIME
    --
    * owner_id : BIGINT <<FK>>
}

entity "bookings" as bookings {
    * id : BIGINT <<PK>>
    --
    * booking_date : DATE
    * start_time : TIME
    * end_time : TIME
    * total_price : DECIMAL(10,2)
    * status : ENUM('PENDING','CONFIRMED',...)
    phone_number : VARCHAR(20)
    note : TEXT
    reject_reason : TEXT
    * created_at : DATETIME
    --
    * user_id : BIGINT <<FK>>
    * pitch_id : BIGINT <<FK>>
}

entity "reviews" as reviews {
    * id : BIGINT <<PK>>
    --
    * rating : INT (1-5)
    comment : TEXT
    * created_at : DATETIME
    --
    * user_id : BIGINT <<FK>>
    * pitch_id : BIGINT <<FK>>
}

' Relationships
users ||--o{ pitches : "owns"
users ||--o{ bookings : "books"
users ||--o{ reviews : "writes"

pitches ||--o{ bookings : "has"
pitches ||--o{ reviews : "receives"

@enduml
```

---

## 📝 Ghi chú

### Cách đọc các ký hiệu quan hệ:

| Ký hiệu | Ý nghĩa |
|---------|---------|
| `||--o{` | Một - Nhiều (1-N) |
| `}o--o{` | Nhiều - Nhiều (N-N) |
| `||--||` | Một - Một (1-1) |
| `-->` | Phụ thuộc/Sử dụng |
| `..>` | Include/Extend |

### Màu sắc trong sơ đồ:

| Màu | Ý nghĩa |
|-----|---------|
| 🔵 LightBlue | Chức năng USER |
| 🟢 LightGreen | Chức năng OWNER |
| 🟠 Orange | Chức năng ADMIN |
| 🟡 LightYellow | Chức năng chung |

---

<div align="center">
  <strong>⚽ ĐặtSân247 - System Diagrams ⚽</strong>
</div>
