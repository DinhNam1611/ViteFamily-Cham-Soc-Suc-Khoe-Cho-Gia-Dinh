# Features Specification — VitaFamily

Tài liệu này mô tả toàn bộ 20 chức năng chính của hệ thống VitaFamily,
chia theo 3 phân hệ. Dùng làm căn cứ khi implement và review các tính năng.

---

## Phân hệ: Bệnh nhân & Gia đình (7 chức năng)

### 1. Xác thực & Quản lý Tài khoản

**Mục đích:** Cổng vào đầu tiên — định danh người dùng, bảo vệ dữ liệu nhạy cảm.

**Luồng hoạt động:**
- Đăng ký / Đăng nhập bằng Email + Password
- Mật khẩu mã hóa bằng **bcryptjs** trước khi lưu DB
- Sau đăng nhập cấp **JWT** để duy trì phiên (lưu ở localStorage)
- Người dùng tự cập nhật: họ tên, số điện thoại, avatar
- Quên mật khẩu → gửi OTP hoặc link đặt lại qua **Nodemailer (Gmail SMTP)**

**Tables liên quan:** `users` (id, email, password, full_name, phone, avatar, status), `roles`

**Ràng buộc:**
- Email phải unique
- Token bị xóa khỏi localStorage khi nhận 401 (xem `axios.ts`)
- Mọi route bảo vệ phải qua middleware `verifyToken`

---

### 2. Quản lý Hồ sơ Gia đình

**Mục đích:** Một tài khoản quản lý sức khỏe toàn bộ gia đình — điểm khác biệt cốt lõi của VitaFamily.

**Luồng hoạt động:**
- Sau đăng ký, người dùng tạo "Nhóm gia đình" (family)
- Thêm thành viên: họ tên, ngày sinh, giới tính, nhóm máu, dị ứng, tiền sử bệnh
- Dựa trên ngày sinh + giới tính → gợi ý gói khám phù hợp (Kidcare, Baby Care)
- Chủ gia đình: thêm, sửa, xóa thành viên bất kỳ lúc nào

**Tables liên quan:**
- `families` (id, user_id FK, family_name)
- `members` (id, family_id FK, full_name, dob, gender, blood_type, allergy, medical_history)

**Ràng buộc:** 1 tài khoản → 1 nhóm gia đình → nhiều thành viên

---

### 3. Hồ sơ Khám bệnh & Upload file y tế

**Mục đích:** "Nhật ký sức khỏe" điện tử — ghi chép lịch sử khám và lưu ảnh/PDF tài liệu y tế.

**Luồng hoạt động:**
- Sau mỗi lần khám: chọn thành viên → nhập ngày khám, bệnh viện, bác sĩ, lý do, chẩn đoán, ghi chú
- Upload ảnh chụp / PDF (kết quả xét nghiệm, đơn thuốc, phim chụp) lên **Cloudinary**
- Xem lại toàn bộ lịch sử theo dòng thời gian

**Tables liên quan:**
- `medical_records` (id, member_id FK, visit_date, hospital_name, doctor_name, reason, diagnosis, notes)
- `medical_files` (id, medical_record_id FK, file_url, file_type)

**Services ngoài:** Cloudinary API Key + config trong `.env`

---

### 4. Quản lý Đơn thuốc & Nhắc uống thuốc tự động

**Mục đích:** Chuyển đổi đơn thuốc giấy thành hệ thống nhắc nhở thông minh — giảm thiểu quên thuốc.

**Luồng hoạt động:**
- Nhập đơn thuốc thủ công hoặc đồng bộ từ bác sĩ kê điện tử
- Mỗi loại thuốc: tên, liều lượng, tần suất, khung giờ (Sáng/Trưa/Chiều/Tối), ngày bắt đầu/kết thúc
- **node-cron** quét định kỳ → kích hoạt thông báo khi đến giờ uống
- Gửi đồng thời: **Firebase FCM** (push notification) + **Nodemailer** (email)
- Người dùng đánh dấu "Đã uống" để theo dõi tuân thủ

