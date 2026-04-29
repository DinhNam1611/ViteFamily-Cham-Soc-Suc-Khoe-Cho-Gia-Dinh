-- ================================================================
--  VitaFamily — Seed Data
--  Phiên bản : 2.0
--  Mô tả     : Dữ liệu mẫu đầy đủ khớp với frontend (db.json)
--  Yêu cầu   : Chạy sau 01_schema.sql
--  Mật khẩu  : Tất cả tài khoản dùng mật khẩu "123456"
--               Hash bcrypt (cost=10) — thay bằng hash mới nếu cần
-- ================================================================

USE vitafamily;

SET NAMES utf8mb4;
SET foreign_key_checks = 0;

-- ----------------------------------------------------------------
-- Biến hash mật khẩu "123456" — bcryptjs cost=10
-- Để tạo lại hash: require('bcryptjs').hashSync('123456', 10)
-- ----------------------------------------------------------------
SET @pwd = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';


-- ================================================================
--  1. NGƯỜI DÙNG  (users)
--     id 1       = admin
--     id 2       = tài khoản demo (test@vitafamily.vn / 123456)
--     id 3–7     = bệnh nhân mẫu
--     id 8–19    = tài khoản bác sĩ (12 bác sĩ)
-- ================================================================
INSERT INTO users (id, email, password, full_name, phone, avatar, role, status) VALUES
-- ── Admin ──────────────────────────────────────────────────────
(1,  'admin@vitafamily.vn',             @pwd, 'Quản trị viên',                '0901000001',
  NULL, 'admin', 'active'),

-- ── Bệnh nhân demo (login: test@vitafamily.vn / 123456) ────────
(2,  'test@vitafamily.vn',              @pwd, 'Nguyễn Văn Test',              '0901000002',
  NULL, 'user', 'active'),

-- ── Bệnh nhân mẫu ──────────────────────────────────────────────
(3,  'nguyen.van.minh@gmail.com',       @pwd, 'Nguyễn Văn Minh',             '0901000003',
  NULL, 'user', 'active'),
(4,  'tran.thi.hoa@gmail.com',          @pwd, 'Trần Thị Hoa',                '0901000004',
  NULL, 'user', 'active'),
(5,  'le.van.tuan@gmail.com',           @pwd, 'Lê Văn Tuấn',                 '0901000005',
  NULL, 'user', 'active'),
(6,  'pham.thu.nga@gmail.com',          @pwd, 'Phạm Thu Nga',                '0901000006',
  NULL, 'user', 'active'),
(7,  'hoang.van.duc@gmail.com',         @pwd, 'Hoàng Văn Đức',               '0901000007',
  NULL, 'user', 'active'),

