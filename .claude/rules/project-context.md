---
description: Tổng quan dự án, tech stack, cấu trúc trang và ERD — đọc khi cần hiểu ngữ cảnh trước khi thực hiện tính năng mới.
---

# Project Context — VitaFamily

## Tổng quan

Website đặt lịch khám và quản lý hồ sơ y tế cho thương hiệu **VitaFamily**.  
Đối tượng: bệnh nhân · bác sĩ · quản trị viên.

**Triết lý thiết kế:** Tối giản · Hiện đại · Chuyên nghiệp · Đáng tin cậy

## Tech Stack

### Frontend

| Công nghệ        | Phiên bản | Mục đích                                     |
|------------------|-----------|----------------------------------------------|
| TypeScript       | 5+        | Kiểm tra kiểu dữ liệu tĩnh                   |
| Vite             | 5+        | Build tool và máy chủ phát triển             |
| Ant Design       | 5+        | Thư viện UI chính (Icons + Charts)           |
| React Router DOM | 6+        | Quản lý điều hướng trang                     |
| Axios            | Latest    | Gọi REST API                                 |
| React Hook Form  | Latest    | Xử lý và quản lý form (nếu không dùng AntD) |
| Dayjs            | Latest    | Xử lý ngày giờ                               |

### Backend

| Công nghệ              | Phiên bản | Mục đích                                  |
|------------------------|-----------|-------------------------------------------|
| Node.js                | 20+       | Môi trường chạy mã nguồn                  |
| Express.js             | 4+        | Framework xây dựng web API                |
| TypeScript             | 5+        | Đảm bảo tính an toàn dữ liệu phía server |
| MySQL2                 | Latest    | Kết nối cơ sở dữ liệu MySQL               |
| JSON Web Token (JWT)   | Latest    | Tạo và xác thực định danh người dùng      |
| Bcryptjs               | Latest    | Mã hóa mật khẩu người dùng               |
| Nodemailer & Node-cron | Latest    | Gửi email và lập lịch nhắc nhở tự động   |
| Multer                 | Latest    | Xử lý upload tập tin y tế                |
| Zod                    | Latest    | Xác thực dữ liệu đầu vào                 |

### Database & Services

| Công nghệ / Dịch vụ | Mục đích                                             |
|---------------------|------------------------------------------------------|
| MySQL 8.0+          | Lưu trữ toàn bộ dữ liệu hệ thống                   |
| phpMyAdmin          | Quản trị database qua web                           |
| Gemini API          | AI Chatbot tư vấn sức khỏe                          |
| Cloudinary          | Lưu trữ hình ảnh và file PDF đơn thuốc              |
| Firebase FCM        | Push Notification trên trình duyệt                  |
| Gmail SMTP          | Gửi email qua Nodemailer                            |
| Git & GitHub        | Quản lý phiên bản                                   |
| Postman             | Kiểm tra API                                        |
| Laragon             | Môi trường phát triển local (MySQL + Node.js)       |

## Phân quyền (Roles)

| Role    | Mô tả              |
|---------|--------------------|
| `user`  | Bệnh nhân/client   |
| `doctor`| Bác sĩ             |
| `admin` | Quản trị viên      |

## Cấu trúc trang

```
/                   → Trang chủ
/about              → Giới thiệu VitaFamily
/services           → Danh mục dịch vụ & chuyên khoa
/services/[slug]    → Chi tiết dịch vụ
/doctors            → Đội ngũ bác sĩ
/news               → Tin tức & bài viết sức khỏe
/news/[slug]        → Chi tiết bài viết
/contact            → Liên hệ, địa chỉ, form đặt lịch
```

## Các Section trang chủ

| STT | Section                | Mô tả                                                              |
|-----|------------------------|--------------------------------------------------------------------|
| 1   | Header / Navbar        | Logo trái, nav giữa, CTA phải. Sticky + shadow khi scroll.        |
| 2   | Hero Banner            | Slider full-width, tiêu đề + mô tả + 2 nút CTA. Overlay xanh.    |
| 3   | Specialty Finder       | Card grid chuyên khoa — icon + tên.                               |
| 4   | About Preview          | 2 cột: text trái (tiêu đề, mô tả, số liệu), ảnh phải.            |
| 5   | Services Highlight     | Hàng card ngang: icon + tên dịch vụ + mô tả ngắn.                |
| 6   | Key Stats / Milestones | Số liệu nổi bật: năm thành lập, bệnh nhân, bác sĩ.               |
| 7   | News & Events          | Grid 3 cột: thumbnail + tag + ngày + tiêu đề.                    |
| 8   | Appointment CTA Banner | Nền xanh full-width, tiêu đề kêu gọi + nút đặt lịch.             |
| 9   | Footer                 | Logo, nav, liên hệ, mạng xã hội, bản quyền.                      |

## Sơ đồ ERD (tóm tắt)

```
users (id, role_id, email, password, full_name, phone, avatar, status)
  └── families (id, user_id, family_name)
        └── members (id, family_id, full_name, dob, gender, blood_type, allergy, medical_history)

doctors (id, user_id, qualifications, experience, bio)
  ├── doctor_specialties (doctor_id, specialty_id)
  ├── doctor_hospitals   (doctor_id, hospital_id)
  └── doctor_schedules   (id, doctor_id, date, start_time, end_time, max_patients)

appointments (id, member_id, doctor_id, hospital_id, schedule_id, type, date, time, status, reason)
  └── appointment_reviews (id, appointment_id, rating, comment)
  └── medical_records     (id, appointment_id, diagnosis, notes, date)
        ├── medical_files       (id, medical_record_id, file_url, file_type)
        └── prescriptions       (id, medical_record_id, notes)
              └── prescription_items (id, prescription_id, medicine_name, dosage, frequency)
                    └── reminders  (id, prescription_item_id, remind_time, status)

notifications (id, user_id, title, content, type, is_read)
chat_sessions & chat_messages (lịch sử AI Chatbot Gemini)
```

## Nội dung & Giọng văn

| Yếu tố    | Quy định                                                   |
|-----------|------------------------------------------------------------|
| Ngôn ngữ  | Tiếng Việt là chính, hỗ trợ tiếng Anh (tùy chọn)          |
| Giọng văn | Ấm áp, đáng tin, chuyên nghiệp — không lạnh lùng, máy móc |
| Văn phong | Rõ ràng, súc tích, lấy bệnh nhân làm trung tâm            |
| Tránh     | Thuật ngữ y khoa khó hiểu, văn phong hành chính cứng nhắc |

## Giá trị thương hiệu

| Giá trị     | Thể hiện qua                                        |
|-------------|-----------------------------------------------------|
| Tin tưởng   | Chứng chỉ chuyên môn, hồ sơ bác sĩ thực            |
| Chăm sóc    | Ngôn ngữ và hình ảnh lấy bệnh nhân làm trung tâm   |
| Đổi mới     | Cơ sở vật chất hiện đại, kỹ thuật tiên tiến        |
| Dễ tiếp cận | Điều hướng dễ dàng, đường dẫn liên hệ rõ ràng      |
| Cộng đồng   | Chăm sóc sức khỏe địa phương cho gia đình Việt Nam |