**Tables liên quan:**
- `prescriptions` (id, medical_record_id FK, doctor_id, notes)
- `prescription_items` (id, prescription_id FK, medicine_name, dosage, frequency, start_date, end_date)
- `reminders` (id, prescription_item_id FK, remind_time, status: pending/sent/taken)

**Services ngoài:** Gmail SMTP, Firebase FCM Token

---

### 5. Đặt lịch khám đa phương thức

**Mục đích:** Cho phép chủ động đặt lịch cho bản thân hoặc thành viên gia đình theo 3 hình thức.

**3 hình thức:** Tại viện · Tại nhà · Tư vấn video

**Luồng hoạt động:**
1. Chọn hình thức khám
2. Chọn đối tượng: thành viên trong `members` hoặc "khách" (nhập nhanh: họ tên, năm sinh, SĐT)
3. Lọc theo chuyên khoa → chọn bác sĩ → hiển thị slots còn trống (`current_patients < max_patients`)
4. Nhập lý do khám → gửi → status = **pending**
5. Gửi email xác nhận qua Nodemailer

**Tables liên quan:**
- `appointments` (id, user_id, member_id FK, doctor_id FK, hospital_id, appointment_type, date, time_slot, reason, status, guest_name, guest_phone, reason_cancel)
- `doctor_schedules` + `slots` (start_time, end_time, max_patients, current_patients)
- `specialties`, `hospitals` (danh mục nền)

**Status flow:** `pending` → `confirmed` → `completed` | `cancelled`

---

### 6. AI Chatbot tư vấn sức khỏe *(Chức năng phụ — implement sau)*

**Mục đích:** Trợ lý ảo 24/7, giải đáp thắc mắc sức khỏe ban đầu và gợi ý đặt lịch.

**Luồng hoạt động:**
- Người dùng nhập câu hỏi → gửi kèm ngữ cảnh y tế đến **Gemini API**
- AI trả lời bằng tiếng Việt; nếu phát hiện dấu hiệu nguy hiểm → khuyến cáo đặt lịch ngay
- Lưu lịch sử hội thoại theo phiên để xem lại hoặc cung cấp cho bác sĩ

**Tables liên quan:**
- `chat_sessions` (id, user_id FK, start_time)
- `chat_messages` (id, session_id FK, sender_role: user|ai, content, timestamp)

**Services ngoài:** Gemini API Key, thư viện `@google/generative-ai` (Backend Node.js)

> ⚠️ **Ưu tiên thấp** — chỉ implement sau khi hoàn thành 5 chức năng chính phía trên.

---

### 7. Hệ thống Thông báo & Nhắc lịch

**Mục đích:** Hub tập trung mọi thông báo — nhắc thuốc, xác nhận lịch hẹn, thông báo hệ thống.

**Nguồn thông báo:**
- Lịch nhắc thuốc (theo giờ cài đặt)
- Hệ thống đặt lịch (bác sĩ xác nhận/từ chối, nhắc trước 1 ngày)
- Admin (cập nhật hệ thống, tin tức y tế)

**Luồng hoạt động:**
- Gửi đồng thời: **FCM push** (hiện ngay) + lưu vào danh sách thông báo nội bộ
- Người dùng bấm thông báo → đánh dấu "Đã đọc" (`is_read = true`)
- Nhấn vào thông báo lịch hẹn → điều hướng đến trang chi tiết lịch hẹn đó

**Tables liên quan:**
- `notifications` (id, user_id FK, title, content, type: medicine|appointment|system, is_read, created_at)

**Services ngoài:** FCM Token lưu trên thiết bị người dùng

---

## Phân hệ: Bác sĩ (5 chức năng)

### 1. Quản lý Hồ sơ cá nhân & Chuyên môn

**Mục đích:** Xây dựng "văn phòng số" — hồ sơ chuyên môn minh bạch tạo niềm tin cho bệnh nhân.

**Luồng hoạt động:**
- Upload avatar chuyên nghiệp + viết Bio (triết lý chữa bệnh)
- Khai báo học vấn, bằng cấp, chứng chỉ hành nghề, kinh nghiệm công tác
- Chọn chuyên khoa đảm trách + liệt kê lĩnh vực chuyên sâu
- Sau khi **Admin duyệt** → hiển thị trên trang "Tìm bác sĩ" của bệnh nhân