-- ── Bác sĩ ─────────────────────────────────────────────────────
(8,  'dr.nguyen.van.an@vitafamily.vn',  @pwd, 'PGS. TS. BS. Nguyễn Văn An', '0902000001',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(9,  'dr.tran.thi.binh@vitafamily.vn',  @pwd, 'TS. BS. Trần Thị Bình',       '0902000002',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(10, 'dr.le.minh.tuan@vitafamily.vn',   @pwd, 'BS. CKII. Lê Minh Tuấn',      '0902000003',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(11, 'dr.pham.thi.lan@vitafamily.vn',   @pwd, 'GS. TS. BS. Phạm Thị Lan',    '0902000004',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(12, 'dr.vo.thanh.quang@vitafamily.vn', @pwd, 'TS. BS. Võ Thanh Quang',      '0902000005',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(13, 'dr.nguyen.thi.cam.tu@vitafamily.vn', @pwd, 'ThS. BSCKII. Nguyễn Thị Cẩm Tú', '0902000006',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(14, 'dr.dang.van.hung@vitafamily.vn',  @pwd, 'ThS. BS. Đặng Văn Hùng',      '0902000007',
  'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(15, 'dr.hoang.thi.mai@vitafamily.vn',  @pwd, 'BS. CKII. Hoàng Thị Mai',     '0902000008',
  'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(16, 'dr.pham.quoc.binh@vitafamily.vn', @pwd, 'TS. BS. Phạm Quốc Bình',      '0902000009',
  'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(17, 'dr.nguyen.thu.ha@vitafamily.vn',  @pwd, 'ThS. BS. Nguyễn Thu Hà',      '0902000010',
  'https://images.unsplash.com/photo-1588776814546-1ffbb319c654?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(18, 'dr.tran.dinh.nam@vitafamily.vn',  @pwd, 'BS. CKI. Trần Đình Nam',      '0902000011',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
(19, 'dr.mai.thi.phuong@vitafamily.vn', @pwd, 'PGS. TS. BS. Mai Thị Phương', '0902000012',
  'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=300&h=300&fit=crop&crop=face', 'doctor', 'active');


-- ================================================================
--  2. CHUYÊN KHOA  (specialties)
--     12 chuyên khoa — slug khớp với CAT_SLUG_MAP trong Services.tsx
-- ================================================================
INSERT INTO specialties
  (id, name, slug, icon, `group`, group_label, description, common_diseases, staff_types, doctor_count, is_active, sort_order)
VALUES
(1,  'Tim mạch', 'tim-mach', 'HeartOutlined', 'internal', 'Nội khoa',
  'Chẩn đoán và điều trị các bệnh lý về tim và mạch máu.',
  '["Tăng huyết áp","Đau thắt ngực","Suy tim","Rối loạn nhịp tim","Xơ vữa động mạch"]',
  '["Bác sĩ Tim mạch","Kỹ thuật viên siêu âm tim","Điều dưỡng chuyên khoa Tim mạch"]',
  12, 1, 1),

(2,  'Thần kinh', 'than-kinh', 'ExperimentOutlined', 'internal', 'Nội khoa',
  'Chẩn đoán và điều trị bệnh lý não bộ, tủy sống và hệ thần kinh ngoại biên.',
  '["Đột quỵ","Bệnh Parkinson","Đau đầu mãn tính","Sa sút trí tuệ","Động kinh"]',
  '["Bác sĩ Thần kinh","Điều dưỡng Thần kinh","Kỹ thuật viên điện não đồ"]',
  8, 1, 2),

(3,  'Nhi khoa', 'nhi-khoa', 'SmileOutlined', 'internal', 'Nội khoa',
  'Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 15 tuổi.',
  '["Viêm phổi","Hen phế quản","Suy dinh dưỡng","Tiêu chảy cấp","Sốt xuất huyết trẻ em"]',
  '["Bác sĩ Nhi khoa","Điều dưỡng Nhi","Chuyên viên dinh dưỡng Nhi"]',
  15, 1, 3),

(4,  'Da liễu', 'da-lieu', 'MedicineBoxOutlined', 'support', 'Hỗ trợ',
  'Chẩn đoán và điều trị bệnh lý da, tóc và móng — bao gồm thẩm mỹ y tế.',
  '["Mụn trứng cá","Eczema","Nám da","Vẩy nến","Rụng tóc","Viêm da dị ứng"]',
  '["Bác sĩ Da liễu","Kỹ thuật viên laser","Điều dưỡng thẩm mỹ"]',
  10, 1, 4),

(5,  'Mắt', 'mat', 'EyeOutlined', 'surgical', 'Ngoại khoa',
  'Chăm sóc, khám và phẫu thuật mắt — bao gồm phẫu thuật khúc xạ LASIK và SMILE.',
  '["Cận thị","Viễn thị","Loạn thị","Đục thủy tinh thể","Glaucoma","Thoái hóa điểm vàng"]',
  '["Bác sĩ Nhãn khoa","Kỹ thuật viên khúc xạ","Kỹ thuật viên phẫu thuật mắt"]',
  7, 1, 5),

(6,  'Tai Mũi Họng', 'tai-mui-hong', 'AudioOutlined', 'surgical', 'Ngoại khoa',
  'Chẩn đoán và phẫu thuật bệnh lý tai, mũi, họng và đầu cổ.',
  '["Viêm xoang mãn tính","Polyp mũi","Viêm amidan","Ù tai","Ngủ ngáy – ngưng thở khi ngủ"]',
  '["Bác sĩ Tai Mũi Họng","Kỹ thuật viên nội soi","Điều dưỡng chuyên khoa TMH"]',
  9, 1, 6),

(7,  'Nội tiết', 'noi-tiet', 'ExperimentOutlined', 'internal', 'Nội khoa',
  'Chẩn đoán và điều trị rối loạn nội tiết tố — đái tháo đường, tuyến giáp, tuyến thượng thận.',
  '["Đái tháo đường type 2","Cường giáp","Suy giáp","Bướu cổ","Hội chứng Cushing"]',
  '["Bác sĩ Nội tiết","Điều dưỡng chuyên khoa Nội tiết","Kỹ thuật viên xét nghiệm hormone"]',
  6, 1, 7),

(8,  'Chấn thương chỉnh hình', 'chan-thuong-chinh-hinh', 'MedicineBoxOutlined', 'surgical', 'Ngoại khoa',
  'Phẫu thuật và phục hồi chức năng bệnh lý xương, khớp và cột sống.',
  '["Gãy xương","Thoái hóa cột sống","Thoát vị đĩa đệm","Đứt dây chằng","Viêm khớp dạng thấp"]',
  '["Bác sĩ Chấn thương chỉnh hình","Kỹ thuật viên phục hồi chức năng","Điều dưỡng Ngoại khoa"]',
  11, 1, 8),

(9,  'Tiêu hóa', 'tieu-hoa', 'MedicineBoxOutlined', 'internal', 'Nội khoa',
  'Chẩn đoán và điều trị bệnh lý dạ dày, ruột, gan, mật và tụy.',
  '["Viêm loét dạ dày","Hội chứng ruột kích thích","Xơ gan","Viêm đại tràng","Trào ngược dạ dày"]',
  '["Bác sĩ Tiêu hóa","Kỹ thuật viên nội soi","Điều dưỡng chuyên khoa Tiêu hóa"]',
  8, 1, 9),

(10, 'Xương khớp', 'xuong-khop', 'MedicineBoxOutlined', 'surgical', 'Ngoại khoa',
  'Phẫu thuật và điều trị bệnh lý khớp — thay khớp nhân tạo, nội soi khớp.',
  '["Thoái hóa khớp gối","Loãng xương","Viêm gout","Đau lưng mãn tính","Hội chứng cổ tay"]',
  '["Bác sĩ Xương khớp","Kỹ thuật viên phục hồi chức năng","Điều dưỡng Ngoại khoa"]',
  7, 1, 10),

(11, 'Sản phụ khoa', 'san-phu-khoa', 'HeartOutlined', 'internal', 'Nội khoa',
  'Chăm sóc sức khỏe phụ nữ — thai sản, hỗ trợ sinh sản và phẫu thuật phụ khoa.',
  '["Thai kỳ nguy cơ cao","Vô sinh hiếm muộn","U nang buồng trứng","U xơ tử cung","Ung thư cổ tử cung"]',
  '["Bác sĩ Sản phụ khoa","Hộ sinh","Kỹ thuật viên siêu âm thai","Chuyên viên tư vấn sinh sản"]',
  9, 1, 11),

(12, 'Ung bướu', 'ung-buou', 'MedicineBoxOutlined', 'internal', 'Nội khoa',
  'Chẩn đoán sớm và điều trị ung thư theo phác đồ đa mô thức quốc tế.',
  '["Ung thư vú","Ung thư đại tràng","Ung thư dạ dày","Ung thư gan","Ung thư phổi"]',
  '["Bác sĩ Ung bướu","Bác sĩ Xạ trị","Điều dưỡng Ung bướu","Kỹ thuật viên xạ trị"]',
  6, 1, 12);


-- ================================================================
--  3. BỆNH VIỆN / PHÒNG KHÁM  (hospitals)
-- ================================================================
INSERT INTO hospitals (id, name, address, phone, working_hours, is_active) VALUES
(1, 'Bệnh viện VitaFamily', '15 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh', '1800 1234', 'Thứ 2–7: 07:00–17:00; CN: 07:00–12:00', 1),
(2, 'Phòng khám VitaFamily Quận 7', '135 Nguyễn Thị Thập, Quận 7, TP. Hồ Chí Minh', '028 3820 1234', 'Thứ 2–7: 07:30–17:30', 1),
(3, 'Phòng khám VitaFamily Cầu Giấy', '88 Xuân Thủy, Cầu Giấy, Hà Nội', '024 3556 1234', 'Thứ 2–7: 07:30–17:30; CN: 08:00–12:00', 1),
(4, 'Phòng khám VitaFamily Đà Nẵng', '52 Lê Duẩn, Hải Châu, Đà Nẵng', '0236 1234 567', 'Thứ 2–7: 07:00–17:00', 1),
(5, 'Phòng khám VitaFamily Hải Phòng', '36 Điện Biên Phủ, Ngô Quyền, Hải Phòng', '0225 1234 567', 'Thứ 2–7: 07:30–17:00', 1),
(6, 'Phòng khám VitaFamily Bình Dương', '29 Đại lộ Bình Dương, TP. Thủ Dầu Một, Bình Dương', '0274 1234 567', 'Thứ 2–7: 07:30–17:30', 1);


-- ================================================================
--  4. BÁC SĨ  (doctors)
--     Dữ liệu khớp hoàn toàn với db.json (12 bác sĩ)
-- ================================================================
INSERT INTO doctors
  (id, user_id, full_name, slug, qualifications, bio, sub_specialty, experience,
   rating, review_count, avatar, languages, education, certifications,
   work_experience, memberships, special_interests, approval_status)
VALUES

-- ── Bác sĩ 1: Tim mạch ─────────────────────────────────────────
(1, 8, 'PGS. TS. BS. Nguyễn Văn An', 'nguyen-van-an',
 'Phó Giáo sư, Tiến sĩ Y khoa',
 'Chuyên gia hàng đầu về tim mạch can thiệp, siêu âm tim và điều trị bệnh lý mạch vành với hơn 20 năm kinh nghiệm.',
 'Tim mạch can thiệp', 20, 4.9, 320,
 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh","Tiếng Pháp"]',
 '[{"period":"1990–1996","description":"Bác sĩ Y khoa, Đại học Y Hà Nội, Hà Nội, Việt Nam"},{"period":"1996–1999","description":"Bác sĩ Nội trú, Đại học Y Hà Nội, chuyên ngành Tim Mạch"}]',
 '[{"period":"2000–2002","description":"Đào tạo sau đại học, chuyên ngành Tim Mạch Can Thiệp. Bệnh viện Lariboisière, Đại học Paris VII, CH Pháp."},{"period":"2010","description":"Phó Giáo sư, chuyên ngành Tim Mạch học. Hội đồng Chức danh Giáo sư Nhà nước, Việt Nam."}]',
 '[{"period":"1996–2000","description":"Bác sĩ nội trú, Khoa Tim Mạch, Bệnh viện Bạch Mai, Hà Nội"},{"period":"2000–2010","description":"Bác sĩ chuyên khoa Tim Mạch, Viện Tim Mạch Quốc gia Việt Nam"},{"period":"2010–nay","description":"Trưởng Khoa Tim Mạch Can Thiệp, Bệnh viện VitaFamily"}]',
 '["Phó Chủ tịch Hội Tim Mạch học Việt Nam","Thành viên Hội Tim Mạch Can Thiệp Châu Á – Thái Bình Dương (APSIC)","Thành viên Hội Tim Mạch Châu Âu (ESC)"]',
 '["Tim mạch can thiệp: đặt stent mạch vành, bít lỗ thông liên nhĩ, thay van tim qua da (TAVI)","Siêu âm tim màu Doppler và siêu âm tim qua thực quản","Chẩn đoán và điều trị suy tim, rối loạn nhịp tim, tăng huyết áp"]',
 'approved'),

-- ── Bác sĩ 2: Nhi khoa ─────────────────────────────────────────
(2, 9, 'TS. BS. Trần Thị Bình', 'tran-thi-binh',
 'Tiến sĩ Y khoa',
 'Bác sĩ nhi khoa giàu kinh nghiệm, chuyên về bệnh lý hô hấp, dinh dưỡng trẻ em và tư vấn lịch tiêm chủng.',
 'Nhi hô hấp & dinh dưỡng', 15, 4.8, 275,
 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"1994–2000","description":"Bác sĩ Y khoa, Đại học Y Dược TP. Hồ Chí Minh"},{"period":"2000–2003","description":"Bác sĩ Nội trú, chuyên ngành Nhi Khoa, Đại học Y Dược TP. Hồ Chí Minh"}]',
 '[{"period":"2008–2010","description":"Đào tạo sau đại học, chuyên ngành Nhi Hô Hấp. Royal Children''s Hospital, Melbourne, Australia."},{"period":"2015","description":"Tiến sĩ Y khoa, chuyên ngành Nhi Khoa, Đại học Y Dược TP. Hồ Chí Minh."}]',
 '[{"period":"2000–2009","description":"Bác sĩ Nhi Khoa, Khoa Hô Hấp, Bệnh viện Nhi đồng 1, TP. Hồ Chí Minh"},{"period":"2009–nay","description":"Bác sĩ chuyên khoa Nhi Khoa – Hô Hấp, Bệnh viện VitaFamily"}]',
 '["Thành viên Hội Nhi Khoa Việt Nam","Thành viên Hội Nhi Hô Hấp Châu Á (APSR Pediatric Section)"]',
 '["Bệnh hô hấp trẻ em: hen phế quản, viêm phổi, viêm tiểu phế quản, tắc nghẽn đường thở","Dinh dưỡng và phát triển thể chất ở trẻ sơ sinh và trẻ nhỏ","Lịch tiêm chủng mở rộng và phòng bệnh truyền nhiễm cho trẻ em"]',
 'approved'),

-- ── Bác sĩ 3: Da liễu ──────────────────────────────────────────
(3, 10, 'BS. CKII. Lê Minh Tuấn', 'le-minh-tuan',
 'Bác sĩ Chuyên khoa II',
 'Chuyên gia da liễu thẩm mỹ điều trị mụn, sẹo, nám bằng laser công nghệ cao và phác đồ cá nhân hóa.',
 'Da liễu thẩm mỹ & laser', 10, 4.7, 198,
 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"1998–2004","description":"Bác sĩ Y khoa, Đại học Y Hà Nội"},{"period":"2004–2007","description":"Bác sĩ Nội trú, chuyên ngành Da Liễu, Đại học Y Hà Nội"}]',
 '[{"period":"2012–2014","description":"Bác sĩ Chuyên khoa II Da Liễu, Học viện Quân Y, Hà Nội."},{"period":"2016","description":"Đào tạo chuyên sâu Laser thẩm mỹ da. Dermatology Institute, Singapore."}]',
 '[{"period":"2007–2014","description":"Bác sĩ Da Liễu, Bệnh viện Da Liễu Trung ương, Hà Nội"},{"period":"2014–nay","description":"Bác sĩ chuyên khoa Da Liễu – Thẩm mỹ, Bệnh viện VitaFamily"}]',
 '["Thành viên Hội Da Liễu Việt Nam"]',
 '["Điều trị mụn trứng cá, sẹo rỗ và sẹo thâm bằng laser CO2 Fractional, RF Microneedling","Trị nám, tàn nhang, rối loạn sắc tố bằng IPL và laser Nd:YAG","Chăm sóc da y tế cá nhân hóa, phác đồ kết hợp laser và dược mỹ phẩm"]',
 'approved'),

-- ── Bác sĩ 4: Thần kinh ────────────────────────────────────────
(4, 11, 'GS. TS. BS. Phạm Thị Lan', 'pham-thi-lan',
 'Giáo sư, Tiến sĩ Y khoa',
 'Giáo sư đầu ngành thần kinh học, nghiên cứu chuyên sâu về đột quỵ, Parkinson và các bệnh lý mạch máu não.',
 'Đột quỵ & bệnh mạch máu não', 25, 4.9, 410,
 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh","Tiếng Pháp"]',
 '[{"period":"1984–1990","description":"Bác sĩ Y khoa, Đại học Y Hà Nội, Hà Nội, Việt Nam"},{"period":"1990–1993","description":"Bác sĩ Nội trú, Đại học Y Hà Nội, chuyên ngành Thần Kinh"}]',
 '[{"period":"1995–1997","description":"Đào tạo sau đại học, chuyên ngành Thần Kinh Mạch Máu. Đại học Y, Đại học Tổng hợp Paris VI, CH Pháp."},{"period":"2002","description":"Tiến sĩ Y khoa, chuyên ngành Thần Kinh, Đại học Y Hà Nội."},{"period":"2012","description":"Giáo sư, chuyên ngành Thần Kinh học. Hội đồng Chức danh Giáo sư Nhà nước, Việt Nam."}]',
 '[{"period":"1990–1999","description":"Bác sĩ chuyên khoa Thần Kinh, Bệnh viện Bạch Mai, Hà Nội"},{"period":"1999–2015","description":"Trưởng Khoa Thần Kinh, Bệnh viện Bạch Mai; Giảng viên Đại học Y Hà Nội"},{"period":"2015–nay","description":"Chủ nhiệm Bộ môn Thần Kinh và Cố vấn cấp cao, Bệnh viện VitaFamily"}]',
 '["Nguyên Chủ tịch Hội Thần Kinh học Việt Nam","Thành viên Hội Đột Quỵ Thế Giới (WSO)","Thành viên Ban chấp hành Liên đoàn Thần Kinh học Thế Giới (WFN)"]',
 '["Đột quỵ não cấp tính: chẩn đoán, điều trị tiêu sợi huyết và can thiệp nội mạch","Bệnh Parkinson, sa sút trí tuệ và các rối loạn vận động","Chăm sóc hậu đột quỵ và phục hồi chức năng thần kinh"]',
 'approved'),

-- ── Bác sĩ 5: Tai Mũi Họng ────────────────────────────────────
(5, 12, 'TS. BS. Võ Thanh Quang', 'vo-thanh-quang',
 'Tiến sĩ Y khoa',
 'Chuyên gia tai mũi họng với kinh nghiệm phẫu thuật nội soi xoang, điều trị viêm xoang mãn tính và bệnh lý thanh quản.',
 'Nội soi TMH & phẫu thuật xoang', 18, 4.8, 245,
 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"1988–1994","description":"Bác sĩ Y khoa, Đại học Y Hà Nội, Hà Nội, Việt Nam"},{"period":"1994–1997","description":"Bác sĩ Nội trú, Đại học Y Hà Nội, chuyên ngành Tai Mũi Họng"}]',
 '[{"period":"2000–2002","description":"Đào tạo sau đại học, chuyên ngành Phẫu thuật Tai. Đại học Y, Đại học Tổng hợp Lille, CH Pháp."},{"period":"2005","description":"Đào tạo sau đại học, chuyên ngành Phẫu thuật Mũi-Xoang nội soi. Đại học Y Lille, CH Pháp."},{"period":"2009","description":"Tiến sĩ Y khoa, chuyên ngành Tai Mũi Họng, Đại học Y Hà Nội."}]',
 '[{"period":"1994–2006","description":"Bác sĩ chuyên khoa Tai Mũi Họng, Bệnh viện Tai Mũi Họng Trung ương, Hà Nội"},{"period":"2006–nay","description":"Trưởng Khoa Tai Mũi Họng, Bệnh viện VitaFamily"}]',
 '["Nguyên Chủ tịch Hội Tai Mũi Họng – Phẫu thuật Đầu Cổ Việt Nam","Nguyên Chủ tịch Hội Mũi-Xoang Đông Nam Á (SEAMS)","Thành viên Hội Tai Mũi Họng Quốc tế (IFOS)"]',
 '["Phẫu thuật nội soi mũi xoang (FESS) điều trị viêm xoang mãn tính và polyp mũi","Khám, phát hiện và điều trị các bệnh lý tai mũi họng người lớn và trẻ em","Phẫu thuật Amidan, VA và các bệnh lý thanh quản – đầu cổ"]',
 'approved'),

-- ── Bác sĩ 6: Tiêu hóa ────────────────────────────────────────
(6, 13, 'ThS. BSCKII. Nguyễn Thị Cẩm Tú', 'nguyen-thi-cam-tu',
 'Thạc sĩ, Bác sĩ Chuyên khoa II',
 'Chuyên gia tiêu hóa với thế mạnh nội soi NBI phát hiện sớm tổn thương ung thư đại tràng và dạ dày.',
 'Nội soi tiêu hóa & bệnh gan', 12, 4.7, 182,
 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"1997–2003","description":"Bác sĩ Y khoa, Đại học Y Dược TP. Hồ Chí Minh"},{"period":"2003–2006","description":"Bác sĩ Nội trú, chuyên ngành Nội Tiêu Hóa, Đại học Y Dược TP. Hồ Chí Minh"}]',
 '[{"period":"2009–2011","description":"Thạc sĩ Y khoa, chuyên ngành Tiêu Hóa – Gan Mật, Đại học Y Dược TP. Hồ Chí Minh."},{"period":"2014–2016","description":"Bác sĩ Chuyên khoa II, chuyên ngành Nội Tiêu Hóa, Đại học Y Dược TP. Hồ Chí Minh."},{"period":"2018","description":"Đào tạo nội soi NBI và can thiệp nội soi. Singapore General Hospital, Singapore."}]',
 '[{"period":"2006–2012","description":"Bác sĩ Tiêu Hóa, Bệnh viện Chợ Rẫy, TP. Hồ Chí Minh"},{"period":"2012–nay","description":"Bác sĩ chuyên khoa Tiêu Hóa, Bệnh viện VitaFamily"}]',
 '["Thành viên Hội Tiêu Hóa Gan Mật Việt Nam","Thành viên Hội Nội soi Tiêu Hóa Việt Nam"]',
 '["Nội soi dạ dày và đại tràng NBI phát hiện sớm ung thư tiêu hóa","Chẩn đoán và điều trị bệnh lý gan mãn tính: viêm gan B, C và xơ gan","Điều trị viêm loét dạ dày tá tràng, hội chứng ruột kích thích và bệnh trào ngược"]',
 'approved'),

