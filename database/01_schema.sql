-- ================================================================
--  VitaFamily — Database Schema
--  Phiên bản : 3.0
--  Mô tả     : Schema hoàn chỉnh cho hệ thống đặt lịch khám
--               và quản lý hồ sơ y tế VitaFamily
--  Changelog : v3.0 — Thêm Payment Module (4 bảng mới):
--               payments, refunds, payouts, payment_settings.
--               Cải tiến: users (+dob, +address), hospitals (+city,
--               +email, +description, +image_url, +bank info),
--               doctors (+consultation_fee), doctor_schedules
--               (+hospital_id), appointments (+payment_status,
--               +payment_id), notifications (+type payment),
--               chat_sessions (+title).
--  Tổng bảng : 30 bảng
--  Tác giả   : VitaFamily Dev Team
-- ================================================================

SET NAMES utf8mb4;
SET time_zone           = '+07:00';
SET foreign_key_checks  = 0;
SET sql_mode            = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE DATABASE IF NOT EXISTS vitafamily
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vitafamily;


-- ================================================================
--  1. BẢNG NGƯỜI DÙNG  (users)
--     Lưu toàn bộ tài khoản: bệnh nhân, bác sĩ và quản trị viên.
-- ================================================================
CREATE TABLE IF NOT EXISTS users (
  id         INT UNSIGNED     NOT NULL AUTO_INCREMENT         COMMENT 'Khóa chính tự tăng',
  email      VARCHAR(150)     NOT NULL                        COMMENT 'Email đăng nhập — duy nhất toàn hệ thống',
  password   VARCHAR(255)     NOT NULL                        COMMENT 'Mật khẩu đã mã hóa bằng bcryptjs (cost=10)',
  full_name  VARCHAR(100)     NOT NULL                        COMMENT 'Họ và tên đầy đủ',
  phone      VARCHAR(15)          NULL DEFAULT NULL           COMMENT 'Số điện thoại liên hệ (10–11 chữ số)',
  avatar     VARCHAR(500)         NULL DEFAULT NULL           COMMENT 'URL ảnh đại diện — lưu trên Cloudinary',
  dob        DATE                 NULL DEFAULT NULL           COMMENT 'Ngày sinh — dùng cho cá nhân hóa và thống kê độ tuổi',
  address    VARCHAR(300)         NULL DEFAULT NULL           COMMENT 'Địa chỉ nhà đầy đủ — dùng cho dịch vụ bác sĩ đến tận nhà',
  role       ENUM(
               'user',    -- Bệnh nhân / khách hàng
               'doctor',  -- Bác sĩ
               'admin'    -- Quản trị viên
             ) NOT NULL DEFAULT 'user'                        COMMENT 'Vai trò trong hệ thống',
  status     ENUM(
               'active',  -- Tài khoản đang hoạt động bình thường
               'locked'   -- Tài khoản bị Admin khóa
             ) NOT NULL DEFAULT 'active'                      COMMENT 'Trạng thái tài khoản',
  created_at DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP                         COMMENT 'Thời điểm đăng ký tài khoản',
  updated_at DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Lần cập nhật hồ sơ cuối',
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  INDEX      idx_users_role   (role),
  INDEX      idx_users_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Tài khoản người dùng — bệnh nhân, bác sĩ và quản trị viên';


-- ================================================================
--  2. BẢNG NHÓM GIA ĐÌNH  (families)
--     Mỗi tài khoản bệnh nhân có đúng 1 nhóm gia đình.
-- ================================================================
CREATE TABLE IF NOT EXISTS families (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT             COMMENT 'Khóa chính tự tăng',
  user_id     INT UNSIGNED NOT NULL                           COMMENT 'Chủ tài khoản sở hữu nhóm — 1 user chỉ có 1 nhóm',
  family_name VARCHAR(100) NOT NULL                           COMMENT 'Tên nhóm gia đình (VD: Gia đình Nguyễn)',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ngày tạo nhóm',
  PRIMARY KEY (id),
  UNIQUE KEY uq_family_user (user_id),
  CONSTRAINT fk_family_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Nhóm gia đình — mỗi tài khoản bệnh nhân có đúng 1 nhóm, chứa nhiều thành viên';


-- ================================================================
--  3. BẢNG THÀNH VIÊN GIA ĐÌNH  (members)
--     Mỗi thành viên có hồ sơ sức khỏe độc lập.
-- ================================================================
CREATE TABLE IF NOT EXISTS members (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  family_id       INT UNSIGNED NOT NULL                            COMMENT 'Nhóm gia đình chứa thành viên này',
  full_name       VARCHAR(100) NOT NULL                            COMMENT 'Họ và tên đầy đủ của thành viên',
  dob             DATE         NOT NULL                            COMMENT 'Ngày sinh (định dạng YYYY-MM-DD)',
  gender          ENUM(
                    'male',    -- Nam
                    'female',  -- Nữ
                    'other'    -- Khác
                  ) NOT NULL                                       COMMENT 'Giới tính',
  blood_type      VARCHAR(5)       NULL DEFAULT NULL               COMMENT 'Nhóm máu gồm cả Rh factor (A+, A−, B+, B−, AB+, AB−, O+, O−)',
  allergy         TEXT             NULL                            COMMENT 'Tiền sử dị ứng: thuốc, thực phẩm, hóa chất, v.v.',
  medical_history TEXT             NULL                            COMMENT 'Tiền sử bệnh mãn tính (tăng huyết áp, tiểu đường, ...)',
  relationship    VARCHAR(50)  NOT NULL                            COMMENT 'Quan hệ với chủ tài khoản (Bản thân, Vợ/Chồng, Con, Bố, Mẹ, Anh/Chị/Em, ...)',
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT 'Ngày thêm thành viên',
  updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Lần cập nhật hồ sơ cuối',
  PRIMARY KEY (id),
  INDEX idx_members_family (family_id),
  CONSTRAINT fk_member_family
    FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Thành viên trong nhóm gia đình — mỗi người có hồ sơ y tế riêng biệt';


-- ================================================================
--  4. BẢNG CHUYÊN KHOA  (specialties)
--     Danh mục chuyên khoa y tế — dùng để lọc bác sĩ & dịch vụ.
-- ================================================================
CREATE TABLE IF NOT EXISTS specialties (
  id              INT UNSIGNED      NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  name            VARCHAR(100)      NOT NULL                             COMMENT 'Tên chuyên khoa (VD: Tim mạch, Nhi khoa)',
  slug            VARCHAR(120)      NOT NULL                             COMMENT 'Đường dẫn thân thiện URL (VD: tim-mach) — dùng cho /services?cat=slug',
  icon            VARCHAR(80)       NOT NULL                             COMMENT 'Tên icon Ant Design (VD: HeartOutlined) — render trực tiếp bằng JavaScript',
  `group`         ENUM(
                    'internal',  -- Nội khoa
                    'surgical',  -- Ngoại khoa
                    'support'    -- Hỗ trợ / Cận lâm sàng
                  ) NOT NULL                                             COMMENT 'Phân nhóm chuyên khoa để gom nhóm trên giao diện',
  group_label     VARCHAR(60)       NOT NULL                             COMMENT 'Nhãn hiển thị của nhóm (VD: Nội khoa, Ngoại khoa)',
  description     TEXT                  NULL                             COMMENT 'Mô tả ngắn về chuyên khoa — hiển thị trang chi tiết',
  common_diseases JSON                  NULL                             COMMENT 'Mảng JSON các bệnh thường gặp (VD: ["Tăng huyết áp","Đau thắt ngực"])',
  staff_types     JSON                  NULL                             COMMENT 'Mảng JSON loại nhân viên y tế trong khoa (VD: ["Bác sĩ nội khoa","Điều dưỡng"])',
  doctor_count    SMALLINT UNSIGNED     NOT NULL DEFAULT 0               COMMENT 'Số bác sĩ đang hoạt động — cập nhật khi thêm/xóa bác sĩ',
  is_active       TINYINT(1)        NOT NULL DEFAULT 1                   COMMENT 'Trạng thái hiển thị: 1 = đang hoạt động, 0 = tạm ẩn',
  sort_order      SMALLINT UNSIGNED     NOT NULL DEFAULT 0               COMMENT 'Thứ tự hiển thị trên trang chủ (số nhỏ hiển thị trước)',
  created_at      DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT 'Ngày tạo chuyên khoa',
  PRIMARY KEY (id),
  UNIQUE KEY uq_specialty_slug (slug),
  INDEX idx_specialty_group    (`group`),
  INDEX idx_specialty_active   (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Danh mục chuyên khoa y tế — dùng để lọc bác sĩ, dịch vụ và điều hướng URL';


-- ================================================================
--  5. BẢNG BỆNH VIỆN / PHÒNG KHÁM  (hospitals)
--     Cơ sở y tế thuộc hệ thống VitaFamily.
--  v3.0: +city, +email, +description, +image_url, +bank_account, +bank_name
-- ================================================================
CREATE TABLE IF NOT EXISTS hospitals (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  name          VARCHAR(150) NOT NULL                             COMMENT 'Tên bệnh viện hoặc phòng khám',
  address       VARCHAR(300) NOT NULL                             COMMENT 'Địa chỉ đầy đủ (số nhà, đường, quận, thành phố)',
  city          VARCHAR(100) NOT NULL DEFAULT 'TP. Hồ Chí Minh'  COMMENT 'Thành phố — dùng cho bộ lọc tìm cơ sở theo khu vực',
  phone         VARCHAR(20)  NOT NULL                             COMMENT 'Số điện thoại liên hệ / đường dây nóng',
  email         VARCHAR(150)     NULL DEFAULT NULL                COMMENT 'Email liên hệ chính thức của cơ sở y tế',
  working_hours VARCHAR(100)     NULL DEFAULT NULL                COMMENT 'Giờ làm việc (VD: Thứ 2–7: 07:00–17:00; CN: 07:00–12:00)',
  description   TEXT             NULL                             COMMENT 'Giới thiệu tổng quan về cơ sở (lịch sử, chuyên môn nổi bật)',
  image_url     VARCHAR(500)     NULL DEFAULT NULL                COMMENT 'URL ảnh đại diện / logo cơ sở — lưu trên Cloudinary',
  bank_account  VARCHAR(50)      NULL DEFAULT NULL                COMMENT 'Số tài khoản ngân hàng — Admin dùng khi tạo lệnh payout',
  bank_name     VARCHAR(100)     NULL DEFAULT NULL                COMMENT 'Tên ngân hàng nhận payout (VD: Vietcombank, BIDV, Techcombank)',
  is_active     TINYINT(1)   NOT NULL DEFAULT 1                   COMMENT 'Trạng thái cơ sở: 1 = đang hoạt động, 0 = tạm đóng/bảo trì',
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT 'Ngày thêm cơ sở vào hệ thống',
  PRIMARY KEY (id),
  INDEX idx_hospital_active (is_active),
  INDEX idx_hospital_city   (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Cơ sở y tế — bệnh viện và phòng khám thuộc hệ thống VitaFamily';


-- ================================================================
--  6. BẢNG BÁC SĨ  (doctors)
--     Hồ sơ chuyên môn đầy đủ — phải được Admin duyệt mới hiển thị.
--  v3.0: +consultation_fee (giá khám — bắt buộc cho payment module)
-- ================================================================
CREATE TABLE IF NOT EXISTS doctors (
  id                INT UNSIGNED     NOT NULL AUTO_INCREMENT                          COMMENT 'Khóa chính tự tăng',
  user_id           INT UNSIGNED     NOT NULL                                         COMMENT 'Tài khoản đăng nhập của bác sĩ — liên kết bảng users',
  full_name         VARCHAR(100)     NOT NULL                                         COMMENT 'Họ tên đầy đủ kèm học hàm/học vị (VD: PGS.TS.BS. Nguyễn Văn A)',
  slug              VARCHAR(120)     NOT NULL                                         COMMENT 'Đường dẫn URL hồ sơ bác sĩ (VD: nguyen-van-a) — dùng cho /doctors/:slug',
  qualifications    VARCHAR(200)         NULL DEFAULT NULL                            COMMENT 'Học hàm/học vị rút gọn (VD: Phó Giáo sư, Tiến sĩ Y khoa)',
  bio               TEXT                 NULL                                         COMMENT 'Tiểu sử và thế mạnh chuyên môn nổi bật — hiển thị trang hồ sơ',
  sub_specialty     VARCHAR(150)         NULL DEFAULT NULL                            COMMENT 'Lĩnh vực chuyên sâu hẹp trong chuyên khoa (VD: Tim mạch can thiệp)',
  experience        TINYINT UNSIGNED     NOT NULL DEFAULT 0                           COMMENT 'Số năm kinh nghiệm hành nghề',
  consultation_fee  DECIMAL(10,2)        NOT NULL DEFAULT 200000                      COMMENT 'Giá khám mỗi lượt (VND) — backend đọc khi tạo payment record lúc đặt lịch',
  rating            DECIMAL(2,1)         NOT NULL DEFAULT 5.0                         COMMENT 'Điểm đánh giá trung bình (1.0 – 5.0) — tính từ appointment_reviews',
  review_count      INT UNSIGNED         NOT NULL DEFAULT 0                           COMMENT 'Tổng số lượt đánh giá đã nhận',
  avatar            VARCHAR(500)             NULL DEFAULT NULL                        COMMENT 'URL ảnh đại diện chuyên nghiệp — lưu trên Cloudinary',
  languages         JSON                     NULL                                     COMMENT 'Ngôn ngữ giao tiếp — mảng JSON (VD: ["Tiếng Việt","Tiếng Anh"])',
  education         JSON                     NULL                                     COMMENT 'Lịch sử học vấn — mảng JSON [{period, description}]',
  certifications    JSON                     NULL                                     COMMENT 'Bằng cấp và chứng chỉ chuyên môn — mảng JSON [{period, description}]',
  work_experience   JSON                     NULL                                     COMMENT 'Kinh nghiệm làm việc — mảng JSON [{period, description}]',
  memberships       JSON                     NULL                                     COMMENT 'Hội viên tổ chức y khoa quốc tế/trong nước — mảng JSON chuỗi',
  special_interests JSON                     NULL                                     COMMENT 'Lĩnh vực chuyên sâu & quan tâm đặc biệt — mảng JSON chuỗi',
  approval_status   ENUM(
                      'pending',   -- Hồ sơ vừa tạo, chờ Admin xem xét
                      'approved',  -- Đã được Admin duyệt, hiển thị trên trang Tìm bác sĩ
                      'rejected'   -- Admin từ chối kèm lý do
                    ) NOT NULL DEFAULT 'pending'                                      COMMENT 'Trạng thái duyệt hồ sơ bác sĩ — chỉ approved mới hiển thị công khai',
  created_at        DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP               COMMENT 'Ngày tạo hồ sơ',
  updated_at        DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Lần cập nhật hồ sơ cuối',
  PRIMARY KEY (id),
  UNIQUE KEY uq_doctor_user (user_id),
  UNIQUE KEY uq_doctor_slug (slug),
  INDEX idx_doctor_approval (approval_status),
  CONSTRAINT fk_doctor_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Hồ sơ bác sĩ — thông tin chuyên môn, học vấn, kinh nghiệm; cần Admin duyệt trước khi hiển thị';


-- ================================================================
--  7. BẢNG LIÊN KẾT BÁC SĨ ↔ CHUYÊN KHOA  (doctor_specialties)
--     Quan hệ nhiều-nhiều.
-- ================================================================
CREATE TABLE IF NOT EXISTS doctor_specialties (
  doctor_id    INT UNSIGNED NOT NULL COMMENT 'Mã bác sĩ',
  specialty_id INT UNSIGNED NOT NULL COMMENT 'Mã chuyên khoa',
  is_primary   TINYINT(1)   NOT NULL DEFAULT 1 COMMENT 'Chuyên khoa chính hay phụ: 1 = chính, 0 = kiêm nhiệm',
  PRIMARY KEY (doctor_id, specialty_id),
  CONSTRAINT fk_ds_doctor
    FOREIGN KEY (doctor_id)    REFERENCES doctors(id)    ON DELETE CASCADE,
  CONSTRAINT fk_ds_specialty
    FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Quan hệ nhiều-nhiều: một bác sĩ có thể thuộc nhiều chuyên khoa';


-- ================================================================
--  8. BẢNG LIÊN KẾT BÁC SĨ ↔ BỆNH VIỆN  (doctor_hospitals)
--     Quan hệ nhiều-nhiều.
-- ================================================================
CREATE TABLE IF NOT EXISTS doctor_hospitals (
  doctor_id   INT UNSIGNED NOT NULL COMMENT 'Mã bác sĩ',
  hospital_id INT UNSIGNED NOT NULL COMMENT 'Mã bệnh viện / phòng khám',
  PRIMARY KEY (doctor_id, hospital_id),
  CONSTRAINT fk_dh_doctor
    FOREIGN KEY (doctor_id)   REFERENCES doctors(id)   ON DELETE CASCADE,
  CONSTRAINT fk_dh_hospital
    FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Quan hệ nhiều-nhiều: một bác sĩ có thể làm việc tại nhiều cơ sở';


-- ================================================================
--  9. BẢNG DỊCH VỤ TRANG CHỦ  (services)
--     Hiển thị tóm tắt trên section "Dịch vụ" của trang chủ.
-- ================================================================
CREATE TABLE IF NOT EXISTS services (
  id         INT UNSIGNED      NOT NULL AUTO_INCREMENT           COMMENT 'Khóa chính tự tăng',
  name       VARCHAR(100)      NOT NULL                          COMMENT 'Tên dịch vụ ngắn gọn hiển thị trên card',
  icon       VARCHAR(80)       NOT NULL                          COMMENT 'Tên icon Ant Design (VD: MedicineBoxOutlined)',
  description TEXT                  NULL                         COMMENT 'Mô tả 1–2 câu về dịch vụ',
  slug       VARCHAR(120)      NOT NULL                          COMMENT 'Đường dẫn thân thiện URL',
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0                COMMENT 'Thứ tự sắp xếp trên trang chủ (số nhỏ hiển thị trước)',
  is_active  TINYINT(1)        NOT NULL DEFAULT 1                COMMENT 'Trạng thái: 1 = hiển thị, 0 = ẩn',
  PRIMARY KEY (id),
  UNIQUE KEY uq_service_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Dịch vụ tóm tắt hiển thị trên trang chủ (icon + tên + mô tả ngắn 1–2 câu)';


-- ================================================================
--  10. BẢNG GÓI DỊCH VỤ CHI TIẾT  (service_packages)
--      Hiển thị đầy đủ trên trang /services với filter danh mục.
-- ================================================================
CREATE TABLE IF NOT EXISTS service_packages (
  id              INT UNSIGNED      NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  name            VARCHAR(150)      NOT NULL                             COMMENT 'Tên gói dịch vụ đầy đủ (VD: Gói Khám Tim Mạch Chuyên Sâu)',
  category        VARCHAR(100)      NOT NULL                             COMMENT 'Danh mục gói (VD: Khám Chuyên Khoa, Gói Khám Tổng Quát, Xét Nghiệm & Chẩn Đoán)',
  slug            VARCHAR(150)      NOT NULL                             COMMENT 'Đường dẫn URL của gói dịch vụ',
  image           VARCHAR(500)          NULL DEFAULT NULL                COMMENT 'URL ảnh minh họa gói dịch vụ — lưu trên Cloudinary hoặc Unsplash',
  description     TEXT                  NULL                             COMMENT 'Mô tả chi tiết nội dung và điểm nổi bật của gói',
  features        JSON                  NULL                             COMMENT 'Mảng JSON các tính năng / hạng mục trong gói (VD: ["Siêu âm tim","Holter ECG 24h"])',
  target_audience VARCHAR(200)          NULL DEFAULT NULL                COMMENT 'Đối tượng phù hợp (VD: Người trên 40 tuổi, có tiền sử bệnh tim)',
  is_active       TINYINT(1)        NOT NULL DEFAULT 1                   COMMENT 'Trạng thái: 1 = đang bán, 0 = tạm ngưng',
  sort_order      SMALLINT UNSIGNED NOT NULL DEFAULT 0                   COMMENT 'Thứ tự trong danh mục (số nhỏ hiển thị trước)',
  created_at      DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT 'Ngày tạo gói dịch vụ',
  PRIMARY KEY (id),
  UNIQUE KEY uq_pkg_slug (slug),
  INDEX idx_pkg_category (category),
  INDEX idx_pkg_active   (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Gói dịch vụ y tế chi tiết — hiển thị trang /services với card đầy đủ tính năng và đối tượng';


-- ================================================================
--  11. BẢNG LỊCH LÀM VIỆC BÁC SĨ  (doctor_schedules)
--      Mỗi bản ghi là một ngày làm việc của một bác sĩ tại một cơ sở.
--  v3.0: +hospital_id — fix trường hợp bác sĩ làm 2 cơ sở cùng ngày
-- ================================================================
CREATE TABLE IF NOT EXISTS doctor_schedules (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  doctor_id   INT UNSIGNED NOT NULL                             COMMENT 'Bác sĩ sở hữu lịch làm việc này',
  hospital_id INT UNSIGNED NOT NULL                             COMMENT 'Cơ sở y tế bác sĩ làm việc ngày hôm đó — cần thiết khi bác sĩ làm nhiều nơi',
  date        DATE         NOT NULL                             COMMENT 'Ngày làm việc cụ thể',
  is_off      TINYINT(1)   NOT NULL DEFAULT 0                   COMMENT 'Đánh dấu ngày nghỉ đột xuất: 1 = nghỉ, 0 = làm việc bình thường',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT 'Ngày tạo lịch',
  PRIMARY KEY (id),
  UNIQUE KEY uq_schedule_doctor_hospital_date (doctor_id, hospital_id, date),
  INDEX idx_schedule_hospital (hospital_id),
  CONSTRAINT fk_schedule_doctor
    FOREIGN KEY (doctor_id)   REFERENCES doctors(id)   ON DELETE CASCADE,
  CONSTRAINT fk_schedule_hospital
    FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Lịch làm việc theo ngày tại từng cơ sở — 1 bác sĩ có thể có nhiều lịch cùng ngày ở các cơ sở khác nhau';


-- ================================================================
--  12. BẢNG KHUNG GIỜ KHÁM  (slots)
--      Khung giờ trong ngày — chỉ cho đặt khi còn chỗ.
-- ================================================================
CREATE TABLE IF NOT EXISTS slots (
  id               INT UNSIGNED     NOT NULL AUTO_INCREMENT  COMMENT 'Khóa chính tự tăng',
  schedule_id      INT UNSIGNED     NOT NULL                 COMMENT 'Lịch làm việc (ngày) chứa khung giờ này',
  start_time       TIME             NOT NULL                 COMMENT 'Giờ bắt đầu nhận bệnh (VD: 08:00:00)',
  end_time         TIME             NOT NULL                 COMMENT 'Giờ kết thúc nhận bệnh (VD: 08:30:00)',
  max_patients     TINYINT UNSIGNED NOT NULL DEFAULT 1       COMMENT 'Số bệnh nhân tối đa được đặt trong khung giờ này',
  current_patients TINYINT UNSIGNED NOT NULL DEFAULT 0       COMMENT 'Số bệnh nhân đã đặt — khi = max_patients thì slot bị khóa tự động',
  is_locked        TINYINT(1)       NOT NULL DEFAULT 0       COMMENT 'Khóa thủ công bởi bác sĩ/Admin: 1 = không nhận bệnh, 0 = mở',
  PRIMARY KEY (id),
  INDEX idx_slot_schedule (schedule_id),
  CONSTRAINT fk_slot_schedule
    FOREIGN KEY (schedule_id) REFERENCES doctor_schedules(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Khung giờ khám trong ngày — hệ thống kiểm tra current_patients < max_patients trước khi cho đặt';


-- ================================================================
--  13. BẢNG LỊCH HẸN  (appointments)
--      Trung tâm của toàn bộ luồng đặt lịch khám.
--  v3.0: +payment_status, +payment_id (payment module)
-- ================================================================
CREATE TABLE IF NOT EXISTS appointments (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT                          COMMENT 'Khóa chính tự tăng',
  user_id          INT UNSIGNED NOT NULL                                         COMMENT 'Tài khoản thực hiện đặt lịch (chủ nhóm gia đình)',
  member_id        INT UNSIGNED     NULL DEFAULT NULL                            COMMENT 'Thành viên gia đình đi khám — NULL nếu là khách vãng lai',
  doctor_id        INT UNSIGNED NOT NULL                                         COMMENT 'Bác sĩ được đặt lịch',
  hospital_id      INT UNSIGNED NOT NULL                                         COMMENT 'Cơ sở y tế thực hiện khám',
  slot_id          INT UNSIGNED     NULL DEFAULT NULL                            COMMENT 'Khung giờ đã đặt — NULL khi chưa xác nhận slot cụ thể',
  appointment_type ENUM(
                     'clinic',  -- Khám tại cơ sở y tế
                     'home',    -- Bác sĩ đến tại nhà
                     'video'    -- Tư vấn qua video call
                   ) NOT NULL DEFAULT 'clinic'                                   COMMENT 'Hình thức khám',
  appointment_date DATE         NOT NULL                                         COMMENT 'Ngày khám theo lịch',
  reason           TEXT             NULL                                         COMMENT 'Lý do khám / triệu chứng bệnh nhân mô tả khi đặt',
  status           ENUM(
                     'pending',    -- Vừa đặt, chờ bác sĩ xác nhận
                     'confirmed',  -- Bác sĩ đã xác nhận
                     'completed',  -- Đã khám xong
                     'cancelled'   -- Bị hủy (bệnh nhân hoặc bác sĩ)
                   ) NOT NULL DEFAULT 'pending'                                  COMMENT 'Trạng thái hiện tại của lịch hẹn',
  payment_status   ENUM(
                     'unpaid',    -- Chưa thanh toán (mặc định khi đặt lịch)
                     'paid',      -- Đã thanh toán thành công qua mock gateway
                     'refunded'   -- Đã hoàn tiền sau khi huỷ lịch
                   ) NOT NULL DEFAULT 'unpaid'                                   COMMENT 'Trạng thái thanh toán — đồng bộ với bảng payments',
  payment_id       INT UNSIGNED     NULL DEFAULT NULL                            COMMENT 'ID giao dịch thanh toán tương ứng — điền sau khi payment record được tạo',
  reason_cancel    TEXT             NULL                                         COMMENT 'Lý do hủy lịch — bắt buộc điền khi status = cancelled',
  guest_name       VARCHAR(100)     NULL DEFAULT NULL                            COMMENT 'Tên khách vãng lai — bắt buộc điền khi member_id = NULL',
  guest_phone      VARCHAR(15)      NULL DEFAULT NULL                            COMMENT 'SĐT khách vãng lai — bắt buộc điền khi member_id = NULL',
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP               COMMENT 'Thời điểm đặt lịch',
  updated_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Lần cập nhật trạng thái cuối',
  PRIMARY KEY (id),
  INDEX idx_appt_user           (user_id),
  INDEX idx_appt_doctor         (doctor_id),
  INDEX idx_appt_status         (status),
  INDEX idx_appt_payment_status (payment_status),
  INDEX idx_appt_date           (appointment_date),
  CONSTRAINT fk_appt_user
    FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
  CONSTRAINT fk_appt_member
    FOREIGN KEY (member_id)   REFERENCES members(id)   ON DELETE SET NULL,
  CONSTRAINT fk_appt_doctor
    FOREIGN KEY (doctor_id)   REFERENCES doctors(id)   ON DELETE RESTRICT,
  CONSTRAINT fk_appt_hospital
    FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE RESTRICT,
  CONSTRAINT fk_appt_slot
    FOREIGN KEY (slot_id)     REFERENCES slots(id)     ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Lịch hẹn khám — trung tâm của toàn bộ luồng: đặt → xác nhận → khám → hoàn thành';


-- ================================================================
--  14. BẢNG KẾT QUẢ KHÁM  (examination_results)
--      Bác sĩ điền sau khi hoàn thành buổi khám.
-- ================================================================
CREATE TABLE IF NOT EXISTS examination_results (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  appointment_id INT UNSIGNED NOT NULL                             COMMENT 'Lịch hẹn tương ứng — 1 lịch hẹn có tối đa 1 kết quả',
  diagnosis      TEXT             NULL                             COMMENT 'Chẩn đoán bệnh lý chính sau thăm khám',
  notes          TEXT             NULL                             COMMENT 'Ghi chú lâm sàng, quan sát của bác sĩ',
  treatment_plan TEXT             NULL                             COMMENT 'Phác đồ điều trị đề xuất',
  follow_up_date DATE             NULL DEFAULT NULL                COMMENT 'Ngày tái khám được hẹn (nếu cần)',
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT 'Ngày bác sĩ hoàn thành và lưu kết quả khám',
  PRIMARY KEY (id),
  UNIQUE KEY uq_exam_appointment (appointment_id),
  CONSTRAINT fk_exam_appointment
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Kết quả sau buổi khám — chẩn đoán, ghi chú và phác đồ điều trị của bác sĩ';


-- ================================================================
--  15. BẢNG HỒ SƠ KHÁM BỆNH  (medical_records)
--      Nhật ký sức khỏe theo dòng thời gian của từng thành viên.
-- ================================================================
CREATE TABLE IF NOT EXISTS medical_records (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT               COMMENT 'Khóa chính tự tăng',
  member_id      INT UNSIGNED NOT NULL                              COMMENT 'Thành viên gia đình sở hữu hồ sơ này',
  appointment_id INT UNSIGNED     NULL DEFAULT NULL                 COMMENT 'Lịch hẹn gốc sinh ra hồ sơ — NULL nếu nhập tay sau lần khám bên ngoài',
  visit_date     DATE         NOT NULL                              COMMENT 'Ngày khám thực tế',
  hospital_name  VARCHAR(150) NOT NULL                              COMMENT 'Tên bệnh viện / phòng khám đã đến',
  doctor_name    VARCHAR(100)     NULL DEFAULT NULL                 COMMENT 'Tên bác sĩ trực tiếp điều trị',
  reason         TEXT             NULL                              COMMENT 'Lý do / triệu chứng khi đến khám',
  diagnosis      TEXT             NULL                              COMMENT 'Kết quả chẩn đoán',
  notes          TEXT             NULL                              COMMENT 'Ghi chú bổ sung của bác sĩ hoặc bệnh nhân tự thêm',
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP    COMMENT 'Ngày tạo hồ sơ trong hệ thống',
  PRIMARY KEY (id),
  INDEX idx_record_member      (member_id),
  INDEX idx_record_appointment (appointment_id),
  CONSTRAINT fk_record_member
    FOREIGN KEY (member_id)      REFERENCES members(id)      ON DELETE CASCADE,
  CONSTRAINT fk_record_appointment
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Hồ sơ khám bệnh — nhật ký sức khỏe cá nhân hóa, hiển thị theo dòng thời gian';


-- ================================================================
--  16. BẢNG FILE Y TẾ  (medical_files)
--      Kết quả xét nghiệm, đơn thuốc, phim chụp đính kèm hồ sơ.
-- ================================================================
CREATE TABLE IF NOT EXISTS medical_files (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  medical_record_id INT UNSIGNED NOT NULL                             COMMENT 'Hồ sơ khám đính kèm file này',
  file_url          VARCHAR(500) NOT NULL                             COMMENT 'URL truy cập file đã upload — lưu trên Cloudinary',
  file_type         ENUM(
                      'image',  -- Ảnh chụp (JPEG, PNG) — kết quả xét nghiệm, phim X-quang
                      'pdf'     -- Tài liệu PDF — đơn thuốc, bệnh án in
                    ) NOT NULL                                        COMMENT 'Loại file đính kèm',
  file_name         VARCHAR(200) NOT NULL                             COMMENT 'Tên file gốc do người dùng upload',
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT 'Ngày upload file',
  PRIMARY KEY (id),
  INDEX idx_file_record (medical_record_id),
  CONSTRAINT fk_file_record
    FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='File y tế đính kèm hồ sơ — kết quả xét nghiệm, phim chụp, đơn thuốc lưu trên Cloudinary';


-- ================================================================
--  17. BẢNG ĐƠN THUỐC  (prescriptions)
--      Đơn thuốc liên kết hồ sơ khám — nguồn tạo nhắc uống thuốc.
-- ================================================================
CREATE TABLE IF NOT EXISTS prescriptions (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  medical_record_id INT UNSIGNED NOT NULL                             COMMENT 'Hồ sơ khám kèm đơn thuốc này',
  doctor_id         INT UNSIGNED     NULL DEFAULT NULL                COMMENT 'Bác sĩ kê đơn — NULL nếu nhập tay không qua bác sĩ trong hệ thống',
  notes             TEXT             NULL                             COMMENT 'Ghi chú chung của đơn: dặn dò ăn uống, chế độ sinh hoạt, ...',
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT 'Ngày kê đơn',
  PRIMARY KEY (id),
  INDEX idx_presc_record (medical_record_id),
  CONSTRAINT fk_presc_record
    FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE,
  CONSTRAINT fk_presc_doctor
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Đơn thuốc — liên kết hồ sơ khám, là nguồn dữ liệu tạo chuỗi nhắc uống thuốc tự động';


-- ================================================================
--  18. BẢNG CHI TIẾT ĐƠN THUỐC  (prescription_items)
--      Mỗi dòng là một loại thuốc trong đơn.
-- ================================================================
CREATE TABLE IF NOT EXISTS prescription_items (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT           COMMENT 'Khóa chính tự tăng',
  prescription_id INT UNSIGNED NOT NULL                          COMMENT 'Đơn thuốc chứa dòng thuốc này',
  medicine_name   VARCHAR(200) NOT NULL                          COMMENT 'Tên thuốc — tên thương mại hoặc tên gốc (generic)',
  dosage          VARCHAR(100) NOT NULL                          COMMENT 'Liều dùng mỗi lần uống (VD: 1 viên, 5ml, 500mg)',
  frequency       VARCHAR(100) NOT NULL                          COMMENT 'Tần suất uống trong ngày (VD: 3 lần/ngày sau bữa ăn)',
  time_slots      JSON             NULL                          COMMENT 'Khung giờ uống cụ thể — mảng JSON (VD: ["Sáng","Trưa","Tối"])',
  start_date      DATE         NOT NULL                          COMMENT 'Ngày bắt đầu uống thuốc',
  end_date        DATE             NULL DEFAULT NULL             COMMENT 'Ngày kết thúc — NULL nếu dùng lâu dài / không xác định',
  notes           TEXT             NULL                          COMMENT 'Dặn dò riêng cho loại thuốc này (uống trước/sau ăn, tránh ánh nắng, ...)',
  PRIMARY KEY (id),
  INDEX idx_item_prescription (prescription_id),
  CONSTRAINT fk_item_prescription
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Chi tiết từng thuốc trong đơn — node-cron đọc để tạo chuỗi reminders tự động';


-- ================================================================
--  19. BẢNG NHẮC UỐNG THUỐC  (reminders)
--      Mỗi bản ghi là 1 lần nhắc cụ thể. node-cron quét và gửi.
-- ================================================================
CREATE TABLE IF NOT EXISTS reminders (
  id                   INT UNSIGNED NOT NULL AUTO_INCREMENT               COMMENT 'Khóa chính tự tăng',
  prescription_item_id INT UNSIGNED NOT NULL                              COMMENT 'Thuốc cần nhắc uống',
  remind_time          DATETIME     NOT NULL                              COMMENT 'Thời điểm cụ thể gửi nhắc (ngày + giờ)',
  status               ENUM(
                         'pending',  -- Chưa đến giờ gửi
                         'sent',     -- Đã gửi FCM/email, chờ phản hồi
                         'taken',    -- Người dùng xác nhận đã uống
                         'skipped'   -- Bỏ qua lần này
                       ) NOT NULL DEFAULT 'pending'                       COMMENT 'Trạng thái nhắc nhở',
  created_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP    COMMENT 'Ngày tạo bản ghi nhắc',
  PRIMARY KEY (id),
  INDEX idx_reminder_time   (remind_time),
  INDEX idx_reminder_status (status),
  CONSTRAINT fk_reminder_item
    FOREIGN KEY (prescription_item_id) REFERENCES prescription_items(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Lịch nhắc uống thuốc — node-cron quét mỗi phút, gửi FCM + email khi đến remind_time';


-- ================================================================
--  20. BẢNG ĐÁNH GIÁ LỊCH HẸN  (appointment_reviews)
--      Bệnh nhân xếp hạng bác sĩ sau khi khám xong.
-- ================================================================
CREATE TABLE IF NOT EXISTS appointment_reviews (
  id             INT UNSIGNED     NOT NULL AUTO_INCREMENT                COMMENT 'Khóa chính tự tăng',
  appointment_id INT UNSIGNED     NOT NULL                               COMMENT 'Lịch hẹn được đánh giá — 1 lịch hẹn chỉ đánh giá được 1 lần',
  user_id        INT UNSIGNED     NOT NULL                               COMMENT 'Người dùng viết đánh giá (chủ lịch hẹn)',
  doctor_id      INT UNSIGNED     NOT NULL                               COMMENT 'Bác sĩ được đánh giá — lưu riêng để query thống kê nhanh',
  rating         TINYINT UNSIGNED NOT NULL                               COMMENT 'Số sao từ 1 (thấp nhất) đến 5 (cao nhất)',
  comment        TEXT                 NULL                               COMMENT 'Nhận xét chi tiết bằng văn bản (không bắt buộc)',
  is_visible     TINYINT(1)       NOT NULL DEFAULT 1                     COMMENT 'Hiển thị công khai: 1 = hiện, 0 = Admin ẩn do vi phạm tiêu chuẩn',
  created_at     DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP     COMMENT 'Thời điểm gửi đánh giá',
  PRIMARY KEY (id),
  UNIQUE KEY uq_review_appointment (appointment_id),
  INDEX idx_review_doctor (doctor_id),
  CONSTRAINT fk_review_appointment
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
  CONSTRAINT fk_review_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_review_doctor
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Đánh giá sau khám — bệnh nhân xếp hạng 1–5 sao, Admin có thể ẩn vi phạm';


-- ================================================================
--  21. BẢNG THÔNG BÁO CÁ NHÂN  (notifications)
--      Hub tập trung thông báo cho từng người dùng.
--  v3.0: +type 'payment' cho thông báo thanh toán / hoàn tiền
-- ================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT               COMMENT 'Khóa chính tự tăng',
  user_id    INT UNSIGNED NOT NULL                              COMMENT 'Người nhận thông báo',
  title      VARCHAR(200) NOT NULL                              COMMENT 'Tiêu đề ngắn hiển thị trên chuông thông báo',
  content    TEXT             NULL                              COMMENT 'Nội dung đầy đủ khi mở thông báo',
  type       ENUM(
               'medicine',     -- Nhắc uống thuốc (từ reminders)
               'appointment',  -- Liên quan lịch hẹn (xác nhận, từ chối, nhắc trước 1 ngày)
               'payment',      -- Thông báo thanh toán hoặc hoàn tiền
               'system'        -- Thông báo chung từ Admin
             ) NOT NULL                                         COMMENT 'Loại thông báo — dùng để hiển thị icon phân biệt',
  related_id INT UNSIGNED     NULL DEFAULT NULL                 COMMENT 'ID đối tượng liên quan (appointment_id, payment_id, ...) để điều hướng khi bấm',
  is_read    TINYINT(1)   NOT NULL DEFAULT 0                    COMMENT 'Trạng thái đọc: 0 = chưa đọc (hiện badge), 1 = đã đọc',
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP    COMMENT 'Thời điểm tạo thông báo',
  PRIMARY KEY (id),
  INDEX idx_notif_user    (user_id),
  INDEX idx_notif_read    (is_read),
  INDEX idx_notif_created (created_at),
  CONSTRAINT fk_notif_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Thông báo cá nhân — nhắc thuốc, cập nhật lịch hẹn, thông báo thanh toán và hệ thống từ Admin';


-- ================================================================
--  22. BẢNG THÔNG BÁO HỆ THỐNG  (system_notifications)
--      Admin soạn và gửi hàng loạt tới nhóm đối tượng.
-- ================================================================
CREATE TABLE IF NOT EXISTS system_notifications (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT                          COMMENT 'Khóa chính tự tăng',
  title        VARCHAR(200) NOT NULL                                         COMMENT 'Tiêu đề thông báo hàng loạt',
  content      TEXT         NOT NULL                                         COMMENT 'Nội dung đầy đủ thông báo',
  target_group ENUM(
                 'all',     -- Gửi đến tất cả người dùng
                 'doctor',  -- Chỉ gửi đến bác sĩ
                 'user'     -- Chỉ gửi đến bệnh nhân
               ) NOT NULL DEFAULT 'all'                                      COMMENT 'Nhóm nhận thông báo',
  scheduled_at DATETIME         NULL DEFAULT NULL                            COMMENT 'Thời điểm hẹn gửi — NULL = gửi ngay lập tức',
  sent_at      DATETIME         NULL DEFAULT NULL                            COMMENT 'Thời điểm thực tế đã gửi xong',
  status       ENUM(
                 'draft',      -- Đang soạn thảo, chưa lên lịch
                 'scheduled',  -- Đã đặt lịch gửi — node-cron sẽ xử lý
                 'sent'        -- Đã gửi thành công
               ) NOT NULL DEFAULT 'draft'                                    COMMENT 'Trạng thái thông báo hàng loạt',
  created_by   INT UNSIGNED     NULL DEFAULT NULL                            COMMENT 'Admin đã tạo thông báo này',
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP               COMMENT 'Ngày soạn thông báo',
  PRIMARY KEY (id),
  INDEX idx_sysnotif_status (status),
  CONSTRAINT fk_sysnotif_admin
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Thông báo hàng loạt do Admin soạn — gửi qua FCM + email, hỗ trợ lập lịch bằng node-cron';


-- ================================================================
--  23. BẢNG PHIÊN CHAT AI  (chat_sessions)
--      Mỗi phiên hội thoại với Gemini AI.
--  v3.0: +title để người dùng nhận ra lại phiên chat
-- ================================================================
CREATE TABLE IF NOT EXISTS chat_sessions (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT 'Khóa chính tự tăng',
  user_id    INT UNSIGNED NOT NULL                             COMMENT 'Người dùng mở phiên chat',
  title      VARCHAR(200)     NULL DEFAULT NULL                COMMENT 'Tiêu đề phiên chat — tự sinh từ câu hỏi đầu tiên hoặc người dùng đặt tên',
  start_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT 'Thời điểm bắt đầu phiên hội thoại',
  end_time   DATETIME         NULL DEFAULT NULL                COMMENT 'Thời điểm đóng phiên — NULL nếu đang mở',
  PRIMARY KEY (id),
  INDEX idx_chat_user (user_id),
  CONSTRAINT fk_chat_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Phiên hội thoại với AI Gemini — mỗi phiên lưu nhiều tin nhắn, có thể xem lại lịch sử';


-- ================================================================
--  24. BẢNG TIN NHẮN CHAT AI  (chat_messages)
--      Mỗi bản ghi là một lượt hỏi/đáp trong phiên chat.
-- ================================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT               COMMENT 'Khóa chính tự tăng',
  session_id  INT UNSIGNED NOT NULL                              COMMENT 'Phiên chat chứa tin nhắn này',
  sender_role ENUM(
                'user',  -- Tin nhắn từ bệnh nhân
                'ai'     -- Phản hồi từ Gemini AI
              ) NOT NULL                                         COMMENT 'Người gửi tin nhắn',
  content     TEXT        NOT NULL                               COMMENT 'Nội dung tin nhắn (câu hỏi hoặc trả lời)',
  timestamp   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP     COMMENT 'Thời điểm gửi tin nhắn',
  PRIMARY KEY (id),
  INDEX idx_msg_session (session_id),
  CONSTRAINT fk_msg_session
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Tin nhắn trong phiên chat — lưu toàn bộ lịch sử hội thoại để bệnh nhân xem lại';


-- ================================================================
--  25. BẢNG BÀI VIẾT / TIN TỨC  (articles)
--      Nội dung hiển thị trên trang /news.
-- ================================================================
CREATE TABLE IF NOT EXISTS articles (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT                          COMMENT 'Khóa chính tự tăng',
  title        VARCHAR(250) NOT NULL                                         COMMENT 'Tiêu đề bài viết hiển thị trên danh sách và trang chi tiết',
  slug         VARCHAR(250) NOT NULL                                         COMMENT 'Đường dẫn URL thân thiện (VD: phong-ngua-dot-quy) — dùng cho /news/:slug',
  category     VARCHAR(80)  NOT NULL                                         COMMENT 'Chuyên mục bài viết (Tin tức, Sức khỏe, Sự kiện, Thành tựu)',
  summary      TEXT             NULL                                         COMMENT 'Tóm tắt 1–2 câu — hiển thị trên card ở trang danh sách',
  content      LONGTEXT         NULL                                         COMMENT 'Nội dung bài viết đầy đủ — hỗ trợ HTML hoặc Markdown',
  thumbnail    VARCHAR(500)     NULL DEFAULT NULL                            COMMENT 'URL ảnh bìa bài viết hiển thị trên card',
  author_id    INT UNSIGNED     NULL DEFAULT NULL                            COMMENT 'Tác giả bài viết — liên kết bảng users, NULL nếu hiển thị ẩn danh',
  published_at DATE             NULL DEFAULT NULL                            COMMENT 'Ngày xuất bản hiển thị trên bài — NULL nếu chưa xuất bản',
  is_published TINYINT(1)   NOT NULL DEFAULT 0                               COMMENT 'Trạng thái xuất bản: 1 = công khai, 0 = nháp',
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP               COMMENT 'Ngày tạo bài viết',
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Lần chỉnh sửa cuối',
  PRIMARY KEY (id),
  UNIQUE KEY uq_article_slug (slug),
  INDEX idx_article_category  (category),
  INDEX idx_article_published (is_published),
  INDEX idx_article_date      (published_at),
  CONSTRAINT fk_article_author
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Bài viết tin tức và sức khỏe — hiển thị trang /news, hỗ trợ nháp và xuất bản';


-- ================================================================
--  26. BẢNG BANNER TRANG CHỦ  (hero_banners)
--      Admin quản lý slider hero section trên trang chủ.
-- ================================================================
CREATE TABLE IF NOT EXISTS hero_banners (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT            COMMENT 'Khóa chính tự tăng',
  title         VARCHAR(200)     NOT NULL                           COMMENT 'Tiêu đề lớn hiển thị nổi bật trên banner',
  subtitle      TEXT                 NULL                           COMMENT 'Mô tả phụ bên dưới tiêu đề — giới thiệu thêm về slide',
  image_url     VARCHAR(500)     NOT NULL                           COMMENT 'URL ảnh nền banner — khuyến nghị tối thiểu 1440×600px',
  cta_primary   VARCHAR(100)         NULL DEFAULT NULL              COMMENT 'Nội dung nút CTA chính màu xanh (VD: Đặt lịch khám ngay)',
  cta_secondary VARCHAR(100)         NULL DEFAULT NULL              COMMENT 'Nội dung nút CTA phụ viền trắng (VD: Tìm bác sĩ)',
  sort_order    TINYINT UNSIGNED NOT NULL DEFAULT 0                 COMMENT 'Thứ tự hiển thị trong slider (0 = đầu tiên)',
  is_active     TINYINT(1)       NOT NULL DEFAULT 1                 COMMENT 'Trạng thái: 1 = hiển thị trong slider, 0 = tạm ẩn',
  created_at    DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ngày Admin tạo banner',
  PRIMARY KEY (id),
  INDEX idx_banner_active (is_active),
  INDEX idx_banner_sort   (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Banner trang chủ — Admin thêm/sửa/ẩn slide trong hero section, sắp xếp thứ tự tùy ý';


-- ================================================================
--  ██████╗  █████╗ ██╗   ██╗███╗   ███╗███████╗███╗   ██╗████████╗
--  ██╔══██╗██╔══██╗╚██╗ ██╔╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
--  ██████╔╝███████║ ╚████╔╝ ██╔████╔██║█████╗  ██╔██╗ ██║   ██║
--  ██╔═══╝ ██╔══██║  ╚██╔╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
--  ██║     ██║  ██║   ██║   ██║ ╚═╝ ██║███████╗██║ ╚████║   ██║
--  ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
--  MODULE THANH TOÁN — 4 bảng mới (27–30)
-- ================================================================


-- ================================================================
--  27. BẢNG THANH TOÁN  (payments)
--      Mỗi lịch hẹn có tối đa 1 giao dịch thanh toán.
--      Số tiền = doctors.consultation_fee tại thời điểm đặt lịch.
-- ================================================================
CREATE TABLE IF NOT EXISTS payments (
  id             INT UNSIGNED  NOT NULL AUTO_INCREMENT                          COMMENT 'Khóa chính tự tăng',
  appointment_id INT UNSIGNED  NOT NULL                                         COMMENT 'Lịch hẹn được thanh toán — UNIQUE: 1 lịch hẹn chỉ có 1 payment',
  patient_id     INT UNSIGNED  NOT NULL                                         COMMENT 'Bệnh nhân thực hiện thanh toán (= appointments.user_id)',
  amount         DECIMAL(10,2) NOT NULL                                         COMMENT 'Số tiền bệnh nhân trả (VND) — snapshot từ consultation_fee lúc đặt',
  status         ENUM(
                   'pending',   -- Chờ thanh toán — vừa tạo, chưa nhấn xác nhận
                   'paid',      -- Đã thanh toán thành công qua mock gateway
                   'failed',    -- Thanh toán thất bại (timeout 30s / lỗi hệ thống)
                   'refunded'   -- Đã hoàn tiền sau khi huỷ lịch được duyệt
                 ) NOT NULL DEFAULT 'pending'                                   COMMENT 'Trạng thái giao dịch thanh toán',
  method         ENUM('mock') NOT NULL DEFAULT 'mock'                           COMMENT 'Phương thức thanh toán — hiện chỉ hỗ trợ mock (giả lập, không ngân hàng thật)',
  paid_at        DATETIME          NULL DEFAULT NULL                            COMMENT 'Thời điểm thanh toán thành công — NULL nếu chưa paid',
  created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP               COMMENT 'Thời điểm tạo giao dịch (khi bệnh nhân vào trang thanh toán)',
  PRIMARY KEY (id),
  UNIQUE KEY uq_payment_appointment (appointment_id),
  INDEX idx_payment_patient (patient_id),
  INDEX idx_payment_status  (status),
  INDEX idx_payment_paid_at (paid_at),
  CONSTRAINT fk_payment_appointment
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE RESTRICT,
  CONSTRAINT fk_payment_patient
    FOREIGN KEY (patient_id)     REFERENCES users(id)        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Giao dịch thanh toán — mỗi lịch hẹn có tối đa 1 payment, nút "Kiểm tra thanh toán" giả lập thành công';


-- ================================================================
--  28. BẢNG HOÀN TIỀN  (refunds)
--      Yêu cầu hoàn tiền khi bệnh nhân huỷ lịch đã thanh toán.
--      % hoàn tự tính theo thời gian huỷ — Admin chỉ duyệt hoặc từ chối.
-- ================================================================
CREATE TABLE IF NOT EXISTS refunds (
  id             INT UNSIGNED     NOT NULL AUTO_INCREMENT                        COMMENT 'Khóa chính tự tăng',
  payment_id     INT UNSIGNED     NOT NULL                                       COMMENT 'Giao dịch gốc được yêu cầu hoàn',
  appointment_id INT UNSIGNED     NOT NULL                                       COMMENT 'Lịch hẹn liên quan — UNIQUE: 1 lịch chỉ được refund đúng 1 lần',
  amount         DECIMAL(10,2)    NOT NULL                                       COMMENT 'Số tiền thực tế hoàn lại = payments.amount × percent / 100',
  percent        TINYINT UNSIGNED NOT NULL                                       COMMENT 'Phần trăm hoàn theo chính sách: 0 / 50 / 80 / 100',
  reason         VARCHAR(255)         NULL DEFAULT NULL                          COMMENT 'Lý do huỷ lịch / yêu cầu hoàn tiền của bệnh nhân',
  reject_reason  VARCHAR(255)         NULL DEFAULT NULL                          COMMENT 'Lý do Admin từ chối — bắt buộc điền khi status = rejected',
  status         ENUM(
                   'pending',    -- Chờ Admin xử lý
                   'completed',  -- Admin đã duyệt và hoàn tiền thành công
                   'rejected'    -- Admin từ chối kèm lý do
                 ) NOT NULL DEFAULT 'pending'                                   COMMENT 'Trạng thái xử lý yêu cầu hoàn tiền',
  requested_at   DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP             COMMENT 'Thời điểm bệnh nhân tạo yêu cầu hoàn',
  processed_at   DATETIME             NULL DEFAULT NULL                          COMMENT 'Thời điểm Admin duyệt hoặc từ chối',
  processed_by   INT UNSIGNED         NULL DEFAULT NULL                          COMMENT 'Admin ID đã xử lý yêu cầu này',
  PRIMARY KEY (id),
  UNIQUE KEY uq_refund_appointment (appointment_id),
  INDEX idx_refund_payment (payment_id),
  INDEX idx_refund_status  (status),
  CONSTRAINT fk_refund_payment
    FOREIGN KEY (payment_id)     REFERENCES payments(id)     ON DELETE RESTRICT,
  CONSTRAINT fk_refund_appointment
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE RESTRICT,
  CONSTRAINT fk_refund_admin
    FOREIGN KEY (processed_by)   REFERENCES users(id)        ON DELETE SET NULL,
  CONSTRAINT chk_refund_percent  CHECK (percent IN (0, 50, 80, 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Yêu cầu hoàn tiền — % hoàn tự tính theo thời gian huỷ, Admin duyệt hoặc từ chối có lý do';


-- ================================================================
--  29. BẢNG CHUYỂN TIỀN CHO CƠ SỞ Y TẾ  (payouts)
--      Admin tạo lệnh chuyển 85% doanh thu cho bệnh viện theo tháng.
--      Cùng hospital + period chỉ tạo được 1 payout (UNIQUE).
-- ================================================================
CREATE TABLE IF NOT EXISTS payouts (
  id                INT UNSIGNED  NOT NULL AUTO_INCREMENT                        COMMENT 'Khóa chính tự tăng',
  hospital_id       INT UNSIGNED  NOT NULL                                       COMMENT 'Cơ sở y tế nhận tiền',
  amount            DECIMAL(12,2) NOT NULL                                       COMMENT 'Số tiền thực tế chuyển = 85% × tổng doanh thu kỳ (sau khi trừ refund)',
  commission        DECIMAL(12,2) NOT NULL                                       COMMENT 'Hoa hồng VitaFamily giữ lại = 15% × tổng doanh thu kỳ',
  period            VARCHAR(7)    NOT NULL                                       COMMENT 'Kỳ thanh toán định dạng YYYY-MM (VD: 2025-01)',
  appointment_count INT UNSIGNED  NOT NULL DEFAULT 0                             COMMENT 'Số lịch hẹn đã khám xong (status=completed, payment=paid) được tính vào kỳ này',
  status            ENUM(
                      'pending',    -- Đã tạo lệnh, chờ Admin xác nhận đã chuyển tiền thực tế
                      'completed'   -- Admin xác nhận đã chuyển xong
                    ) NOT NULL DEFAULT 'pending'                                 COMMENT 'Trạng thái lệnh chuyển tiền',
  note              TEXT              NULL                                       COMMENT 'Ghi chú Admin khi tạo hoặc xác nhận hoàn thành payout',
  created_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP             COMMENT 'Thời điểm Admin tạo lệnh payout',
  completed_at      DATETIME          NULL DEFAULT NULL                          COMMENT 'Thời điểm Admin xác nhận đã chuyển xong',
  created_by        INT UNSIGNED      NULL DEFAULT NULL                          COMMENT 'Admin ID tạo lệnh payout',
  completed_by      INT UNSIGNED      NULL DEFAULT NULL                          COMMENT 'Admin ID xác nhận hoàn thành',
  PRIMARY KEY (id),
  UNIQUE KEY uq_payout_hospital_period (hospital_id, period),
  INDEX idx_payout_status (status),
  INDEX idx_payout_period (period),
  CONSTRAINT fk_payout_hospital
    FOREIGN KEY (hospital_id)  REFERENCES hospitals(id) ON DELETE RESTRICT,
  CONSTRAINT fk_payout_created_by
    FOREIGN KEY (created_by)   REFERENCES users(id)     ON DELETE SET NULL,
  CONSTRAINT fk_payout_completed_by
    FOREIGN KEY (completed_by) REFERENCES users(id)     ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Lệnh chuyển tiền 85% doanh thu cho cơ sở y tế — Admin tạo và xác nhận theo kỳ tháng';


-- ================================================================
--  30. BẢNG CẤU HÌNH THANH TOÁN  (payment_settings)
--      Lưu tham số chính sách — Admin điều chỉnh qua UI, không hardcode.
-- ================================================================
CREATE TABLE IF NOT EXISTS payment_settings (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT                COMMENT 'Khóa chính tự tăng',
  key_name    VARCHAR(50)  NOT NULL                               COMMENT 'Tên khóa cấu hình — duy nhất toàn bảng',
  value       VARCHAR(255) NOT NULL                               COMMENT 'Giá trị (kiểu chuỗi, backend tự parse sang number khi dùng)',
  description VARCHAR(200)     NULL DEFAULT NULL                  COMMENT 'Mô tả ý nghĩa — hiển thị trên trang Admin Settings',
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Lần cập nhật cuối — tự động khi Admin thay đổi giá trị',
  PRIMARY KEY (id),
  UNIQUE KEY uq_setting_key (key_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Cấu hình chính sách thanh toán — hoa hồng và ngưỡng hoàn tiền, Admin điều chỉnh qua UI';

-- Giá trị mặc định — KHÔNG hardcode các số này trong code, luôn đọc từ bảng này
INSERT INTO payment_settings (key_name, value, description) VALUES
  ('commission_rate',    '15', 'Phần trăm hoa hồng VitaFamily giữ lại (%) — phần còn lại chuyển cho cơ sở y tế'),
  ('refund_tier1_hours', '24', 'Huỷ trước ≥ N giờ so với giờ khám → hoàn 100%'),
  ('refund_tier2_hours', '12', 'Huỷ trước ≥ N giờ so với giờ khám → hoàn 80%'),
  ('refund_tier3_hours', '6',  'Huỷ trước ≥ N giờ so với giờ khám → hoàn 50% (dưới ngưỡng này = 0%)');


-- ================================================================
--  FK bổ sung: appointments.payment_id → payments.id
--  Phải chạy SAU KHI cả appointments và payments đã được tạo xong.
-- ================================================================
ALTER TABLE appointments
  ADD CONSTRAINT fk_appt_payment
    FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL;


-- ================================================================
SET foreign_key_checks = 1;
-- ================================================================
--  Kết thúc file schema v3.0
--  Tổng: 30 bảng (26 bảng gốc + 4 bảng payment module)
--
--  Bảng mới so với v2.0:
--    27. payments        — giao dịch thanh toán
--    28. refunds         — yêu cầu hoàn tiền
--    29. payouts         — chuyển tiền cho cơ sở y tế
--    30. payment_settings — cấu hình chính sách
--
--  Cột mới trên bảng cũ:
--    users              → dob, address
--    hospitals          → city, email, description, image_url,
--                         bank_account, bank_name
--    doctors            → consultation_fee
--    doctor_schedules   → hospital_id (+ cập nhật UNIQUE KEY)
--    appointments       → payment_status, payment_id
--    notifications      → thêm type 'payment'
--    chat_sessions      → title
--
--  Chạy file 02_seed.sql để nạp dữ liệu mẫu.
--  Lưu ý: 02_seed.sql cần cập nhật thêm hospital_id cho doctor_schedules.
-- ================================================================