**Tables liên quan:**
- `doctors` (id, user_id FK, biography, qualifications, experience, memberships)
- `doctor_specialties` (doctor_id FK, specialty_id FK)
- `doctor_hospitals` (doctor_id FK, hospital_id FK)

**Ràng buộc:** Hồ sơ có trường `approval_status` (pending/approved/rejected) — phải được Admin duyệt mới hiển thị.

---

### 2. Quản lý Lịch làm việc & Khung giờ

**Mục đích:** Bác sĩ kiểm soát thời gian biểu → hệ thống chỉ cho bệnh nhân đặt vào slots còn trống.

**Luồng hoạt động:**
- Chọn ngày + phân bổ khung giờ (slot): ca sáng 08:00-11:00, ca chiều 13:30-16:30
- Cài đặt `max_patients` cho mỗi slot
- Đánh dấu ngày nghỉ / khung giờ bận → hệ thống tự khóa
- Xem lịch tổng quan theo tuần/tháng (Calendar view)

**Tables liên quan:**
- `doctor_schedules` (id, doctor_id FK, date)
- `slots` (id, schedule_id FK, start_time, end_time, max_patients, current_patients)

**Logic:** Chỉ hiển thị slot cho bệnh nhân khi `current_patients < max_patients`

---

### 3. Quản lý Lịch hẹn (Xác nhận / Từ chối)

**Mục đích:** Công cụ tác nghiệp hàng ngày — kiểm soát danh sách bệnh nhân và trạng thái từng ca khám.

**Luồng hoạt động:**
- Nhận thông báo khi bệnh nhân đặt lịch mới (status = pending)
- Xem trước hồ sơ bệnh nhân: tên, tuổi, nhóm máu, dị ứng, bệnh nền, kết quả khám cũ
- Chọn **Xác nhận** hoặc **Từ chối** kèm lý do
- Cập nhật trạng thái: `pending` → `confirmed` / `cancelled`; sau khám: `completed`
- Mọi thay đổi status → tự động thông báo cho bệnh nhân (FCM + email)

**Tables liên quan:**
- `appointments` (status, reason_cancel)
- `members` + `medical_records` (bác sĩ có quyền đọc Read)

---

### 4. Hồ sơ sau khám & Kê đơn thuốc điện tử

**Mục đích:** Số hóa kết quả thăm khám → tự động tạo nhắc thuốc cho bệnh nhân.

**Luồng hoạt động:**
- Sau ca khám: nhập chẩn đoán, ghi chú chuyên môn, hướng dẫn điều trị, ngày tái khám
- Kê đơn thuốc điện tử: chọn thuốc, nhập liều lượng, tần suất, khung giờ
- Nhấn "Hoàn thành" → tự động lưu vào `medical_records` của bệnh nhân + kích hoạt chuỗi nhắc thuốc

**Tables liên quan:**
- `examination_results` (appointment_id FK, diagnosis, notes)
- `prescriptions` + `prescription_items` (tên thuốc, liều dùng, khung giờ)
- `medical_records` (tạo bản ghi lịch sử khám mới)

**Chain:** `appointments` → `examination_results` → `prescriptions` → `reminders`

---

### 5. Thống kê cá nhân & Quản lý phản hồi

**Mục đích:** Dashboard hiệu suất — số liệu ca khám + đánh giá từ bệnh nhân.

**Luồng hoạt động:**
- Tổng hợp số ca khám theo tháng/quý, phân loại theo status
- Biểu đồ tăng trưởng bệnh nhân bằng **@ant-design/charts**
- Xem danh sách tất cả bệnh nhân đã từng khám
- Xem đánh giá (số sao + nhận xét) của bệnh nhân sau mỗi ca

**Tables liên quan:**
- `appointments` (đếm theo doctor_id + status)
- `reviews` (id, appointment_id FK, rating 1-5, comment)

---

## Phân hệ: Quản trị viên / Admin (8 chức năng)

### 1. Quản lý Người dùng & Phân quyền