-- ── Bác sĩ 7: Xương khớp ─────────────────────────────────────
(7, 14, 'ThS. BS. Đặng Văn Hùng', 'dang-van-hung',
 'Thạc sĩ Y khoa',
 'Phẫu thuật viên chỉnh hình chuyên về thay khớp gối, khớp háng và điều trị thoái hóa khớp tiến triển.',
 'Phẫu thuật khớp & chỉnh hình', 14, 4.6, 156,
 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"1995–2001","description":"Bác sĩ Y khoa, Đại học Y Hà Nội"},{"period":"2001–2004","description":"Bác sĩ Nội trú, chuyên ngành Ngoại Chấn Thương Chỉnh Hình, Đại học Y Hà Nội"}]',
 '[{"period":"2006–2009","description":"Thạc sĩ Y khoa, chuyên ngành Ngoại Chấn Thương Chỉnh Hình, Đại học Y Hà Nội."},{"period":"2013","description":"Đào tạo phẫu thuật nội soi khớp và thay khớp. AO Trauma Course, Bangkok, Thái Lan."}]',
 '[{"period":"2004–2010","description":"Bác sĩ Ngoại Chấn Thương Chỉnh Hình, Bệnh viện Việt Đức, Hà Nội"},{"period":"2010–nay","description":"Bác sĩ phẫu thuật Xương Khớp, Bệnh viện VitaFamily"}]',
 '["Thành viên Hội Chấn Thương Chỉnh Hình Việt Nam"]',
 '["Phẫu thuật thay khớp gối toàn phần và khớp háng nhân tạo","Nội soi khớp: tái tạo dây chằng chéo trước, điều trị sụn chêm","Điều trị không phẫu thuật thoái hóa khớp: tiêm PRP, hyaluronic acid"]',
 'approved'),

-- ── Bác sĩ 8: Sản phụ khoa ───────────────────────────────────
(8, 15, 'BS. CKII. Hoàng Thị Mai', 'hoang-thi-mai',
 'Bác sĩ Chuyên khoa II',
 'Chuyên gia sản phụ khoa, theo dõi thai kỳ nguy cơ cao, hỗ trợ sinh sản và phẫu thuật nội soi phụ khoa.',
 'Sản khoa & hỗ trợ sinh sản', 16, 4.9, 388,
 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"1993–1999","description":"Bác sĩ Y khoa, Đại học Y Hà Nội"},{"period":"1999–2002","description":"Bác sĩ Nội trú, chuyên ngành Sản Phụ Khoa, Đại học Y Hà Nội"}]',
 '[{"period":"2005–2008","description":"Bác sĩ Chuyên khoa II, chuyên ngành Sản Phụ Khoa, Học viện Quân Y, Hà Nội."},{"period":"2011","description":"Đào tạo hỗ trợ sinh sản và thụ tinh trong ống nghiệm (IVF). National University Hospital, Singapore."}]',
 '[{"period":"1999–2008","description":"Bác sĩ Sản Phụ Khoa, Bệnh viện Phụ Sản Trung ương, Hà Nội"},{"period":"2008–nay","description":"Bác sĩ chuyên khoa Sản Phụ Khoa và Hỗ trợ Sinh sản, Bệnh viện VitaFamily"}]',
 '["Thành viên Hội Sản Phụ Khoa Việt Nam","Thành viên Hội Hỗ trợ Sinh sản Việt Nam (VSAR)"]',
 '["Theo dõi và quản lý thai kỳ nguy cơ cao: tiền sản giật, đái tháo đường thai kỳ","Hỗ trợ sinh sản: thụ tinh trong ống nghiệm (IVF), bơm tinh trùng vào buồng tử cung (IUI)","Phẫu thuật nội soi phụ khoa: u nang buồng trứng, u xơ tử cung, lạc nội mạc tử cung"]',
 'approved'),

-- ── Bác sĩ 9: Mắt ────────────────────────────────────────────
(9, 16, 'TS. BS. Phạm Quốc Bình', 'pham-quoc-binh',
 'Tiến sĩ Y khoa',
 'Chuyên gia nhãn khoa với hơn 500 ca phẫu thuật LASIK/SMILE thành công và điều trị bệnh lý đáy mắt.',
 'Phẫu thuật khúc xạ LASIK & SMILE', 13, 4.8, 221,
 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"1996–2002","description":"Bác sĩ Y khoa, Đại học Y Dược TP. Hồ Chí Minh"},{"period":"2002–2005","description":"Bác sĩ Nội trú, chuyên ngành Nhãn Khoa, Đại học Y Dược TP. Hồ Chí Minh"}]',
 '[{"period":"2009–2011","description":"Tiến sĩ Y khoa, chuyên ngành Nhãn Khoa, Đại học Y Dược TP. Hồ Chí Minh."},{"period":"2014","description":"Đào tạo phẫu thuật khúc xạ LASIK và SMILE. Asia-Pacific Academy of Ophthalmology, Singapore."}]',
 '[{"period":"2005–2011","description":"Bác sĩ Nhãn Khoa, Bệnh viện Mắt TP. Hồ Chí Minh"},{"period":"2011–nay","description":"Bác sĩ chuyên khoa Nhãn Khoa – Khúc Xạ, Bệnh viện VitaFamily"}]',
 '["Thành viên Hội Nhãn Khoa Việt Nam","Thành viên Hội Nhãn Khoa Châu Á – Thái Bình Dương (APAO)"]',
 '["Phẫu thuật khúc xạ LASIK, SMILE điều trị cận thị, viễn thị, loạn thị","Phẫu thuật Phaco điều trị đục thủy tinh thể và đặt kính nội nhãn đa tiêu cự","Chẩn đoán và điều trị bệnh lý đáy mắt: glaucoma, thoái hóa điểm vàng"]',
 'approved'),

-- ── Bác sĩ 10: Nội tiết ──────────────────────────────────────
(10, 17, 'ThS. BS. Nguyễn Thu Hà', 'nguyen-thu-ha',
 'Thạc sĩ Y khoa',
 'Chuyên gia nội tiết điều trị đái tháo đường type 1 & 2, rối loạn tuyến giáp và bệnh lý nội tiết tố.',
 'Đái tháo đường & tuyến giáp', 11, 4.7, 167,
 'https://images.unsplash.com/photo-1588776814546-1ffbb319c654?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"1998–2004","description":"Bác sĩ Y khoa, Đại học Y Hà Nội"},{"period":"2004–2007","description":"Bác sĩ Nội trú, chuyên ngành Nội Tổng Hợp – Nội Tiết, Đại học Y Hà Nội"}]',
 '[{"period":"2009–2012","description":"Thạc sĩ Y khoa, chuyên ngành Nội Tiết Đái Tháo Đường, Đại học Y Hà Nội."},{"period":"2016","description":"Đào tạo quản lý đái tháo đường toàn diện. International Diabetes Federation (IDF) Asia-Pacific."}]',
 '[{"period":"2007–2013","description":"Bác sĩ Nội Tiết, Bệnh viện Nội Tiết Trung ương, Hà Nội"},{"period":"2013–nay","description":"Bác sĩ chuyên khoa Nội Tiết, Bệnh viện VitaFamily"}]',
 '["Thành viên Hội Nội Tiết – Đái Tháo Đường Việt Nam"]',
 '["Chẩn đoán và quản lý đái tháo đường type 1, type 2 và đái tháo đường thai kỳ","Rối loạn chức năng tuyến giáp: cường giáp, suy giáp, bướu giáp đa nhân","Rối loạn nội tiết tố: hội chứng buồng trứng đa nang, suy tuyến thượng thận"]',
 'approved'),

-- ── Bác sĩ 11: Tim mạch nhi ──────────────────────────────────
(11, 18, 'BS. CKI. Trần Đình Nam', 'tran-dinh-nam',
 'Bác sĩ Chuyên khoa I',
 'Bác sĩ tim mạch tập trung vào tim mạch nhi, dị tật tim bẩm sinh và can thiệp mạch vành ít xâm lấn.',
 'Tim mạch nhi & dị tật bẩm sinh', 8, 4.6, 134,
 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh"]',
 '[{"period":"2003–2009","description":"Bác sĩ Y khoa, Đại học Y Dược TP. Hồ Chí Minh"},{"period":"2009–2012","description":"Bác sĩ Nội trú, chuyên ngành Tim Mạch, Đại học Y Dược TP. Hồ Chí Minh"}]',
 '[{"period":"2014–2016","description":"Bác sĩ Chuyên khoa I Tim Mạch, Đại học Y Dược TP. Hồ Chí Minh."},{"period":"2019","description":"Đào tạo tim mạch nhi và siêu âm tim nhi. Children''s Heart Center, Bangkok, Thái Lan."}]',
 '[{"period":"2012–2016","description":"Bác sĩ Tim Mạch, Bệnh viện Nhi đồng 2, TP. Hồ Chí Minh"},{"period":"2016–nay","description":"Bác sĩ Tim Mạch – Tim Mạch Nhi, Bệnh viện VitaFamily"}]',
 '[]',
 '["Tim mạch nhi: chẩn đoán và theo dõi dị tật tim bẩm sinh ở trẻ em","Can thiệp mạch vành ít xâm lấn và đặt máy tạo nhịp tim","Siêu âm tim Doppler đánh giá chức năng thất ở người lớn và trẻ em"]',
 'approved'),

-- ── Bác sĩ 12: Ung bướu ──────────────────────────────────────
(12, 19, 'PGS. TS. BS. Mai Thị Phương', 'mai-thi-phuong',
 'Phó Giáo sư, Tiến sĩ Y khoa',
 'Phó Giáo sư đầu ngành ung bướu, điều trị ung thư vú và ung thư tiêu hóa theo phác đồ đa mô thức quốc tế.',
 'Ung thư vú & tiêu hóa', 22, 4.9, 356,
 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=300&h=300&fit=crop&crop=face',
 '["Tiếng Việt","Tiếng Anh","Tiếng Pháp"]',
 '[{"period":"1986–1992","description":"Bác sĩ Y khoa, Đại học Y Hà Nội, Hà Nội, Việt Nam"},{"period":"1992–1995","description":"Bác sĩ Nội trú, chuyên ngành Ung Bướu, Đại học Y Hà Nội"}]',
 '[{"period":"1998–2000","description":"Đào tạo sau đại học, Ung Thư Học Lâm Sàng. Institut Gustave Roussy, Paris, CH Pháp."},{"period":"2004","description":"Tiến sĩ Y khoa, chuyên ngành Ung Bướu, Đại học Y Hà Nội."},{"period":"2014","description":"Phó Giáo sư, chuyên ngành Ung Bướu. Hội đồng Chức danh Giáo sư Nhà nước, Việt Nam."}]',
 '[{"period":"1992–2005","description":"Bác sĩ Ung Bướu, Bệnh viện K Trung ương, Hà Nội"},{"period":"2005–2015","description":"Phó Trưởng Khoa Ung Bướu; Giảng viên Đại học Y Hà Nội"},{"period":"2015–nay","description":"Trưởng Trung tâm Ung Bướu, Bệnh viện VitaFamily"}]',
 '["Phó Chủ tịch Hội Ung Thư Việt Nam","Thành viên Hội Ung Thư Châu Á (FACO)","Thành viên Hội Ung Thư Lâm Sàng Mỹ (ASCO)"]',
 '["Ung thư vú: phẫu thuật bảo tồn, hóa trị, xạ trị và liệu pháp nhắm đích (HER2, hormone)","Ung thư đường tiêu hóa: dạ dày, đại tràng, gan và tụy — điều trị đa mô thức","Chẩn đoán sớm ung thư và tư vấn di truyền ung thư"]',
 'approved');


-- ================================================================
--  5. LIÊN KẾT BÁC SĨ ↔ CHUYÊN KHOA  (doctor_specialties)
-- ================================================================
INSERT INTO doctor_specialties (doctor_id, specialty_id, is_primary) VALUES
(1,  1,  1),  -- Nguyễn Văn An     → Tim mạch (chính)
(2,  3,  1),  -- Trần Thị Bình     → Nhi khoa (chính)
(3,  4,  1),  -- Lê Minh Tuấn      → Da liễu (chính)
(4,  2,  1),  -- Phạm Thị Lan      → Thần kinh (chính)
(5,  6,  1),  -- Võ Thanh Quang    → Tai Mũi Họng (chính)
(6,  9,  1),  -- Nguyễn Thị Cẩm Tú → Tiêu hóa (chính)
(7,  10, 1),  -- Đặng Văn Hùng     → Xương khớp (chính)
(7,  8,  0),  -- Đặng Văn Hùng     → Chấn thương chỉnh hình (phụ)
(8,  11, 1),  -- Hoàng Thị Mai     → Sản phụ khoa (chính)
(9,  5,  1),  -- Phạm Quốc Bình    → Mắt (chính)
(10, 7,  1),  -- Nguyễn Thu Hà     → Nội tiết (chính)
(11, 1,  1),  -- Trần Đình Nam     → Tim mạch (chính)
(11, 3,  0),  -- Trần Đình Nam     → Nhi khoa (phụ — tim mạch nhi)
(12, 12, 1);  -- Mai Thị Phương    → Ung bướu (chính)


-- ================================================================
--  6. LIÊN KẾT BÁC SĨ ↔ BỆNH VIỆN  (doctor_hospitals)
-- ================================================================
INSERT INTO doctor_hospitals (doctor_id, hospital_id) VALUES
(1,  1), (1,  3),  -- Nguyễn Văn An:    BV VitaFamily + Cầu Giấy HN
(2,  1), (2,  2),  -- Trần Thị Bình:    BV VitaFamily + Quận 7
(3,  1), (3,  2),  -- Lê Minh Tuấn:     BV VitaFamily + Quận 7
(4,  1), (4,  3),  -- Phạm Thị Lan:     BV VitaFamily + Cầu Giấy HN
(5,  1), (5,  3),  -- Võ Thanh Quang:   BV VitaFamily + Cầu Giấy HN
(6,  1), (6,  2),  -- Nguyễn Thị Cẩm Tú: BV VitaFamily + Quận 7
(7,  1),            -- Đặng Văn Hùng:    BV VitaFamily
(8,  1), (8,  2),  -- Hoàng Thị Mai:    BV VitaFamily + Quận 7
(9,  1), (9,  2),  -- Phạm Quốc Bình:   BV VitaFamily + Quận 7
(10, 1), (10, 3),  -- Nguyễn Thu Hà:    BV VitaFamily + Cầu Giấy HN
(11, 1),            -- Trần Đình Nam:    BV VitaFamily
(12, 1), (12, 3);  -- Mai Thị Phương:   BV VitaFamily + Cầu Giấy HN