**Mục đích:** Kiểm soát toàn bộ tài khoản trên hệ thống — đảm bảo tính chính trực.

**Luồng hoạt động:**
- Xem danh sách người dùng, lọc theo role (Bệnh nhân/Bác sĩ) hoặc status
- **Kích hoạt / Khóa** tài khoản → tài khoản bị khóa không thể đăng nhập
- **Reset mật khẩu** khi người dùng không thể tự khôi phục qua email
- Xem lịch sử hoạt động để phát hiện hành vi bất thường

**Tables liên quan:** `users` (status: active/locked), `roles`

**UI:** Ant Design `Table` + `Modal` cho thao tác nhanh

---

### 2. Duyệt Hồ sơ Bác sĩ

**Mục đích:** Kiểm soát chất lượng đội ngũ y tế — thẩm định trước khi bác sĩ tiếp nhận bệnh nhân.

**Luồng hoạt động:**
- Hồ sơ bác sĩ mới vào danh sách "Chờ duyệt" (`approval_status = pending`)
- Admin xem xét biography, qualifications, experience
- **Duyệt** → bác sĩ xuất hiện trên trang Tìm bác sĩ; **Từ chối** kèm lý do → gửi email thông báo
- Sau duyệt: gán bác sĩ vào chuyên khoa + bệnh viện tương ứng
- Giám sát đánh giá; xử lý vi phạm → khóa tài khoản ngay lập tức

**Tables liên quan:**
- `doctors` (approval_status: pending/approved/rejected)
- `doctor_specialties`, `doctor_hospitals` (gán sau khi duyệt)
- `reviews` (giám sát chất lượng)

---

### 3. Quản lý Bệnh viện, Phòng khám & Chuyên khoa

**Mục đích:** Duy trì Master Data — đảm bảo thông tin hiển thị cho bệnh nhân luôn chính xác.

**Luồng hoạt động:**
- CRUD bệnh viện/phòng khám: địa chỉ, SĐT cấp cứu, giờ làm việc
- CRUD chuyên khoa: tên, mô tả, gán vào bệnh viện
- Gán bác sĩ vào đúng chuyên khoa + cơ sở
- **Ẩn/Hiện** chuyên khoa/bệnh viện khi bảo trì (không xóa dữ liệu)

**Tables liên quan:**
- `hospitals` (id, name, address, phone, working_hours, status: active/hidden)
- `specialties` (id, name, description)
- `doctor_hospitals`, `doctor_specialties` (quan hệ nhiều-nhiều)

---

### 4. Quản lý Dịch vụ khám tại nhà

**Mục đích:** Mở rộng phạm vi phục vụ với các gói y tế tận nơi.

**Luồng hoạt động:**
- Tạo gói dịch vụ: tên, mô tả chi tiết, giá, thời gian thực hiện ước tính
- **Kích hoạt / Tạm dừng** dịch vụ bằng `Switch` của Ant Design
- Cập nhật linh hoạt theo chương trình ưu đãi hoặc thay đổi giá
- Liên kết với chuyên khoa tương ứng để lọc bác sĩ phù hợp

**Tables liên quan:**
- `services` (id, name, price, description, duration, status: active/inactive)

---

### 5. Quản lý Lịch hẹn toàn hệ thống

**Mục đích:** "Tháp điều khiển" — giám sát tất cả lịch hẹn, can thiệp sự cố vận hành.

**Luồng hoạt động:**
- Xem toàn bộ lịch hẹn (tất cả loại hình, tất cả bác sĩ)
- Lọc theo: status / ngày / tên bác sĩ / loại dịch vụ
- Can thiệp: hủy lịch hoặc chuyển sang bác sĩ khác cùng chuyên môn có slot trống
- Đối soát và giải quyết khiếu nại từ bệnh nhân

**Tables liên quan:**
- `appointments` (joins với `users`, `members`, `doctors`)
- `doctor_schedules` + `slots` (để Admin tìm slot trống khi điều phối)

**UI:** Ant Design `Table` với Filter + Search (hàng nghìn bản ghi)

---

### 6. Quản lý Đánh giá & Phản hồi