-- ================================================================
--  7. DỊCH VỤ TRANG CHỦ  (services)
--     6 card hiển thị trên section Services của trang chủ
-- ================================================================
INSERT INTO services (id, name, icon, description, slug, sort_order, is_active) VALUES
(1, 'Khám tổng quát',        'MedicineBoxOutlined',      'Kiểm tra sức khỏe toàn diện với đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm.',   'kham-tong-quat',      1, 1),
(2, 'Xét nghiệm',            'ExperimentOutlined',       'Hệ thống xét nghiệm hiện đại, cho kết quả chính xác trong thời gian ngắn.',       'xet-nghiem',          2, 1),
(3, 'Chẩn đoán hình ảnh',    'FileImageOutlined',        'X-quang, siêu âm, MRI, CT Scanner với máy móc thế hệ mới nhất.',                  'chan-doan-hinh-anh',  3, 1),
(4, 'Tư vấn trực tuyến',     'VideoCameraOutlined',      'Gặp bác sĩ qua video call, tiết kiệm thời gian mà vẫn đảm bảo chất lượng.',       'tu-van-truc-tuyen',   4, 1),
(5, 'Phẫu thuật',            'SafetyCertificateOutlined','Phòng mổ đạt chuẩn quốc tế, đội ngũ phẫu thuật viên hàng đầu.',                  'phau-thuat',          5, 1),
(6, 'Phục hồi chức năng',    'HeartOutlined',            'Chương trình phục hồi chức năng cá nhân hóa, nâng cao chất lượng cuộc sống.',     'phuc-hoi-chuc-nang',  6, 1);


-- ================================================================
--  8. GÓI DỊCH VỤ CHI TIẾT  (service_packages)
--     18 gói — khớp với servicePackages trong db.json
-- ================================================================
INSERT INTO service_packages
  (id, name, category, slug, image, description, features, target_audience, is_active, sort_order)
VALUES
-- ── Khám Chuyên Khoa ───────────────────────────────────────────
(1,  'Khám Tim Mạch Chuyên Sâu', 'Khám Chuyên Khoa', 'kham-tim-mach',
  'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&h=400&fit=crop',
  'Siêu âm tim, Holter ECG 24h, đo huyết áp lưu động — chẩn đoán toàn diện các bệnh lý tim mạch.',
  '["Siêu âm tim màu Doppler","Holter ECG 24 giờ","Đo huyết áp lưu động","Tư vấn chuyên khoa sau khám"]',
  'Người trên 40 tuổi, có tiền sử bệnh tim', 1, 1),

(2,  'Khám Sản Phụ Khoa & Siêu Âm Thai 4D', 'Khám Chuyên Khoa', 'kham-san-phu-khoa',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop',
  'Khám thai định kỳ, siêu âm 4D HD, tầm soát ung thư cổ tử cung và vú theo chuẩn quốc tế.',
  '["Siêu âm thai 4D độ phân giải cao","Xét nghiệm Double/Triple test","Tầm soát ung thư phụ khoa","Tư vấn dinh dưỡng cho mẹ bầu"]',
  'Phụ nữ mang thai và phụ nữ từ 25 tuổi', 1, 2),

(3,  'Khám Nhi Khoa & Dinh Dưỡng Trẻ Em', 'Khám Chuyên Khoa', 'kham-nhi-khoa',
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop',
  'Đánh giá phát triển thể chất, tâm thần vận động, tư vấn dinh dưỡng và lịch tiêm chủng cho trẻ.',
  '["Đánh giá phát triển toàn diện","Tư vấn dinh dưỡng cá nhân hóa","Lịch tiêm chủng mở rộng","Xét nghiệm vi chất dinh dưỡng"]',
  'Trẻ em từ sơ sinh đến 15 tuổi', 1, 3),

-- ── Gói Khám Tổng Quát ────────────────────────────────────────
(4,  'Gói Khám Sức Khỏe Cơ Bản', 'Gói Khám Tổng Quát', 'goi-co-ban',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
  'Kiểm tra sức khỏe định kỳ với 22+ danh mục xét nghiệm — phù hợp người trẻ khỏe mạnh cần tầm soát hàng năm.',
  '["Xét nghiệm máu toàn phần (20 chỉ số)","Xét nghiệm nước tiểu","X-quang phổi thẳng","Siêu âm ổ bụng tổng quát","Đo huyết áp & ECG"]',
  'Người từ 18–40 tuổi, kiểm tra sức khỏe định kỳ', 1, 4),

(5,  'Gói Khám Sức Khỏe Nâng Cao', 'Gói Khám Tổng Quát', 'goi-nang-cao',
  'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop',
  'Hơn 30 danh mục chuyên sâu — bổ sung siêu âm tuyến giáp, đo loãng xương và chỉ điểm ung thư cơ bản.',
  '["Tất cả danh mục gói Cơ Bản","Siêu âm tuyến giáp","Đo mật độ xương (loãng xương)","Chỉ điểm ung thư: CEA, AFP","Khám chuyên khoa Tim & Mắt"]',
  'Người từ 40–60 tuổi hoặc có yếu tố nguy cơ', 1, 5),

(6,  'Gói Khám Sức Khỏe Cao Cấp', 'Gói Khám Tổng Quát', 'goi-cao-cap',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop',
  'Tầm soát toàn diện 40+ danh mục bao gồm CT 128 dãy, MRI não, nội soi NBI và toàn bộ chỉ điểm ung thư.',
  '["CT 128 dãy vùng ngực-bụng","MRI não không thuốc cản quang","Nội soi dạ dày NBI HD","Bộ chỉ điểm ung thư đầy đủ (8 loại)","Tư vấn dinh dưỡng chuyên sâu"]',
  'Người trên 50 tuổi hoặc cần tầm soát chuyên sâu', 1, 6),

-- ── Xét Nghiệm & Chẩn Đoán ───────────────────────────────────
(7,  'Xét Nghiệm Máu & Sinh Hóa', 'Xét Nghiệm & Chẩn Đoán', 'xet-nghiem-mau',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop',
  'Hệ thống máy phân tích tự động thế hệ mới, cho kết quả trong 2–4 giờ với hơn 50 chỉ số sinh hóa.',
  '["Công thức máu toàn phần","Sinh hóa máu (đường, mỡ, gan, thận)","Hormone (TSH, T3, T4, FSH, LH)","HbA1c — kiểm soát đái tháo đường"]',
  'Mọi đối tượng cần kiểm tra định kỳ', 1, 7),

(8,  'Chẩn Đoán Hình Ảnh Cao Cấp', 'Xét Nghiệm & Chẩn Đoán', 'chan-doan-hinh-anh',
  'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop',
  'Hệ thống X-quang kỹ thuật số, siêu âm 4D, CT 128 dãy và MRI 3.0 Tesla chuẩn quốc tế.',
  '["X-quang kỹ thuật số DR","Siêu âm màu 4D","CT 128 dãy đa lát cắt","MRI 3.0 Tesla"]',
  'Bệnh nhân cần chẩn đoán hình ảnh chính xác', 1, 8),

(9,  'Nội Soi Tiêu Hóa Có Gây Mê', 'Xét Nghiệm & Chẩn Đoán', 'noi-soi-tieu-hoa',
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop',
  'Nội soi dạ dày và đại tràng bằng máy NBI HD thế hệ mới, gây mê an toàn, không đau, kết quả ngay sau 30 phút.',
  '["Nội soi NBI HD phát hiện tổn thương sớm","Gây mê an toàn bởi bác sĩ gây mê chuyên nghiệp","Sinh thiết nếu cần thiết","Kết quả trong ngày"]',
  'Người có triệu chứng tiêu hóa hoặc tầm soát ung thư đại tràng', 1, 9),

-- ── Tiêm Chủng & Phòng Ngừa ──────────────────────────────────
(10, 'Tiêm Chủng Người Lớn', 'Tiêm Chủng & Phòng Ngừa', 'tiem-chung-nguoi-lon',
  'https://images.unsplash.com/photo-1558583055-d7ac00b1adbb?w=600&h=400&fit=crop',
  'Đầy đủ các loại vắc-xin khuyến cáo cho người lớn — HPV, cúm mùa, viêm gan A/B, phế cầu khuẩn.',
  '["Vắc-xin HPV (Gardasil 9)","Vắc-xin cúm tứ giá hàng năm","Viêm gan A & B","Phế cầu khuẩn, Uốn ván-Bạch hầu"]',
  'Người lớn từ 18 tuổi trở lên', 1, 10),

(11, 'Tiêm Chủng Trẻ Em', 'Tiêm Chủng & Phòng Ngừa', 'tiem-chung-tre-em',
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop',
  'Lịch tiêm chủng theo chuẩn Bộ Y tế và mở rộng quốc tế — theo dõi sổ tiêm điện tử cá nhân hóa.',
  '["Vắc-xin 6 trong 1 (Hexaxim/Infanrix)","Rota virus, Phế cầu PCV13","Thủy đậu, Sởi-Quai bị-Rubella","Theo dõi lịch nhắc tự động qua app"]',
  'Trẻ từ sơ sinh đến 12 tuổi', 1, 11),

(12, 'Tầm Soát Ung Thư Sớm', 'Tiêm Chủng & Phòng Ngừa', 'tam-soat-ung-thu',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
  'Gói tầm soát ung thư toàn diện với 8 chỉ điểm khối u và chẩn đoán hình ảnh chuyên sâu.',
  '["8 chỉ điểm ung thư: CEA, AFP, CA125, CA19-9, PSA...","Siêu âm vú & tuyến giáp","Chụp X-quang phổi & CT nếu cần","Tư vấn chuyên gia ung bướu"]',
  'Người từ 40 tuổi hoặc có yếu tố nguy cơ ung thư', 1, 12),

-- ── Phẫu Thuật & Thủ Thuật ───────────────────────────────────
(13, 'Phẫu Thuật Nội Soi Xâm Lấn Tối Thiểu', 'Phẫu Thuật & Thủ Thuật', 'phau-thuat-noi-soi',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop',
  'Phẫu thuật nội soi cắt ruột thừa, túi mật, thoát vị — vết mổ nhỏ, hồi phục nhanh, ít đau.',
  '["Phòng mổ chuẩn quốc tế JCI","Phẫu thuật viên kinh nghiệm 10+ năm","Gây mê toàn thân an toàn","Xuất viện sau 24–48h"]',
  'Bệnh nhân cần phẫu thuật bụng xâm lấn tối thiểu', 1, 13),

(14, 'Thủ Thuật Da Liễu Thẩm Mỹ Y Tế', 'Phẫu Thuật & Thủ Thuật', 'thu-thuat-da-lieu',
  'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop',
  'Điều trị mụn, sẹo, tàn nhang, nám bằng laser công nghệ cao — an toàn, không xâm lấn.',
  '["Laser CO2 Fractional trị sẹo rỗ","IPL trị tàn nhang & nám da","RF Microneedling căng da","Tư vấn phác đồ cá nhân hóa"]',
  'Người muốn cải thiện vấn đề da mặt an toàn theo y khoa', 1, 14),

(15, 'Phẫu Thuật Mắt & Điều Chỉnh Khúc Xạ', 'Phẫu Thuật & Thủ Thuật', 'phau-thuat-mat',
  'https://images.unsplash.com/photo-1516069677018-378b1174c2d0?w=600&h=400&fit=crop',
  'Phẫu thuật LASIK, SMILE và điều trị đục thủy tinh thể bằng máy Phaco thế hệ mới.',
  '["LASIK / SMILE điều chỉnh cận thị","Phẫu thuật Phaco đục thủy tinh thể","Khám mắt tiền phẫu toàn diện","Tái khám theo dõi miễn phí 1 năm"]',
  'Người cận thị, loạn thị và bệnh nhân đục thủy tinh thể', 1, 15),

-- ── Dịch Vụ Số & Hỗ Trợ ────────────────────────────────────
(16, 'Tư Vấn Sức Khỏe Trực Tuyến (Telemedicine)', 'Dịch Vụ Số & Hỗ Trợ', 'telemedicine',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
  'Gặp bác sĩ chuyên khoa qua video call bất cứ lúc nào — tiết kiệm thời gian, vẫn đảm bảo chất lượng tư vấn.',
  '["Video call với bác sĩ chuyên khoa","Đặt lịch online 24/7","Kê đơn điện tử & nhà thuốc giao tận nơi","Lưu trữ lịch sử khám trên app"]',
  'Người bận rộn, người ở xa, tái khám định kỳ', 1, 16),

(17, 'Khám Bệnh Tại Nhà', 'Dịch Vụ Số & Hỗ Trợ', 'kham-tai-nha',
  'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop',
  'Bác sĩ và điều dưỡng đến tận nhà khám — phù hợp người cao tuổi, hậu phẫu, bệnh mãn tính.',
  '["Khám tổng quát tại nhà","Lấy mẫu xét nghiệm tại nhà","Chăm sóc vết thương hậu phẫu","Đặt lịch trong vòng 2 giờ"]',
  'Người cao tuổi, hậu phẫu, bệnh nhân bất động', 1, 17),

(18, 'Hồ Sơ Y Tế Điện Tử & Nhắc Lịch Thông Minh', 'Dịch Vụ Số & Hỗ Trợ', 'ho-so-y-te-dien-tu',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
  'Quản lý toàn bộ hồ sơ y tế gia đình trên một ứng dụng — nhắc uống thuốc, tái khám tự động.',
  '["Hồ sơ y tế điện tử cá nhân & gia đình","Nhắc lịch uống thuốc theo đơn","Thông báo tái khám tự động (FCM)","Chia sẻ hồ sơ với bác sĩ điều trị"]',
  'Mọi bệnh nhân muốn quản lý sức khỏe chủ động', 1, 18);


-- ================================================================
--  9. NHÓM GIA ĐÌNH  (families)
--     6 nhóm cho 6 bệnh nhân (user id 2–7)
-- ================================================================
INSERT INTO families (id, user_id, family_name) VALUES
(1, 2, 'Gia đình Nguyễn (Demo)'),
(2, 3, 'Gia đình Nguyễn Văn Minh'),
(3, 4, 'Gia đình Trần Thị Hoa'),
(4, 5, 'Gia đình Lê Văn Tuấn'),
(5, 6, 'Gia đình Phạm Thu Nga'),
(6, 7, 'Gia đình Hoàng Văn Đức');


-- ================================================================
--  10. THÀNH VIÊN GIA ĐÌNH  (members)
--      3 thành viên mỗi nhóm — tổng 18 bản ghi
-- ================================================================
INSERT INTO members
  (id, family_id, full_name, dob, gender, blood_type, allergy, medical_history, relationship)
VALUES
-- ── Gia đình 1 (Demo) ──────────────────────────────────────────
(1,  1, 'Nguyễn Văn Test',      '1990-03-15', 'male',   'O+',  NULL,                     NULL,                          'Bản thân'),
(2,  1, 'Nguyễn Thị Test',      '1992-07-22', 'female', 'A+',  NULL,                     NULL,                          'Vợ/Chồng'),
(3,  1, 'Nguyễn Bé Test',       '2018-11-05', 'male',   NULL,  NULL,                     NULL,                          'Con'),

-- ── Gia đình 2 ─────────────────────────────────────────────────
(4,  2, 'Nguyễn Văn Minh',      '1985-06-12', 'male',   'B+',  'Penicillin',             'Tăng huyết áp',               'Bản thân'),
(5,  2, 'Lê Thị Lan',           '1988-09-20', 'female', 'O+',  NULL,                     NULL,                          'Vợ/Chồng'),
(6,  2, 'Nguyễn Văn Nam',       '2015-04-08', 'male',   'B+',  NULL,                     NULL,                          'Con'),

-- ── Gia đình 3 ─────────────────────────────────────────────────
(7,  3, 'Trần Thị Hoa',         '1978-01-30', 'female', 'AB+', NULL,                     'Đái tháo đường type 2',       'Bản thân'),
(8,  3, 'Phạm Văn Bình',        '1975-11-15', 'male',   'A+',  'Aspirin',                'Thoái hóa cột sống',          'Vợ/Chồng'),
(9,  3, 'Trần Minh Khoa',       '2005-08-22', 'male',   'AB+', NULL,                     NULL,                          'Con'),

-- ── Gia đình 4 ─────────────────────────────────────────────────
(10, 4, 'Lê Văn Tuấn',          '1992-05-18', 'male',   'O-',  NULL,                     NULL,                          'Bản thân'),
(11, 4, 'Nguyễn Thị Mai',       '1993-12-03', 'female', 'B+',  'Hải sản',                NULL,                          'Vợ/Chồng'),
(12, 4, 'Lê Thị Hương',         '1965-07-14', 'female', 'A-',  NULL,                     'Tăng huyết áp, Tiểu đường',   'Mẹ'),

-- ── Gia đình 5 ─────────────────────────────────────────────────
(13, 5, 'Phạm Thu Nga',         '1995-10-08', 'female', 'A+',  NULL,                     NULL,                          'Bản thân'),
(14, 5, 'Nguyễn Văn Hải',       '1935-03-25', 'male',   'O+',  'Sulfa',                  'Suy tim độ II, Tăng huyết áp', 'Ông/Bà'),
(15, 5, 'Lê Thị Yến',           '1938-09-10', 'female', 'B-',  NULL,                     'Loãng xương',                 'Ông/Bà'),

-- ── Gia đình 6 ─────────────────────────────────────────────────
(16, 6, 'Hoàng Văn Đức',        '1988-02-14', 'male',   'AB-', NULL,                     NULL,                          'Bản thân'),
(17, 6, 'Vũ Thị Linh',          '1990-06-30', 'female', 'O+',  'Phấn hoa, bụi nhà',      NULL,                          'Vợ/Chồng'),
(18, 6, 'Hoàng Minh Phúc',      '2020-12-01', 'male',   NULL,  NULL,                     NULL,                          'Con');


-- ================================================================
--  11. LỊCH LÀM VIỆC BÁC SĨ  (doctor_schedules)
--      Mỗi bác sĩ có 5 ngày làm việc mẫu (tháng 06/2025)
-- ================================================================
INSERT INTO doctor_schedules (id, doctor_id, date, is_off) VALUES
-- Bác sĩ 1 (Nguyễn Văn An - Tim mạch)
(1,  1, '2025-06-02', 0), (2,  1, '2025-06-03', 0), (3,  1, '2025-06-04', 0),
(4,  1, '2025-06-05', 0), (5,  1, '2025-06-06', 0),
-- Bác sĩ 2 (Trần Thị Bình - Nhi khoa)
(6,  2, '2025-06-02', 0), (7,  2, '2025-06-03', 0), (8,  2, '2025-06-04', 0),
(9,  2, '2025-06-05', 0), (10, 2, '2025-06-06', 0),
-- Bác sĩ 3 (Lê Minh Tuấn - Da liễu)
(11, 3, '2025-06-02', 0), (12, 3, '2025-06-03', 0), (13, 3, '2025-06-04', 0),
(14, 3, '2025-06-05', 1), (15, 3, '2025-06-06', 0),  -- 05/06 nghỉ
-- Bác sĩ 4 (Phạm Thị Lan - Thần kinh)
(16, 4, '2025-06-02', 0), (17, 4, '2025-06-03', 0), (18, 4, '2025-06-04', 0),
(19, 4, '2025-06-05', 0), (20, 4, '2025-06-06', 0),
-- Bác sĩ 5 (Võ Thanh Quang - TMH)
(21, 5, '2025-06-02', 0), (22, 5, '2025-06-03', 0), (23, 5, '2025-06-04', 0),
(24, 5, '2025-06-05', 0), (25, 5, '2025-06-06', 0);


-- ================================================================
--  12. KHUNG GIỜ KHÁM  (slots)
--      Mỗi ngày 2 ca: sáng (3 slot) và chiều (3 slot)
--      Chỉ tạo cho bác sĩ 1 và 2 làm ví dụ đầy đủ
-- ================================================================
INSERT INTO slots (id, schedule_id, start_time, end_time, max_patients, current_patients, is_locked) VALUES
-- Bác sĩ 1, ngày 02/06 (schedule_id=1)
(1,  1, '08:00', '08:30', 1, 1, 0),  -- đã đặt đầy
(2,  1, '08:30', '09:00', 1, 0, 0),  -- còn trống
(3,  1, '09:00', '09:30', 1, 0, 0),
(4,  1, '13:30', '14:00', 1, 1, 0),  -- đã đặt đầy
(5,  1, '14:00', '14:30', 1, 0, 0),
(6,  1, '14:30', '15:00', 1, 0, 0),
-- Bác sĩ 1, ngày 03/06 (schedule_id=2)
(7,  2, '08:00', '08:30', 1, 0, 0),
(8,  2, '08:30', '09:00', 1, 0, 0),
(9,  2, '09:00', '09:30', 1, 0, 0),
(10, 2, '13:30', '14:00', 1, 0, 0),
(11, 2, '14:00', '14:30', 1, 0, 0),
(12, 2, '14:30', '15:00', 1, 0, 0),
-- Bác sĩ 2, ngày 02/06 (schedule_id=6)
(13, 6, '08:00', '08:30', 1, 1, 0),  -- đã đặt
(14, 6, '08:30', '09:00', 1, 0, 0),
(15, 6, '09:00', '09:30', 1, 0, 0),
(16, 6, '09:30', '10:00', 1, 0, 0),
(17, 6, '13:30', '14:00', 1, 0, 0),
(18, 6, '14:00', '14:30', 1, 0, 0);