**Mục đích:** Kiểm soát chất lượng dịch vụ — lọc nội dung vi phạm, bảo vệ uy tín hệ thống.

**Luồng hoạt động:**
- Xem tất cả đánh giá (số sao + nhận xét) của mọi bệnh nhân
- **Ẩn / Xóa** đánh giá vi phạm tiêu chuẩn cộng đồng
- Dùng đánh giá thấp làm cơ sở nhắc nhở hoặc tạm dừng bác sĩ

**Tables liên quan:**
- `appointment_reviews` (id, appointment_id FK, user_id FK, doctor_id FK, rating 1-5, comment, status: visible/hidden)

**UI:** `Table` + `Popconfirm` xác nhận khi ẩn/xóa

---

### 7. Quản lý Thông báo hệ thống

**Mục đích:** Gửi thông báo hàng loạt đến người dùng hoặc nhóm đối tượng cụ thể.

**Luồng hoạt động:**
- Soạn thông báo: tiêu đề, nội dung, URL đính kèm
- Chọn đối tượng: `all` / `doctor` / `patient`
- Gửi ngay hoặc **lập lịch** gửi tại thời điểm cụ thể (node-cron)
- Đẩy đồng thời: FCM push + email
- Xem lịch sử thông báo đã gửi

**Tables liên quan:**
- `system_notifications` (id, title, content, target_group, scheduled_at, sent_at, status: draft/scheduled/sent)

**Services ngoài:** Firebase Server Key, Gmail SMTP

---

### 8. Thống kê & Báo cáo tổng thể

**Mục đích:** Dashboard phân tích — dữ liệu ra quyết định thay vì quản lý cảm tính.

**Luồng hoạt động:**
- Đếm người dùng mới đăng ký theo ngày/tuần/tháng
- Thống kê lịch hẹn theo loại hình (tại nhà / tại viện), tỷ lệ hoàn thành / hủy
- Bác sĩ được đặt nhiều nhất, chuyên khoa được tìm kiếm nhiều nhất
- Biểu đồ đường / cột / tròn bằng **@ant-design/charts**
- Xuất báo cáo ra **PDF hoặc Excel**

**Tables liên quan:**
- `users` (đăng ký mới)
- `appointments` (tần suất, loại dịch vụ)
- `specialties` + `doctors` (điểm sáng đội ngũ)

**Thư viện:** `@ant-design/charts` (Frontend), xlsx hoặc pdfmake (Backend)

---

## Bảng phụ thuộc công nghệ

| Công nghệ | Chức năng sử dụng |
|-----------|-------------------|
| **bcryptjs** | Mã hóa mật khẩu (BN-1) |
| **JWT** | Phiên đăng nhập (BN-1) |
| **Nodemailer / Gmail SMTP** | Quên mật khẩu, xác nhận lịch, nhắc thuốc (BN-1, BN-4, BN-5) |
| **Cloudinary** | Upload file y tế (BN-3) |
| **Firebase FCM** | Push notification (BN-4, BN-7, BS-3) |
| **node-cron** | Nhắc uống thuốc, thông báo lập lịch (BN-4, Admin-7) |
| **Gemini API** | AI Chatbot (BN-6) |
| **@ant-design/charts** | Biểu đồ thống kê (BS-5, Admin-8) |
| **Multer** | Upload file y tế phía Backend (BN-3) |
| **Zod** | Validate input tất cả API (Backend) |

---

## Quy tắc implement

1. **Chức năng phụ sau cùng:** BN-6 (AI Chatbot) chỉ implement sau khi hoàn thành BN-1 đến BN-5.
2. **Luôn notify bệnh nhân** khi bác sĩ thay đổi status lịch hẹn.
3. **Không expose** chi tiết hồ sơ bệnh nhân cho bác sĩ ngoài phạm vi ca khám liên quan (read-only, trong ca đó).
4. **approval_status** phải là pending ngay khi bác sĩ tạo tài khoản — không tự động approve.
5. **Slot locked** khi `current_patients >= max_patients` — không cần xử lý race condition phức tạp ở giai đoạn đầu.