-- ================================================================
--  13. LỊCH HẸN  (appointments)
--      10 lịch hẹn mẫu với đầy đủ trạng thái
-- ================================================================
INSERT INTO appointments
  (id, user_id, member_id, doctor_id, hospital_id, slot_id,
   appointment_type, appointment_date, reason, status, reason_cancel, guest_name, guest_phone)
VALUES
(1,  2, 1,  1, 1, 1,    'clinic', '2025-06-02', 'Đau tức ngực, khó thở khi gắng sức',                 'completed', NULL, NULL, NULL),
(2,  2, 2,  8, 1, NULL, 'clinic', '2025-06-10', 'Khám thai định kỳ tuần 28',                          'confirmed', NULL, NULL, NULL),
(3,  3, 4,  1, 1, 4,    'clinic', '2025-06-02', 'Kiểm tra huyết áp định kỳ, đang dùng thuốc',         'completed', NULL, NULL, NULL),
(4,  3, 5,  2, 1, 13,   'clinic', '2025-06-02', 'Con gái bị sốt 3 ngày, ho nhiều',                   'completed', NULL, NULL, NULL),
(5,  4, 7,  10, 1, NULL, 'clinic', '2025-06-05', 'Kiểm tra đường huyết, đang điều trị tiểu đường',    'confirmed', NULL, NULL, NULL),
(6,  4, 8,  7, 1, NULL, 'video',  '2025-06-08', 'Đau lưng lan xuống chân trái từ 2 tuần nay',        'pending',   NULL, NULL, NULL),
(7,  5, 10, 4, 1, NULL, 'clinic', '2025-06-15', 'Nhức đầu thường xuyên, chóng mặt buổi sáng',        'pending',   NULL, NULL, NULL),
(8,  6, 13, 3, 1, NULL, 'clinic', '2025-06-12', 'Mụn trứng cá nặng, muốn điều trị laser',            'confirmed', NULL, NULL, NULL),
(9,  2, 1,  9, 2, NULL, 'clinic', '2025-05-20', 'Khám mắt định kỳ, đo độ cận thị',                   'completed', NULL, NULL, NULL),
(10, 7, 16, 5, 1, NULL, 'clinic', '2025-04-15', 'Viêm xoang mãn tính, nghẹt mũi kéo dài',           'cancelled', 'Bệnh nhân xin hủy vì bận công tác', NULL, NULL);


-- ================================================================
--  14. KẾT QUẢ KHÁM  (examination_results)
--      Chỉ lịch hẹn "completed" mới có kết quả
-- ================================================================
INSERT INTO examination_results
  (id, appointment_id, diagnosis, notes, treatment_plan, follow_up_date)
VALUES
(1, 1, 'Tăng huyết áp độ I, nghi ngờ rối loạn nhịp tim sớm',
   'Huyết áp 145/92 mmHg, nhịp tim không đều nhẹ trên ECG. Siêu âm tim chưa ghi nhận bất thường cấu trúc.',
   'Khởi đầu thuốc hạ áp Amlodipine 5mg/ngày. Hạn chế muối, giảm cân. Tái khám sau 4 tuần mang theo Holter ECG.',
   '2025-07-02'),
(2, 3, 'Tăng huyết áp đang được kiểm soát tốt',
   'Huyết áp 128/80 mmHg, ổn định với phác đồ hiện tại. Không có biến chứng mới.',
   'Tiếp tục thuốc huyết áp hiện tại. Duy trì chế độ ăn nhạt muối và tập thể dục 30 phút/ngày.',
   '2025-09-02'),
(3, 4, 'Viêm tiểu phế quản cấp, sốt virus',
   'Trẻ sốt 38.8°C, nghe phổi có ran nhỏ 2 bên đáy. SpO2 97%. Không cần nhập viện.',
   'Paracetamol 10mg/kg khi sốt. Thuốc giãn phế quản khí dung 3 lần/ngày. Hút mũi, uống nhiều nước.',
   '2025-06-09'),
(4, 9, 'Cận thị 2 mắt, độ ổn định',
   'Mắt phải: -3.50D, mắt trái: -3.25D. Độ không thay đổi so với 1 năm trước. Mắt khỏe mạnh.',
   'Thay kính mới theo đơn. Đủ điều kiện phẫu thuật SMILE nếu muốn. Tái khám sau 1 năm.',
   '2026-05-20');


-- ================================================================
--  15. HỒ SƠ KHÁM BỆNH  (medical_records)
--      Tạo từ kết quả các lịch hẹn completed
-- ================================================================
INSERT INTO medical_records
  (id, member_id, appointment_id, visit_date, hospital_name, doctor_name, reason, diagnosis, notes)
VALUES
(1, 1, 1,  '2025-06-02', 'Bệnh viện VitaFamily', 'PGS. TS. BS. Nguyễn Văn An',
   'Đau tức ngực, khó thở khi gắng sức', 'Tăng huyết áp độ I, rối loạn nhịp tim sớm',
   'Bắt đầu điều trị Amlodipine, theo dõi ECG'),
(2, 4, 3,  '2025-06-02', 'Bệnh viện VitaFamily', 'PGS. TS. BS. Nguyễn Văn An',
   'Kiểm tra huyết áp định kỳ', 'Tăng huyết áp đang kiểm soát tốt',
   'Huyết áp 128/80 ổn định'),
(3, 5, 4,  '2025-06-02', 'Bệnh viện VitaFamily', 'TS. BS. Trần Thị Bình',
   'Sốt 3 ngày, ho nhiều', 'Viêm tiểu phế quản cấp, sốt virus',
   'Điều trị ngoại trú, tái khám sau 7 ngày'),
(4, 1, 9,  '2025-05-20', 'Phòng khám VitaFamily Quận 7', 'TS. BS. Phạm Quốc Bình',
   'Khám mắt định kỳ', 'Cận thị 2 mắt, độ ổn định',
   'Thay kính mới, đủ tiêu chuẩn SMILE'),
(5, 4, NULL, '2024-12-15', 'Bệnh viện Bạch Mai', NULL,
   'Đau đầu, chóng mặt', 'Thiếu máu nhẹ, thiếu sắt',
   'Nhập tay từ lần khám bên ngoài hệ thống. Bổ sung sắt 3 tháng.');


-- ================================================================
--  16. ĐƠN THUỐC & CHI TIẾT  (prescriptions + prescription_items)
-- ================================================================
INSERT INTO prescriptions (id, medical_record_id, doctor_id, notes) VALUES
(1, 1, 1, 'Uống thuốc đúng giờ, không bỏ liều. Tái khám ngay nếu đau ngực tái phát.'),
(2, 2, 1, 'Tiếp tục phác đồ cũ. Ăn nhạt, hạn chế rượu bia.'),
(3, 3, 2, 'Uống đủ nước 1.5 lít/ngày. Hút mũi trước khi cho uống thuốc.');

INSERT INTO prescription_items
  (id, prescription_id, medicine_name, dosage, frequency, time_slots, start_date, end_date, notes)
VALUES
(1, 1, 'Amlodipine 5mg',    '1 viên', '1 lần/ngày vào buổi sáng',  '["Sáng"]',           '2025-06-02', NULL,         'Uống sau ăn sáng'),
(2, 1, 'Aspirin 81mg',      '1 viên', '1 lần/ngày vào buổi tối',   '["Tối"]',            '2025-06-02', NULL,         'Uống sau ăn tối, không nhai'),
(3, 2, 'Amlodipine 5mg',    '1 viên', '1 lần/ngày vào buổi sáng',  '["Sáng"]',           '2025-06-02', NULL,         NULL),
(4, 3, 'Salbutamol khí dung', '2.5mg/lần', '3 lần/ngày',           '["Sáng","Trưa","Tối"]', '2025-06-02', '2025-06-09', 'Xịt trước ăn 30 phút'),
(5, 3, 'Paracetamol 250mg', '1 gói', 'Khi sốt trên 38.5°C, cách 4–6h', '["Sáng","Trưa","Chiều","Tối"]', '2025-06-02', '2025-06-09', 'Chỉ dùng khi sốt, tối đa 4 lần/ngày');


-- ================================================================
--  17. NHẮC UỐNG THUỐC  (reminders)
--      Một số bản ghi mẫu cho thuốc của bệnh nhân id=1
-- ================================================================
INSERT INTO reminders (id, prescription_item_id, remind_time, status) VALUES
(1, 1, '2025-06-03 07:30:00', 'taken'),
(2, 2, '2025-06-03 20:00:00', 'taken'),
(3, 1, '2025-06-04 07:30:00', 'taken'),
(4, 2, '2025-06-04 20:00:00', 'skipped'),
(5, 1, '2025-06-05 07:30:00', 'sent'),
(6, 2, '2025-06-05 20:00:00', 'pending'),
(7, 4, '2025-06-02 07:00:00', 'taken'),
(8, 4, '2025-06-02 12:00:00', 'taken'),
(9, 4, '2025-06-02 19:00:00', 'taken');


-- ================================================================
--  18. ĐÁNH GIÁ LỊCH HẸN  (appointment_reviews)
--      Chỉ lịch hẹn "completed" mới được đánh giá
-- ================================================================
INSERT INTO appointment_reviews
  (id, appointment_id, user_id, doctor_id, rating, comment, is_visible)
VALUES
(1, 1, 2, 1, 5, 'Bác sĩ Nguyễn Văn An rất tận tâm, giải thích chi tiết tình trạng bệnh và hướng điều trị rõ ràng. Rất yên tâm!', 1),
(2, 3, 3, 1, 5, 'Bác sĩ khám kỹ lưỡng, hỏi thăm cặn kẽ tiền sử bệnh. Thái độ thân thiện, dễ gần. Sẽ quay lại khám tiếp.', 1),
(3, 4, 3, 2, 5, 'BS Bình rất kiên nhẫn với trẻ nhỏ, biết cách dỗ bé không khóc. Chẩn đoán chính xác, cho thuốc phù hợp.', 1),
(4, 9, 2, 9, 4, 'Phòng khám sạch sẽ, đội ngũ y tế chuyên nghiệp. Bác sĩ Bình tư vấn kỹ về lựa chọn phẫu thuật SMILE.', 1);


-- ================================================================
--  19. THÔNG BÁO CÁ NHÂN  (notifications)
-- ================================================================
INSERT INTO notifications (id, user_id, title, content, type, related_id, is_read) VALUES
(1, 2, 'Lịch hẹn đã được xác nhận', 'Lịch hẹn khám với BS. Hoàng Thị Mai ngày 10/06/2025 đã được xác nhận. Vui lòng đến đúng giờ.', 'appointment', 2, 0),
(2, 2, 'Nhắc uống thuốc', 'Đã đến giờ uống Amlodipine 5mg (buổi sáng). Nhớ uống sau ăn sáng!', 'medicine', 5, 1),
(3, 3, 'Lịch hẹn đã được xác nhận', 'Lịch hẹn khám nội tiết cho bạn Trần Thị Hoa ngày 05/06/2025 đã được BS. Nguyễn Thu Hà xác nhận.', 'appointment', 5, 0),
(4, 4, 'Lịch hẹn chờ xác nhận', 'Lịch hẹn tư vấn video với BS. Đặng Văn Hùng ngày 08/06/2025 đang chờ xác nhận từ bác sĩ.', 'appointment', 6, 1),
(5, 7, 'Lịch hẹn đã bị hủy', 'Lịch hẹn với BS. Võ Thanh Quang ngày 15/04/2025 đã được hủy theo yêu cầu của bạn.', 'appointment', 10, 1),
(6, 2, 'Thông báo từ VitaFamily', 'VitaFamily vừa ra mắt tính năng theo dõi sức khỏe gia đình. Trải nghiệm ngay!', 'system', NULL, 0);


-- ================================================================
--  20. BÀI VIẾT TIN TỨC  (articles)
--      6 bài viết — khớp với news trong db.json
-- ================================================================
INSERT INTO articles
  (id, title, slug, category, summary, content, thumbnail, author_id, published_at, is_published)
VALUES
(1,
 'VitaFamily triển khai hệ thống đặt lịch trực tuyến thế hệ mới',
 'vitafamily-dat-lich-truc-tuyen-moi',
 'Tin tức',
 'Hệ thống đặt lịch mới giúp bệnh nhân dễ dàng kết nối với bác sĩ chuyên khoa 24/7.',
 '<p>Bệnh viện VitaFamily vừa chính thức ra mắt hệ thống đặt lịch khám trực tuyến thế hệ mới, cho phép bệnh nhân đặt lịch với bác sĩ chuyên khoa bất kỳ lúc nào, từ bất kỳ thiết bị nào.</p><p>Hệ thống mới hỗ trợ 3 hình thức khám: tại cơ sở, tại nhà và tư vấn video. Bệnh nhân có thể theo dõi lịch sử khám, quản lý hồ sơ gia đình và nhận nhắc nhở uống thuốc tự động.</p>',
 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
 1, '2024-06-10', 1),

(2,
 'Phòng khám tim mạch VitaFamily đạt chứng chỉ quốc tế JCI',
 'phong-kham-tim-mach-dat-chung-chi-jci',
 'Thành tựu',
 'Chứng chỉ JCI khẳng định chất lượng dịch vụ y tế đạt chuẩn quốc tế của VitaFamily.',
 '<p>Khoa Tim mạch, Bệnh viện VitaFamily vừa được Ủy ban Quốc tế JCI (Joint Commission International) cấp chứng chỉ công nhận chất lượng — một trong những chứng nhận y tế uy tín nhất thế giới.</p><p>Để đạt được chứng chỉ này, khoa Tim mạch đã trải qua quá trình đánh giá toàn diện về quy trình lâm sàng, an toàn bệnh nhân và tiêu chuẩn chăm sóc y tế trong suốt 18 tháng.</p>',
 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop',
 1, '2024-05-22', 1),

(3,
 'Hội thảo sức khỏe cộng đồng: Phòng ngừa đột quỵ mùa hè',
 'hoi-thao-phong-ngua-dot-quy',
 'Sự kiện',
 'Hội thảo miễn phí với sự tham gia của các chuyên gia đầu ngành thần kinh học.',
 '<p>Bệnh viện VitaFamily tổ chức hội thảo sức khỏe cộng đồng miễn phí với chủ đề <strong>"Phòng ngừa đột quỵ trong mùa hè"</strong> vào ngày 20/05/2024.</p><p>GS.TS.BS. Phạm Thị Lan — chuyên gia đầu ngành thần kinh học sẽ chia sẻ về các dấu hiệu nhận biết đột quỵ sớm, cách xử trí ban đầu và biện pháp phòng ngừa hiệu quả.</p>',
 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop',
 1, '2024-05-15', 1),

(4,
 'Dinh dưỡng thông minh: Chế độ ăn giúp tăng cường miễn dịch',
 'dinh-duong-tang-cuong-mien-dich',
 'Sức khỏe',
 'Các chuyên gia dinh dưỡng VitaFamily chia sẻ bí quyết xây dựng hệ miễn dịch khỏe mạnh.',
 '<p>Hệ miễn dịch đóng vai trò then chốt trong việc bảo vệ cơ thể khỏi bệnh tật. Các chuyên gia dinh dưỡng tại VitaFamily chia sẻ những nguyên tắc cơ bản giúp tăng cường sức đề kháng qua chế độ ăn uống khoa học.</p><p><strong>Thực phẩm nên bổ sung:</strong> Trái cây giàu Vitamin C, rau lá xanh, tỏi, gừng, nghệ và các loại hạt giàu kẽm và selen.</p>',
 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
 1, '2024-04-30', 1),

(5,
 'VitaFamily mở rộng cơ sở tại TP. Hồ Chí Minh',
 'vitafamily-mo-rong-co-so-hcm',
 'Tin tức',
 'Cơ sở mới tại Quận 7 với quy mô 5 tầng và đầy đủ trang thiết bị hiện đại.',
 '<p>Bệnh viện VitaFamily chính thức khai trương phòng khám chuyên khoa tại Quận 7, TP. Hồ Chí Minh — cơ sở thứ hai tại thành phố này.</p><p>Phòng khám có quy mô 5 tầng với đầy đủ các chuyên khoa tim mạch, nhi khoa, sản phụ khoa và nội tiết. Trang thiết bị máy móc hiện đại ngang tầm cơ sở chính tại Quận 1.</p>',
 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop',
 1, '2024-04-12', 1),

(6,
 'Tầm soát ung thư sớm: Cơ hội sống khỏe cho mọi gia đình',
 'tam-soat-ung-thu-som',
 'Sức khỏe',
 'Chương trình tầm soát ung thư miễn phí dành cho 1.000 bệnh nhân đầu tiên đăng ký.',
 '<p>Phát hiện ung thư sớm ở giai đoạn I có tỷ lệ chữa khỏi lên tới 90%. Bệnh viện VitaFamily triển khai chương trình tầm soát ung thư miễn phí cho 1.000 bệnh nhân đầu tiên đăng ký trong tháng 04/2024.</p><p>Gói tầm soát bao gồm 8 chỉ điểm ung thư (CEA, AFP, CA125, CA19-9, PSA, CA15-3, CA72-4, SCC), siêu âm vú & tuyến giáp và tư vấn trực tiếp với chuyên gia ung bướu PGS.TS. Mai Thị Phương.</p>',
 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
 1, '2024-03-28', 1);


-- ================================================================
--  21. BANNER TRANG CHỦ  (hero_banners)
--      3 slide — khớp với heroBanners trong db.json
-- ================================================================
INSERT INTO hero_banners
  (id, title, subtitle, image_url, cta_primary, cta_secondary, sort_order, is_active)
VALUES
(1,
 'Sức khỏe của bạn — Ưu tiên hàng đầu của chúng tôi',
 'Đội ngũ bác sĩ chuyên khoa hàng đầu, trang thiết bị hiện đại, dịch vụ tận tâm — VitaFamily đồng hành cùng sức khỏe gia đình bạn.',
 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1440&h=600&fit=crop',
 'Đặt lịch khám ngay', 'Tìm bác sĩ', 0, 1),

(2,
 'Chuyên khoa đa dạng — Chăm sóc toàn diện',
 'Hơn 30 chuyên khoa với đội ngũ 120+ bác sĩ giàu kinh nghiệm, sẵn sàng phục vụ bạn mọi lúc.',
 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1440&h=600&fit=crop',
 'Xem chuyên khoa', 'Tư vấn trực tuyến', 1, 1),

(3,
 'Công nghệ y tế tiên tiến — Kết quả chính xác',
 'Hệ thống máy móc thế hệ mới nhất, quy trình chuẩn quốc tế JCI đảm bảo chất lượng dịch vụ vượt trội.',
 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1440&h=600&fit=crop',
 'Khám phá dịch vụ', 'Liên hệ ngay', 2, 1);


-- ================================================================
SET foreign_key_checks = 1;
-- ================================================================
--  Kết thúc file seed.
--  Tổng bản ghi:
--    users              : 19
--    specialties        : 12
--    hospitals          :  6
--    doctors            : 12
--    doctor_specialties : 14
--    doctor_hospitals   : 22
--    services           :  6
--    service_packages   : 18
--    families           :  6
--    members            : 18
--    doctor_schedules   : 25
--    slots              : 18
--    appointments       : 10
--    examination_results:  4
--    medical_records    :  5
--    prescriptions      :  3
--    prescription_items :  5
--    reminders          :  9
--    appointment_reviews:  4
--    notifications      :  6
--    articles           :  6
--    hero_banners       :  3
-- ================================================================
