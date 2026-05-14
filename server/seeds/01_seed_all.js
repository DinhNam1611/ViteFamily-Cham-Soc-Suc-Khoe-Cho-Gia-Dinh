'use strict';

const PWD = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

exports.seed = async function (knex) {
  await knex.raw('SET session_replication_role = replica');

  await knex.raw(`
    TRUNCATE TABLE
      hero_banners, articles, chat_messages, chat_sessions,
      system_notifications, notifications, appointment_reviews,
      reminders, prescription_items, prescriptions,
      medical_files, medical_records, examination_results,
      appointments, slots, doctor_schedules,
      doctor_hospitals, doctor_specialties, doctors,
      service_packages, services, hospitals, specialties,
      members, families, users, payment_settings
    RESTART IDENTITY CASCADE
  `);

  // ── 1. users ────────────────────────────────────────────────────
  await knex.raw(`
    INSERT INTO users (id, email, password, full_name, phone, avatar, role, status) VALUES
    (1,  'admin@vitafamily.vn',                 '${PWD}', 'Quản trị viên',                    '0901000001', NULL, 'admin',  'active'),
    (2,  'test@vitafamily.vn',                  '${PWD}', 'Nguyễn Văn Test',                  '0901000002', NULL, 'user',   'active'),
    (3,  'nguyen.van.minh@gmail.com',           '${PWD}', 'Nguyễn Văn Minh',                  '0901000003', NULL, 'user',   'active'),
    (4,  'tran.thi.hoa@gmail.com',              '${PWD}', 'Trần Thị Hoa',                     '0901000004', NULL, 'user',   'active'),
    (5,  'le.van.tuan@gmail.com',               '${PWD}', 'Lê Văn Tuấn',                      '0901000005', NULL, 'user',   'active'),
    (6,  'pham.thu.nga@gmail.com',              '${PWD}', 'Phạm Thu Nga',                     '0901000006', NULL, 'user',   'active'),
    (7,  'hoang.van.duc@gmail.com',             '${PWD}', 'Hoàng Văn Đức',                    '0901000007', NULL, 'user',   'active'),
    (8,  'dr.nguyen.van.an@vitafamily.vn',      '${PWD}', 'PGS. TS. BS. Nguyễn Văn An',       '0902000001', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (9,  'dr.tran.thi.binh@vitafamily.vn',      '${PWD}', 'TS. BS. Trần Thị Bình',            '0902000002', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (10, 'dr.le.minh.tuan@vitafamily.vn',       '${PWD}', 'BS. CKII. Lê Minh Tuấn',           '0902000003', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (11, 'dr.pham.thi.lan@vitafamily.vn',       '${PWD}', 'GS. TS. BS. Phạm Thị Lan',         '0902000004', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (12, 'dr.vo.thanh.quang@vitafamily.vn',     '${PWD}', 'TS. BS. Võ Thanh Quang',           '0902000005', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (13, 'dr.nguyen.thi.cam.tu@vitafamily.vn',  '${PWD}', 'ThS. BSCKII. Nguyễn Thị Cẩm Tú',  '0902000006', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (14, 'dr.dang.van.hung@vitafamily.vn',      '${PWD}', 'ThS. BS. Đặng Văn Hùng',           '0902000007', 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (15, 'dr.hoang.thi.mai@vitafamily.vn',      '${PWD}', 'BS. CKII. Hoàng Thị Mai',          '0902000008', 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (16, 'dr.pham.quoc.binh@vitafamily.vn',     '${PWD}', 'TS. BS. Phạm Quốc Bình',           '0902000009', 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (17, 'dr.nguyen.thu.ha@vitafamily.vn',      '${PWD}', 'ThS. BS. Nguyễn Thu Hà',           '0902000010', 'https://images.unsplash.com/photo-1588776814546-1ffbb319c654?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (18, 'dr.tran.dinh.nam@vitafamily.vn',      '${PWD}', 'BS. CKI. Trần Đình Nam',           '0902000011', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face', 'doctor', 'active'),
    (19, 'dr.mai.thi.phuong@vitafamily.vn',     '${PWD}', 'PGS. TS. BS. Mai Thị Phương',      '0902000012', 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=300&h=300&fit=crop&crop=face', 'doctor', 'active')
  `);

  // ── 2. specialties ───────────────────────────────────────────────
  await knex.raw(`
    INSERT INTO specialties (id, name, slug, icon, "group", group_label, description, common_diseases, staff_types, doctor_count, is_active, sort_order) VALUES
    (1,  'Tim mạch',                   'tim-mach',               'HeartOutlined',          'internal', 'Nội khoa',   'Chẩn đoán và điều trị các bệnh lý về tim và mạch máu.',                                                      '["Tăng huyết áp","Đau thắt ngực","Suy tim","Rối loạn nhịp tim","Xơ vữa động mạch"]',          '["Bác sĩ Tim mạch","Kỹ thuật viên siêu âm tim","Điều dưỡng chuyên khoa Tim mạch"]',                      12, true, 1),
    (2,  'Thần kinh',                  'than-kinh',              'ExperimentOutlined',     'internal', 'Nội khoa',   'Chẩn đoán và điều trị bệnh lý não bộ, tủy sống và hệ thần kinh ngoại biên.',                                   '["Đột quỵ","Bệnh Parkinson","Đau đầu mãn tính","Sa sút trí tuệ","Động kinh"]',                  '["Bác sĩ Thần kinh","Điều dưỡng Thần kinh","Kỹ thuật viên điện não đồ"]',                                  8, true, 2),
    (3,  'Nhi khoa',                   'nhi-khoa',               'SmileOutlined',          'internal', 'Nội khoa',   'Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 15 tuổi.',                                              '["Viêm phổi","Hen phế quản","Suy dinh dưỡng","Tiêu chảy cấp","Sốt xuất huyết trẻ em"]',       '["Bác sĩ Nhi khoa","Điều dưỡng Nhi","Chuyên viên dinh dưỡng Nhi"]',                                      15, true, 3),
    (4,  'Da liễu',                    'da-lieu',                'MedicineBoxOutlined',    'support',  'Hỗ trợ',     'Chẩn đoán và điều trị bệnh lý da, tóc và móng — bao gồm thẩm mỹ y tế.',                                       '["Mụn trứng cá","Eczema","Nám da","Vẩy nến","Rụng tóc","Viêm da dị ứng"]',                     '["Bác sĩ Da liễu","Kỹ thuật viên laser","Điều dưỡng thẩm mỹ"]',                                          10, true, 4),
    (5,  'Mắt',                        'mat',                    'EyeOutlined',            'surgical', 'Ngoại khoa', 'Chăm sóc, khám và phẫu thuật mắt — bao gồm phẫu thuật khúc xạ LASIK và SMILE.',                                '["Cận thị","Viễn thị","Loạn thị","Đục thủy tinh thể","Glaucoma","Thoái hóa điểm vàng"]',        '["Bác sĩ Nhãn khoa","Kỹ thuật viên khúc xạ","Kỹ thuật viên phẫu thuật mắt"]',                             7, true, 5),
    (6,  'Tai Mũi Họng',               'tai-mui-hong',           'AudioOutlined',          'surgical', 'Ngoại khoa', 'Chẩn đoán và phẫu thuật bệnh lý tai, mũi, họng và đầu cổ.',                                                   '["Viêm xoang mãn tính","Polyp mũi","Viêm amidan","Ù tai","Ngủ ngáy – ngưng thở khi ngủ"]',     '["Bác sĩ Tai Mũi Họng","Kỹ thuật viên nội soi","Điều dưỡng chuyên khoa TMH"]',                             9, true, 6),
    (7,  'Nội tiết',                   'noi-tiet',               'ExperimentOutlined',     'internal', 'Nội khoa',   'Chẩn đoán và điều trị rối loạn nội tiết tố — đái tháo đường, tuyến giáp, tuyến thượng thận.',                  '["Đái tháo đường type 2","Cường giáp","Suy giáp","Bướu cổ","Hội chứng Cushing"]',               '["Bác sĩ Nội tiết","Điều dưỡng chuyên khoa Nội tiết","Kỹ thuật viên xét nghiệm hormone"]',                6, true, 7),
    (8,  'Chấn thương chỉnh hình',     'chan-thuong-chinh-hinh', 'MedicineBoxOutlined',    'surgical', 'Ngoại khoa', 'Phẫu thuật và phục hồi chức năng bệnh lý xương, khớp và cột sống.',                                           '["Gãy xương","Thoái hóa cột sống","Thoát vị đĩa đệm","Đứt dây chằng","Viêm khớp dạng thấp"]', '["Bác sĩ Chấn thương chỉnh hình","Kỹ thuật viên phục hồi chức năng","Điều dưỡng Ngoại khoa"]',           11, true, 8),
    (9,  'Tiêu hóa',                   'tieu-hoa',               'MedicineBoxOutlined',    'internal', 'Nội khoa',   'Chẩn đoán và điều trị bệnh lý dạ dày, ruột, gan, mật và tụy.',                                                '["Viêm loét dạ dày","Hội chứng ruột kích thích","Xơ gan","Viêm đại tràng","Trào ngược dạ dày"]', '["Bác sĩ Tiêu hóa","Kỹ thuật viên nội soi","Điều dưỡng chuyên khoa Tiêu hóa"]',                          8, true, 9),
    (10, 'Xương khớp',                 'xuong-khop',             'MedicineBoxOutlined',    'surgical', 'Ngoại khoa', 'Phẫu thuật và điều trị bệnh lý khớp — thay khớp nhân tạo, nội soi khớp.',                                     '["Thoái hóa khớp gối","Loãng xương","Viêm gout","Đau lưng mãn tính","Hội chứng cổ tay"]',       '["Bác sĩ Xương khớp","Kỹ thuật viên phục hồi chức năng","Điều dưỡng Ngoại khoa"]',                        7, true, 10),
    (11, 'Sản phụ khoa',               'san-phu-khoa',           'HeartOutlined',          'internal', 'Nội khoa',   'Chăm sóc sức khỏe phụ nữ — thai sản, hỗ trợ sinh sản và phẫu thuật phụ khoa.',                                '["Thai kỳ nguy cơ cao","Vô sinh hiếm muộn","U nang buồng trứng","U xơ tử cung","Ung thư cổ tử cung"]', '["Bác sĩ Sản phụ khoa","Hộ sinh","Kỹ thuật viên siêu âm thai","Chuyên viên tư vấn sinh sản"]',   9, true, 11),
    (12, 'Ung bướu',                   'ung-buou',               'MedicineBoxOutlined',    'internal', 'Nội khoa',   'Chẩn đoán sớm và điều trị ung thư theo phác đồ đa mô thức quốc tế.',                                          '["Ung thư vú","Ung thư đại tràng","Ung thư dạ dày","Ung thư gan","Ung thư phổi"]',              '["Bác sĩ Ung bướu","Bác sĩ Xạ trị","Điều dưỡng Ung bướu","Kỹ thuật viên xạ trị"]',                       6, true, 12)
  `);

  // ── 3. hospitals ─────────────────────────────────────────────────
  await knex.raw(`
    INSERT INTO hospitals (id, name, address, city, phone, working_hours, is_active) VALUES
    (1, 'Bệnh viện VitaFamily',             '15 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh',         'TP. Hồ Chí Minh', '1800 1234',     'Thứ 2–7: 07:00–17:00; CN: 07:00–12:00',    true),
    (2, 'Phòng khám VitaFamily Quận 7',     '135 Nguyễn Thị Thập, Quận 7, TP. Hồ Chí Minh',      'TP. Hồ Chí Minh', '028 3820 1234', 'Thứ 2–7: 07:30–17:30',                     true),
    (3, 'Phòng khám VitaFamily Cầu Giấy',   '88 Xuân Thủy, Cầu Giấy, Hà Nội',                    'Hà Nội',          '024 3556 1234', 'Thứ 2–7: 07:30–17:30; CN: 08:00–12:00',    true),
    (4, 'Phòng khám VitaFamily Đà Nẵng',    '52 Lê Duẩn, Hải Châu, Đà Nẵng',                     'Đà Nẵng',         '0236 1234 567', 'Thứ 2–7: 07:00–17:00',                     true),
    (5, 'Phòng khám VitaFamily Hải Phòng',  '36 Điện Biên Phủ, Ngô Quyền, Hải Phòng',            'Hải Phòng',       '0225 1234 567', 'Thứ 2–7: 07:30–17:00',                     true),
    (6, 'Phòng khám VitaFamily Bình Dương', '29 Đại lộ Bình Dương, TP. Thủ Dầu Một, Bình Dương', 'Bình Dương',      '0274 1234 567', 'Thứ 2–7: 07:30–17:30',                     true)
  `);

  // ── 4. doctors ───────────────────────────────────────────────────
  await knex('doctors').insert([
    { id:1, user_id:8,  full_name:'PGS. TS. BS. Nguyễn Văn An',        slug:'nguyen-van-an',    qualifications:'Phó Giáo sư, Tiến sĩ Y khoa',        bio:'Chuyên gia hàng đầu về tim mạch can thiệp, siêu âm tim và điều trị bệnh lý mạch vành với hơn 20 năm kinh nghiệm.', sub_specialty:'Tim mạch can thiệp',            experience:20, consultation_fee:400000, rating:4.9, review_count:320, avatar:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh','Tiếng Pháp']), education:JSON.stringify([{period:'1990–1996',description:'Bác sĩ Y khoa, Đại học Y Hà Nội'},{period:'1996–1999',description:'Bác sĩ Nội trú, Đại học Y Hà Nội, chuyên ngành Tim Mạch'}]), certifications:JSON.stringify([{period:'2000–2002',description:'Đào tạo sau đại học, Tim Mạch Can Thiệp, Bệnh viện Lariboisière, Paris VII, Pháp.'},{period:'2010',description:'Phó Giáo sư, Tim Mạch học, Hội đồng Chức danh GS Nhà nước, VN.'}]), work_experience:JSON.stringify([{period:'1996–2000',description:'Bác sĩ nội trú, Khoa Tim Mạch, BV Bạch Mai'},{period:'2000–2010',description:'Bác sĩ Tim Mạch, Viện Tim Mạch QG Việt Nam'},{period:'2010–nay',description:'Trưởng Khoa Tim Mạch Can Thiệp, BV VitaFamily'}]), memberships:JSON.stringify(['Phó Chủ tịch Hội Tim Mạch học Việt Nam','Thành viên Hội Tim Mạch Can Thiệp Châu Á – TBD (APSIC)','Thành viên Hội Tim Mạch Châu Âu (ESC)']), special_interests:JSON.stringify(['Tim mạch can thiệp: đặt stent mạch vành, bít lỗ thông liên nhĩ, thay van tim qua da (TAVI)','Siêu âm tim màu Doppler và siêu âm tim qua thực quản','Chẩn đoán và điều trị suy tim, rối loạn nhịp tim, tăng huyết áp']), approval_status:'approved' },
    { id:2, user_id:9,  full_name:'TS. BS. Trần Thị Bình',              slug:'tran-thi-binh',    qualifications:'Tiến sĩ Y khoa',                      bio:'Bác sĩ nhi khoa giàu kinh nghiệm, chuyên về bệnh lý hô hấp, dinh dưỡng trẻ em và tư vấn lịch tiêm chủng.',       sub_specialty:'Nhi hô hấp & dinh dưỡng',       experience:15, consultation_fee:300000, rating:4.8, review_count:275, avatar:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'1994–2000',description:'Bác sĩ Y khoa, ĐH Y Dược TP.HCM'},{period:'2000–2003',description:'Bác sĩ Nội trú, chuyên ngành Nhi, ĐH Y Dược TP.HCM'}]), certifications:JSON.stringify([{period:'2008–2010',description:"Đào tạo sau đại học Nhi Hô Hấp, Royal Children's Hospital, Melbourne, Úc."},{period:'2015',description:'Tiến sĩ Y khoa, chuyên ngành Nhi Khoa, ĐH Y Dược TP.HCM.'}]), work_experience:JSON.stringify([{period:'2000–2009',description:'Bác sĩ Nhi Khoa, Khoa Hô Hấp, BV Nhi đồng 1'},{period:'2009–nay',description:'Bác sĩ chuyên khoa Nhi – Hô Hấp, BV VitaFamily'}]), memberships:JSON.stringify(['Thành viên Hội Nhi Khoa Việt Nam','Thành viên APSR Pediatric Section']), special_interests:JSON.stringify(['Bệnh hô hấp trẻ em: hen phế quản, viêm phổi, viêm tiểu phế quản','Dinh dưỡng và phát triển thể chất ở trẻ sơ sinh','Lịch tiêm chủng mở rộng và phòng bệnh truyền nhiễm']), approval_status:'approved' },
    { id:3, user_id:10, full_name:'BS. CKII. Lê Minh Tuấn',             slug:'le-minh-tuan',     qualifications:'Bác sĩ Chuyên khoa II',               bio:'Chuyên gia da liễu thẩm mỹ điều trị mụn, sẹo, nám bằng laser công nghệ cao và phác đồ cá nhân hóa.',             sub_specialty:'Da liễu thẩm mỹ & laser',       experience:10, consultation_fee:250000, rating:4.7, review_count:198, avatar:'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'1998–2004',description:'Bác sĩ Y khoa, Đại học Y Hà Nội'},{period:'2004–2007',description:'Bác sĩ Nội trú, Da Liễu, ĐH Y Hà Nội'}]), certifications:JSON.stringify([{period:'2012–2014',description:'Bác sĩ Chuyên khoa II Da Liễu, Học viện Quân Y.'},{period:'2016',description:'Đào tạo Laser thẩm mỹ da, Dermatology Institute, Singapore.'}]), work_experience:JSON.stringify([{period:'2007–2014',description:'Bác sĩ Da Liễu, BV Da Liễu TW Hà Nội'},{period:'2014–nay',description:'Bác sĩ Da Liễu – Thẩm mỹ, BV VitaFamily'}]), memberships:JSON.stringify(['Thành viên Hội Da Liễu Việt Nam']), special_interests:JSON.stringify(['Điều trị mụn, sẹo rỗ bằng laser CO2 Fractional, RF Microneedling','Trị nám, tàn nhang bằng IPL và laser Nd:YAG','Chăm sóc da y tế cá nhân hóa']), approval_status:'approved' },
    { id:4, user_id:11, full_name:'GS. TS. BS. Phạm Thị Lan',           slug:'pham-thi-lan',     qualifications:'Giáo sư, Tiến sĩ Y khoa',             bio:'Giáo sư đầu ngành thần kinh học, nghiên cứu chuyên sâu về đột quỵ, Parkinson và bệnh lý mạch máu não.',           sub_specialty:'Đột quỵ & bệnh mạch máu não',   experience:25, consultation_fee:500000, rating:4.9, review_count:410, avatar:'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh','Tiếng Pháp']), education:JSON.stringify([{period:'1984–1990',description:'Bác sĩ Y khoa, Đại học Y Hà Nội'},{period:'1990–1993',description:'Bác sĩ Nội trú, Thần Kinh, ĐH Y Hà Nội'}]), certifications:JSON.stringify([{period:'1995–1997',description:'Đào tạo Thần Kinh Mạch Máu, Paris VI, Pháp.'},{period:'2002',description:'Tiến sĩ Y khoa, Đại học Y Hà Nội.'},{period:'2012',description:'Giáo sư, Hội đồng Chức danh GS Nhà nước.'}]), work_experience:JSON.stringify([{period:'1990–1999',description:'Bác sĩ Thần Kinh, BV Bạch Mai'},{period:'1999–2015',description:'Trưởng Khoa Thần Kinh, BV Bạch Mai; Giảng viên ĐH Y HN'},{period:'2015–nay',description:'Cố vấn cấp cao, BV VitaFamily'}]), memberships:JSON.stringify(['Nguyên Chủ tịch Hội Thần Kinh học Việt Nam','Thành viên Hội Đột Quỵ Thế Giới (WSO)','Thành viên Ban chấp hành WFN']), special_interests:JSON.stringify(['Đột quỵ não cấp: tiêu sợi huyết và can thiệp nội mạch','Bệnh Parkinson, sa sút trí tuệ','Phục hồi chức năng thần kinh hậu đột quỵ']), approval_status:'approved' },
    { id:5, user_id:12, full_name:'TS. BS. Võ Thanh Quang',             slug:'vo-thanh-quang',   qualifications:'Tiến sĩ Y khoa',                      bio:'Chuyên gia tai mũi họng với kinh nghiệm phẫu thuật nội soi xoang, điều trị viêm xoang mãn tính và bệnh lý thanh quản.', sub_specialty:'Nội soi TMH & phẫu thuật xoang', experience:18, consultation_fee:300000, rating:4.8, review_count:245, avatar:'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'1988–1994',description:'Bác sĩ Y khoa, ĐH Y Hà Nội'},{period:'1994–1997',description:'Bác sĩ Nội trú, Tai Mũi Họng, ĐH Y Hà Nội'}]), certifications:JSON.stringify([{period:'2000–2002',description:'Đào tạo Phẫu thuật Tai, Đại học Lille, Pháp.'},{period:'2009',description:'Tiến sĩ Y khoa, ĐH Y Hà Nội.'}]), work_experience:JSON.stringify([{period:'1994–2006',description:'Bác sĩ TMH, BV Tai Mũi Họng TW Hà Nội'},{period:'2006–nay',description:'Trưởng Khoa TMH, BV VitaFamily'}]), memberships:JSON.stringify(['Nguyên Chủ tịch Hội TMH – Phẫu thuật Đầu Cổ VN','Nguyên Chủ tịch SEAMS','Thành viên IFOS']), special_interests:JSON.stringify(['Phẫu thuật nội soi mũi xoang (FESS)','Bệnh lý tai mũi họng người lớn và trẻ em','Phẫu thuật Amidan, VA và thanh quản']), approval_status:'approved' },
    { id:6, user_id:13, full_name:'ThS. BSCKII. Nguyễn Thị Cẩm Tú',    slug:'nguyen-thi-cam-tu', qualifications:'Thạc sĩ, Bác sĩ Chuyên khoa II',     bio:'Chuyên gia tiêu hóa với thế mạnh nội soi NBI phát hiện sớm tổn thương ung thư đại tràng và dạ dày.', sub_specialty:'Nội soi tiêu hóa & bệnh gan',   experience:12, consultation_fee:250000, rating:4.7, review_count:182, avatar:'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'1997–2003',description:'Bác sĩ Y khoa, ĐH Y Dược TP.HCM'},{period:'2003–2006',description:'Bác sĩ Nội trú, Nội Tiêu Hóa'}]), certifications:JSON.stringify([{period:'2014–2016',description:'BSCK II Nội Tiêu Hóa, ĐH Y Dược TP.HCM.'},{period:'2018',description:'Đào tạo nội soi NBI, Singapore General Hospital.'}]), work_experience:JSON.stringify([{period:'2006–2012',description:'Bác sĩ Tiêu Hóa, BV Chợ Rẫy'},{period:'2012–nay',description:'Bác sĩ Tiêu Hóa, BV VitaFamily'}]), memberships:JSON.stringify(['Thành viên Hội Tiêu Hóa Gan Mật Việt Nam']), special_interests:JSON.stringify(['Nội soi dạ dày và đại tràng NBI phát hiện ung thư sớm','Bệnh lý gan mãn tính: viêm gan B, C và xơ gan','Điều trị viêm loét dạ dày, GERD']), approval_status:'approved' },
    { id:7, user_id:14, full_name:'ThS. BS. Đặng Văn Hùng',             slug:'dang-van-hung',    qualifications:'Thạc sĩ Y khoa',                      bio:'Phẫu thuật viên chỉnh hình chuyên về thay khớp gối, khớp háng và điều trị thoái hóa khớp tiến triển.',          sub_specialty:'Phẫu thuật khớp & chỉnh hình', experience:14, consultation_fee:300000, rating:4.6, review_count:156, avatar:'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'1995–2001',description:'Bác sĩ Y khoa, ĐH Y Hà Nội'},{period:'2001–2004',description:'Bác sĩ Nội trú, Ngoại Chấn Thương Chỉnh Hình'}]), certifications:JSON.stringify([{period:'2006–2009',description:'Thạc sĩ Y khoa, Ngoại CTCH, ĐH Y Hà Nội.'},{period:'2013',description:'Đào tạo phẫu thuật nội soi khớp, AO Trauma Course Bangkok.'}]), work_experience:JSON.stringify([{period:'2004–2010',description:'Bác sĩ Ngoại CTCH, BV Việt Đức'},{period:'2010–nay',description:'Bác sĩ phẫu thuật Xương Khớp, BV VitaFamily'}]), memberships:JSON.stringify(['Thành viên Hội CTCH Việt Nam']), special_interests:JSON.stringify(['Phẫu thuật thay khớp gối toàn phần và khớp háng nhân tạo','Nội soi khớp: tái tạo dây chằng chéo trước','Tiêm PRP, hyaluronic acid điều trị thoái hóa khớp']), approval_status:'approved' },
    { id:8, user_id:15, full_name:'BS. CKII. Hoàng Thị Mai',             slug:'hoang-thi-mai',    qualifications:'Bác sĩ Chuyên khoa II',               bio:'Chuyên gia sản phụ khoa, theo dõi thai kỳ nguy cơ cao, hỗ trợ sinh sản và phẫu thuật nội soi phụ khoa.',         sub_specialty:'Sản khoa & hỗ trợ sinh sản',    experience:16, consultation_fee:350000, rating:4.9, review_count:388, avatar:'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'1993–1999',description:'Bác sĩ Y khoa, ĐH Y Hà Nội'},{period:'1999–2002',description:'Bác sĩ Nội trú, Sản Phụ Khoa, ĐH Y Hà Nội'}]), certifications:JSON.stringify([{period:'2005–2008',description:'BSCK II Sản Phụ Khoa, Học viện Quân Y.'},{period:'2011',description:'Đào tạo IVF, National University Hospital, Singapore.'}]), work_experience:JSON.stringify([{period:'1999–2008',description:'Bác sĩ Sản Phụ Khoa, BV Phụ Sản TW Hà Nội'},{period:'2008–nay',description:'Bác sĩ Sản Phụ Khoa & Hỗ trợ Sinh sản, BV VitaFamily'}]), memberships:JSON.stringify(['Thành viên Hội Sản Phụ Khoa Việt Nam','Thành viên VSAR']), special_interests:JSON.stringify(['Theo dõi thai kỳ nguy cơ cao: tiền sản giật, tiểu đường thai kỳ','Hỗ trợ sinh sản: IVF, IUI','Phẫu thuật nội soi phụ khoa: u nang, u xơ, lạc nội mạc']), approval_status:'approved' },
    { id:9, user_id:16, full_name:'TS. BS. Phạm Quốc Bình',             slug:'pham-quoc-binh',   qualifications:'Tiến sĩ Y khoa',                      bio:'Chuyên gia nhãn khoa với hơn 500 ca phẫu thuật LASIK/SMILE thành công và điều trị bệnh lý đáy mắt.',             sub_specialty:'Phẫu thuật khúc xạ LASIK & SMILE', experience:13, consultation_fee:300000, rating:4.8, review_count:221, avatar:'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'1996–2002',description:'Bác sĩ Y khoa, ĐH Y Dược TP.HCM'},{period:'2002–2005',description:'Bác sĩ Nội trú, Nhãn Khoa'}]), certifications:JSON.stringify([{period:'2009–2011',description:'Tiến sĩ Y khoa, Nhãn Khoa, ĐH Y Dược TP.HCM.'},{period:'2014',description:'Đào tạo LASIK/SMILE, APAO Singapore.'}]), work_experience:JSON.stringify([{period:'2005–2011',description:'Bác sĩ Nhãn Khoa, BV Mắt TP.HCM'},{period:'2011–nay',description:'Bác sĩ Nhãn Khoa – Khúc Xạ, BV VitaFamily'}]), memberships:JSON.stringify(['Thành viên Hội Nhãn Khoa Việt Nam','Thành viên APAO']), special_interests:JSON.stringify(['Phẫu thuật LASIK, SMILE điều trị cận thị, viễn thị, loạn thị','Phẫu thuật Phaco đục thủy tinh thể','Chẩn đoán glaucoma, thoái hóa điểm vàng']), approval_status:'approved' },
    { id:10, user_id:17, full_name:'ThS. BS. Nguyễn Thu Hà',            slug:'nguyen-thu-ha',    qualifications:'Thạc sĩ Y khoa',                      bio:'Chuyên gia nội tiết điều trị đái tháo đường type 1 & 2, rối loạn tuyến giáp và bệnh lý nội tiết tố.',            sub_specialty:'Đái tháo đường & tuyến giáp',   experience:11, consultation_fee:250000, rating:4.7, review_count:167, avatar:'https://images.unsplash.com/photo-1588776814546-1ffbb319c654?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'1998–2004',description:'Bác sĩ Y khoa, ĐH Y Hà Nội'},{period:'2004–2007',description:'Bác sĩ Nội trú, Nội Tổng Hợp – Nội Tiết'}]), certifications:JSON.stringify([{period:'2009–2012',description:'Thạc sĩ Y khoa, Nội Tiết Đái Tháo Đường, ĐH Y Hà Nội.'},{period:'2016',description:'Đào tạo quản lý ĐTĐ toàn diện, IDF Asia-Pacific.'}]), work_experience:JSON.stringify([{period:'2007–2013',description:'Bác sĩ Nội Tiết, BV Nội Tiết TW Hà Nội'},{period:'2013–nay',description:'Bác sĩ Nội Tiết, BV VitaFamily'}]), memberships:JSON.stringify(['Thành viên Hội Nội Tiết – Đái Tháo Đường Việt Nam']), special_interests:JSON.stringify(['Chẩn đoán và quản lý đái tháo đường type 1, 2, thai kỳ','Rối loạn tuyến giáp: cường giáp, suy giáp, bướu giáp','Hội chứng buồng trứng đa nang, suy tuyến thượng thận']), approval_status:'approved' },
    { id:11, user_id:18, full_name:'BS. CKI. Trần Đình Nam',            slug:'tran-dinh-nam',    qualifications:'Bác sĩ Chuyên khoa I',                bio:'Bác sĩ tim mạch tập trung vào tim mạch nhi, dị tật tim bẩm sinh và can thiệp mạch vành ít xâm lấn.',              sub_specialty:'Tim mạch nhi & dị tật bẩm sinh', experience:8, consultation_fee:250000, rating:4.6, review_count:134, avatar:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh']), education:JSON.stringify([{period:'2003–2009',description:'Bác sĩ Y khoa, ĐH Y Dược TP.HCM'},{period:'2009–2012',description:'Bác sĩ Nội trú, Tim Mạch'}]), certifications:JSON.stringify([{period:'2014–2016',description:"BSCK I Tim Mạch, ĐH Y Dược TP.HCM."},{period:'2019',description:"Đào tạo tim mạch nhi, Children's Heart Center Bangkok."}]), work_experience:JSON.stringify([{period:'2012–2016',description:'Bác sĩ Tim Mạch, BV Nhi đồng 2'},{period:'2016–nay',description:'Bác sĩ Tim Mạch – Tim Mạch Nhi, BV VitaFamily'}]), memberships:JSON.stringify([]), special_interests:JSON.stringify(['Tim mạch nhi: dị tật tim bẩm sinh','Can thiệp mạch vành ít xâm lấn','Siêu âm tim Doppler']), approval_status:'approved' },
    { id:12, user_id:19, full_name:'PGS. TS. BS. Mai Thị Phương',       slug:'mai-thi-phuong',   qualifications:'Phó Giáo sư, Tiến sĩ Y khoa',        bio:'Phó Giáo sư đầu ngành ung bướu, điều trị ung thư vú và ung thư tiêu hóa theo phác đồ đa mô thức quốc tế.',       sub_specialty:'Ung thư vú & tiêu hóa',         experience:22, consultation_fee:450000, rating:4.9, review_count:356, avatar:'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=300&h=300&fit=crop&crop=face', languages:JSON.stringify(['Tiếng Việt','Tiếng Anh','Tiếng Pháp']), education:JSON.stringify([{period:'1986–1992',description:'Bác sĩ Y khoa, ĐH Y Hà Nội'},{period:'1992–1995',description:'Bác sĩ Nội trú, Ung Bướu'}]), certifications:JSON.stringify([{period:'1998–2000',description:'Đào tạo Ung Thư Lâm Sàng, Institut Gustave Roussy, Paris.'},{period:'2004',description:'Tiến sĩ Y khoa, ĐH Y Hà Nội.'},{period:'2014',description:'Phó Giáo sư, Hội đồng Chức danh GS Nhà nước.'}]), work_experience:JSON.stringify([{period:'1992–2005',description:'Bác sĩ Ung Bướu, BV K TW Hà Nội'},{period:'2005–2015',description:'Phó Trưởng Khoa Ung Bướu; Giảng viên ĐH Y Hà Nội'},{period:'2015–nay',description:'Trưởng TT Ung Bướu, BV VitaFamily'}]), memberships:JSON.stringify(['Phó Chủ tịch Hội Ung Thư Việt Nam','Thành viên FACO','Thành viên ASCO']), special_interests:JSON.stringify(['Ung thư vú: phẫu thuật bảo tồn, hóa trị, xạ trị, liệu pháp nhắm đích','Ung thư đường tiêu hóa: dạ dày, đại tràng, gan, tụy','Chẩn đoán sớm ung thư và tư vấn di truyền']), approval_status:'approved' },
  ]);

  // ── 5. doctor_specialties ────────────────────────────────────────
  await knex('doctor_specialties').insert([
    { doctor_id:1,  specialty_id:1,  is_primary:true  },
    { doctor_id:2,  specialty_id:3,  is_primary:true  },
    { doctor_id:3,  specialty_id:4,  is_primary:true  },
    { doctor_id:4,  specialty_id:2,  is_primary:true  },
    { doctor_id:5,  specialty_id:6,  is_primary:true  },
    { doctor_id:6,  specialty_id:9,  is_primary:true  },
    { doctor_id:7,  specialty_id:10, is_primary:true  },
    { doctor_id:7,  specialty_id:8,  is_primary:false },
    { doctor_id:8,  specialty_id:11, is_primary:true  },
    { doctor_id:9,  specialty_id:5,  is_primary:true  },
    { doctor_id:10, specialty_id:7,  is_primary:true  },
    { doctor_id:11, specialty_id:1,  is_primary:true  },
    { doctor_id:11, specialty_id:3,  is_primary:false },
    { doctor_id:12, specialty_id:12, is_primary:true  },
  ]);

  // ── 6. doctor_hospitals ──────────────────────────────────────────
  await knex('doctor_hospitals').insert([
    { doctor_id:1,  hospital_id:1 }, { doctor_id:1,  hospital_id:3 },
    { doctor_id:2,  hospital_id:1 }, { doctor_id:2,  hospital_id:2 },
    { doctor_id:3,  hospital_id:1 }, { doctor_id:3,  hospital_id:2 },
    { doctor_id:4,  hospital_id:1 }, { doctor_id:4,  hospital_id:3 },
    { doctor_id:5,  hospital_id:1 }, { doctor_id:5,  hospital_id:3 },
    { doctor_id:6,  hospital_id:1 }, { doctor_id:6,  hospital_id:2 },
    { doctor_id:7,  hospital_id:1 },
    { doctor_id:8,  hospital_id:1 }, { doctor_id:8,  hospital_id:2 },
    { doctor_id:9,  hospital_id:1 }, { doctor_id:9,  hospital_id:2 },
    { doctor_id:10, hospital_id:1 }, { doctor_id:10, hospital_id:3 },
    { doctor_id:11, hospital_id:1 },
    { doctor_id:12, hospital_id:1 }, { doctor_id:12, hospital_id:3 },
  ]);

  // ── 7. services ──────────────────────────────────────────────────
  await knex('services').insert([
    { id:1, name:'Khám tổng quát',     icon:'MedicineBoxOutlined',       description:'Kiểm tra sức khỏe toàn diện với đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm.',    slug:'kham-tong-quat',     sort_order:1, is_active:true },
    { id:2, name:'Xét nghiệm',         icon:'ExperimentOutlined',        description:'Hệ thống xét nghiệm hiện đại, cho kết quả chính xác trong thời gian ngắn.',        slug:'xet-nghiem',         sort_order:2, is_active:true },
    { id:3, name:'Chẩn đoán hình ảnh', icon:'FileImageOutlined',         description:'X-quang, siêu âm, MRI, CT Scanner với máy móc thế hệ mới nhất.',                   slug:'chan-doan-hinh-anh',  sort_order:3, is_active:true },
    { id:4, name:'Tư vấn trực tuyến',  icon:'VideoCameraOutlined',       description:'Gặp bác sĩ qua video call, tiết kiệm thời gian mà vẫn đảm bảo chất lượng.',        slug:'tu-van-truc-tuyen',  sort_order:4, is_active:true },
    { id:5, name:'Phẫu thuật',         icon:'SafetyCertificateOutlined', description:'Phòng mổ đạt chuẩn quốc tế, đội ngũ phẫu thuật viên hàng đầu.',                   slug:'phau-thuat',         sort_order:5, is_active:true },
    { id:6, name:'Phục hồi chức năng', icon:'HeartOutlined',             description:'Chương trình phục hồi chức năng cá nhân hóa, nâng cao chất lượng cuộc sống.',      slug:'phuc-hoi-chuc-nang', sort_order:6, is_active:true },
  ]);

  // ── 8. service_packages ──────────────────────────────────────────
  await knex('service_packages').insert([
    { id:1,  name:'Khám Tim Mạch Chuyên Sâu',                   category:'Khám Chuyên Khoa',         slug:'kham-tim-mach',        image:'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&h=400&fit=crop', description:'Siêu âm tim, Holter ECG 24h, đo huyết áp lưu động — chẩn đoán toàn diện.',        features:JSON.stringify(['Siêu âm tim màu Doppler','Holter ECG 24 giờ','Đo huyết áp lưu động','Tư vấn chuyên khoa sau khám']), target_audience:'Người trên 40 tuổi, có tiền sử bệnh tim', is_active:true, sort_order:1 },
    { id:2,  name:'Khám Sản Phụ Khoa & Siêu Âm Thai 4D',        category:'Khám Chuyên Khoa',         slug:'kham-san-phu-khoa',    image:'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop', description:'Khám thai định kỳ, siêu âm 4D HD, tầm soát ung thư theo chuẩn quốc tế.',          features:JSON.stringify(['Siêu âm thai 4D độ phân giải cao','Xét nghiệm Double/Triple test','Tầm soát ung thư phụ khoa','Tư vấn dinh dưỡng mẹ bầu']), target_audience:'Phụ nữ mang thai và từ 25 tuổi', is_active:true, sort_order:2 },
    { id:3,  name:'Khám Nhi Khoa & Dinh Dưỡng Trẻ Em',          category:'Khám Chuyên Khoa',         slug:'kham-nhi-khoa',        image:'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop', description:'Đánh giá phát triển thể chất, tư vấn dinh dưỡng và lịch tiêm chủng cho trẻ.',    features:JSON.stringify(['Đánh giá phát triển toàn diện','Tư vấn dinh dưỡng cá nhân hóa','Lịch tiêm chủng mở rộng','Xét nghiệm vi chất dinh dưỡng']), target_audience:'Trẻ em từ sơ sinh đến 15 tuổi', is_active:true, sort_order:3 },
    { id:4,  name:'Gói Khám Sức Khỏe Cơ Bản',                   category:'Gói Khám Tổng Quát',       slug:'goi-co-ban',           image:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop', description:'Kiểm tra sức khỏe định kỳ với 22+ danh mục xét nghiệm.',                          features:JSON.stringify(['Xét nghiệm máu toàn phần','Xét nghiệm nước tiểu','X-quang phổi','Siêu âm ổ bụng','Đo huyết áp & ECG']), target_audience:'Người từ 18–40 tuổi', is_active:true, sort_order:4 },
    { id:5,  name:'Gói Khám Sức Khỏe Nâng Cao',                 category:'Gói Khám Tổng Quát',       slug:'goi-nang-cao',         image:'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop', description:'Hơn 30 danh mục chuyên sâu — siêu âm tuyến giáp, loãng xương và chỉ điểm ung thư.', features:JSON.stringify(['Tất cả gói Cơ Bản','Siêu âm tuyến giáp','Đo mật độ xương','Chỉ điểm ung thư: CEA, AFP','Khám Tim & Mắt']), target_audience:'Người từ 40–60 tuổi', is_active:true, sort_order:5 },
    { id:6,  name:'Gói Khám Sức Khỏe Cao Cấp',                  category:'Gói Khám Tổng Quát',       slug:'goi-cao-cap',          image:'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop', description:'Tầm soát toàn diện 40+ danh mục — CT 128 dãy, MRI não, nội soi NBI.',              features:JSON.stringify(['CT 128 dãy vùng ngực-bụng','MRI não không thuốc','Nội soi dạ dày NBI HD','Bộ chỉ điểm ung thư đầy đủ','Tư vấn dinh dưỡng chuyên sâu']), target_audience:'Người trên 50 tuổi', is_active:true, sort_order:6 },
    { id:7,  name:'Xét Nghiệm Máu & Sinh Hóa',                  category:'Xét Nghiệm & Chẩn Đoán',  slug:'xet-nghiem-mau',       image:'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop', description:'Kết quả trong 2–4 giờ với hơn 50 chỉ số sinh hóa.',                               features:JSON.stringify(['Công thức máu toàn phần','Sinh hóa máu','Hormone TSH, T3, T4','HbA1c']), target_audience:'Mọi đối tượng', is_active:true, sort_order:7 },
    { id:8,  name:'Chẩn Đoán Hình Ảnh Cao Cấp',                 category:'Xét Nghiệm & Chẩn Đoán',  slug:'chan-doan-hinh-anh',   image:'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop', description:'X-quang kỹ thuật số, siêu âm 4D, CT 128 dãy và MRI 3.0 Tesla.',                   features:JSON.stringify(['X-quang kỹ thuật số DR','Siêu âm màu 4D','CT 128 dãy','MRI 3.0 Tesla']), target_audience:'Bệnh nhân cần chẩn đoán chính xác', is_active:true, sort_order:8 },
    { id:9,  name:'Nội Soi Tiêu Hóa Có Gây Mê',                 category:'Xét Nghiệm & Chẩn Đoán',  slug:'noi-soi-tieu-hoa',     image:'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop', description:'Nội soi NBI HD gây mê an toàn, không đau, kết quả ngay sau 30 phút.',              features:JSON.stringify(['Nội soi NBI HD','Gây mê an toàn','Sinh thiết nếu cần','Kết quả trong ngày']), target_audience:'Người có triệu chứng tiêu hóa', is_active:true, sort_order:9 },
    { id:10, name:'Tiêm Chủng Người Lớn',                        category:'Tiêm Chủng & Phòng Ngừa', slug:'tiem-chung-nguoi-lon', image:'https://images.unsplash.com/photo-1558583055-d7ac00b1adbb?w=600&h=400&fit=crop', description:'HPV, cúm mùa, viêm gan A/B, phế cầu khuẩn.',                                      features:JSON.stringify(['Vắc-xin HPV Gardasil 9','Vắc-xin cúm tứ giá','Viêm gan A & B','Phế cầu khuẩn']), target_audience:'Người lớn từ 18 tuổi', is_active:true, sort_order:10 },
    { id:11, name:'Tiêm Chủng Trẻ Em',                           category:'Tiêm Chủng & Phòng Ngừa', slug:'tiem-chung-tre-em',    image:'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop', description:'Lịch tiêm chủng theo chuẩn Bộ Y tế và mở rộng quốc tế.',                          features:JSON.stringify(['Vắc-xin 6 trong 1','Rota virus, Phế cầu PCV13','Thủy đậu, MMR','Nhắc lịch tự động']), target_audience:'Trẻ từ sơ sinh đến 12 tuổi', is_active:true, sort_order:11 },
    { id:12, name:'Tầm Soát Ung Thư Sớm',                        category:'Tiêm Chủng & Phòng Ngừa', slug:'tam-soat-ung-thu',     image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop', description:'8 chỉ điểm khối u và chẩn đoán hình ảnh chuyên sâu.',                             features:JSON.stringify(['8 chỉ điểm ung thư','Siêu âm vú & tuyến giáp','X-quang & CT phổi','Tư vấn chuyên gia']), target_audience:'Người từ 40 tuổi', is_active:true, sort_order:12 },
    { id:13, name:'Phẫu Thuật Nội Soi Xâm Lấn Tối Thiểu',       category:'Phẫu Thuật & Thủ Thuật',  slug:'phau-thuat-noi-soi',   image:'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop', description:'Phẫu thuật nội soi ruột thừa, túi mật, thoát vị — vết mổ nhỏ, hồi phục nhanh.',  features:JSON.stringify(['Phòng mổ chuẩn JCI','Phẫu thuật viên 10+ năm','Gây mê toàn thân','Xuất viện 24–48h']), target_audience:'Bệnh nhân cần phẫu thuật bụng', is_active:true, sort_order:13 },
    { id:14, name:'Thủ Thuật Da Liễu Thẩm Mỹ Y Tế',             category:'Phẫu Thuật & Thủ Thuật',  slug:'thu-thuat-da-lieu',    image:'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop', description:'Điều trị mụn, sẹo, nám bằng laser công nghệ cao — an toàn, không xâm lấn.',       features:JSON.stringify(['Laser CO2 Fractional','IPL trị nám','RF Microneedling','Tư vấn phác đồ cá nhân']), target_audience:'Người muốn cải thiện da mặt', is_active:true, sort_order:14 },
    { id:15, name:'Phẫu Thuật Mắt & Điều Chỉnh Khúc Xạ',        category:'Phẫu Thuật & Thủ Thuật',  slug:'phau-thuat-mat',       image:'https://images.unsplash.com/photo-1516069677018-378b1174c2d0?w=600&h=400&fit=crop', description:'LASIK, SMILE và điều trị đục thủy tinh thể.',                                      features:JSON.stringify(['LASIK/SMILE cận thị','Phẫu thuật Phaco','Khám mắt tiền phẫu','Tái khám 1 năm miễn phí']), target_audience:'Người cận thị, loạn thị, đục TTT', is_active:true, sort_order:15 },
    { id:16, name:'Tư Vấn Sức Khỏe Trực Tuyến (Telemedicine)',   category:'Dịch Vụ Số & Hỗ Trợ',    slug:'telemedicine',         image:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop', description:'Gặp bác sĩ qua video call bất cứ lúc nào.',                                       features:JSON.stringify(['Video call bác sĩ chuyên khoa','Đặt lịch online 24/7','Kê đơn điện tử','Lưu trữ lịch sử khám']), target_audience:'Người bận rộn, ở xa', is_active:true, sort_order:16 },
    { id:17, name:'Khám Bệnh Tại Nhà',                           category:'Dịch Vụ Số & Hỗ Trợ',    slug:'kham-tai-nha',         image:'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop', description:'Bác sĩ đến tận nhà khám — phù hợp người cao tuổi, hậu phẫu.',                    features:JSON.stringify(['Khám tổng quát tại nhà','Lấy mẫu xét nghiệm','Chăm sóc hậu phẫu','Đặt lịch trong 2 giờ']), target_audience:'Người cao tuổi, hậu phẫu', is_active:true, sort_order:17 },
    { id:18, name:'Hồ Sơ Y Tế Điện Tử & Nhắc Lịch Thông Minh',  category:'Dịch Vụ Số & Hỗ Trợ',    slug:'ho-so-y-te-dien-tu',   image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', description:'Quản lý hồ sơ y tế gia đình — nhắc uống thuốc, tái khám tự động.',               features:JSON.stringify(['Hồ sơ y tế điện tử','Nhắc lịch uống thuốc','Thông báo tái khám FCM','Chia sẻ với bác sĩ']), target_audience:'Mọi bệnh nhân', is_active:true, sort_order:18 },
  ]);

  // ── 9. families ──────────────────────────────────────────────────
  await knex('families').insert([
    { id:1, user_id:2, family_name:'Gia đình Nguyễn (Demo)' },
    { id:2, user_id:3, family_name:'Gia đình Nguyễn Văn Minh' },
    { id:3, user_id:4, family_name:'Gia đình Trần Thị Hoa' },
    { id:4, user_id:5, family_name:'Gia đình Lê Văn Tuấn' },
    { id:5, user_id:6, family_name:'Gia đình Phạm Thu Nga' },
    { id:6, user_id:7, family_name:'Gia đình Hoàng Văn Đức' },
  ]);

  // ── 10. members ──────────────────────────────────────────────────
  await knex('members').insert([
    { id:1,  family_id:1, full_name:'Nguyễn Văn Test',    dob:'1990-03-15', gender:'male',   blood_type:'O+',  allergy:null,              medical_history:null,                      relationship:'Bản thân' },
    { id:2,  family_id:1, full_name:'Nguyễn Thị Test',    dob:'1992-07-22', gender:'female', blood_type:'A+',  allergy:null,              medical_history:null,                      relationship:'Vợ/Chồng' },
    { id:3,  family_id:1, full_name:'Nguyễn Bé Test',     dob:'2018-11-05', gender:'male',   blood_type:null,  allergy:null,              medical_history:null,                      relationship:'Con' },
    { id:4,  family_id:2, full_name:'Nguyễn Văn Minh',    dob:'1985-06-12', gender:'male',   blood_type:'B+',  allergy:'Penicillin',      medical_history:'Tăng huyết áp',           relationship:'Bản thân' },
    { id:5,  family_id:2, full_name:'Lê Thị Lan',         dob:'1988-09-20', gender:'female', blood_type:'O+',  allergy:null,              medical_history:null,                      relationship:'Vợ/Chồng' },
    { id:6,  family_id:2, full_name:'Nguyễn Văn Nam',     dob:'2015-04-08', gender:'male',   blood_type:'B+',  allergy:null,              medical_history:null,                      relationship:'Con' },
    { id:7,  family_id:3, full_name:'Trần Thị Hoa',       dob:'1978-01-30', gender:'female', blood_type:'AB+', allergy:null,              medical_history:'Đái tháo đường type 2',    relationship:'Bản thân' },
    { id:8,  family_id:3, full_name:'Phạm Văn Bình',      dob:'1975-11-15', gender:'male',   blood_type:'A+',  allergy:'Aspirin',         medical_history:'Thoái hóa cột sống',      relationship:'Vợ/Chồng' },
    { id:9,  family_id:3, full_name:'Trần Minh Khoa',     dob:'2005-08-22', gender:'male',   blood_type:'AB+', allergy:null,              medical_history:null,                      relationship:'Con' },
    { id:10, family_id:4, full_name:'Lê Văn Tuấn',        dob:'1992-05-18', gender:'male',   blood_type:'O-',  allergy:null,              medical_history:null,                      relationship:'Bản thân' },
    { id:11, family_id:4, full_name:'Nguyễn Thị Mai',     dob:'1993-12-03', gender:'female', blood_type:'B+',  allergy:'Hải sản',         medical_history:null,                      relationship:'Vợ/Chồng' },
    { id:12, family_id:4, full_name:'Lê Thị Hương',       dob:'1965-07-14', gender:'female', blood_type:'A-',  allergy:null,              medical_history:'Tăng huyết áp, Tiểu đường', relationship:'Mẹ' },
    { id:13, family_id:5, full_name:'Phạm Thu Nga',       dob:'1995-10-08', gender:'female', blood_type:'A+',  allergy:null,              medical_history:null,                      relationship:'Bản thân' },
    { id:14, family_id:5, full_name:'Nguyễn Văn Hải',     dob:'1935-03-25', gender:'male',   blood_type:'O+',  allergy:'Sulfa',           medical_history:'Suy tim độ II, Tăng huyết áp', relationship:'Ông/Bà' },
    { id:15, family_id:5, full_name:'Lê Thị Yến',         dob:'1938-09-10', gender:'female', blood_type:'B-',  allergy:null,              medical_history:'Loãng xương',             relationship:'Ông/Bà' },
    { id:16, family_id:6, full_name:'Hoàng Văn Đức',      dob:'1988-02-14', gender:'male',   blood_type:'AB-', allergy:null,              medical_history:null,                      relationship:'Bản thân' },
    { id:17, family_id:6, full_name:'Vũ Thị Linh',        dob:'1990-06-30', gender:'female', blood_type:'O+',  allergy:'Phấn hoa, bụi nhà', medical_history:null,                   relationship:'Vợ/Chồng' },
    { id:18, family_id:6, full_name:'Hoàng Minh Phúc',    dob:'2020-12-01', gender:'male',   blood_type:null,  allergy:null,              medical_history:null,                      relationship:'Con' },
  ]);

  // ── 11. doctor_schedules ─────────────────────────────────────────
  await knex('doctor_schedules').insert([
    { id:1,  doctor_id:1, hospital_id:1, date:'2025-06-02', is_off:false },
    { id:2,  doctor_id:1, hospital_id:1, date:'2025-06-03', is_off:false },
    { id:3,  doctor_id:1, hospital_id:1, date:'2025-06-04', is_off:false },
    { id:4,  doctor_id:1, hospital_id:1, date:'2025-06-05', is_off:false },
    { id:5,  doctor_id:1, hospital_id:1, date:'2025-06-06', is_off:false },
    { id:6,  doctor_id:2, hospital_id:1, date:'2025-06-02', is_off:false },
    { id:7,  doctor_id:2, hospital_id:1, date:'2025-06-03', is_off:false },
    { id:8,  doctor_id:2, hospital_id:1, date:'2025-06-04', is_off:false },
    { id:9,  doctor_id:2, hospital_id:1, date:'2025-06-05', is_off:false },
    { id:10, doctor_id:2, hospital_id:1, date:'2025-06-06', is_off:false },
    { id:11, doctor_id:3, hospital_id:1, date:'2025-06-02', is_off:false },
    { id:12, doctor_id:3, hospital_id:1, date:'2025-06-03', is_off:false },
    { id:13, doctor_id:3, hospital_id:1, date:'2025-06-04', is_off:false },
    { id:14, doctor_id:3, hospital_id:1, date:'2025-06-05', is_off:true  },
    { id:15, doctor_id:3, hospital_id:1, date:'2025-06-06', is_off:false },
    { id:16, doctor_id:4, hospital_id:1, date:'2025-06-02', is_off:false },
    { id:17, doctor_id:4, hospital_id:1, date:'2025-06-03', is_off:false },
    { id:18, doctor_id:4, hospital_id:1, date:'2025-06-04', is_off:false },
    { id:19, doctor_id:4, hospital_id:1, date:'2025-06-05', is_off:false },
    { id:20, doctor_id:4, hospital_id:1, date:'2025-06-06', is_off:false },
    { id:21, doctor_id:5, hospital_id:1, date:'2025-06-02', is_off:false },
    { id:22, doctor_id:5, hospital_id:1, date:'2025-06-03', is_off:false },
    { id:23, doctor_id:5, hospital_id:1, date:'2025-06-04', is_off:false },
    { id:24, doctor_id:5, hospital_id:1, date:'2025-06-05', is_off:false },
    { id:25, doctor_id:5, hospital_id:1, date:'2025-06-06', is_off:false },
  ]);

  // ── 12. slots ────────────────────────────────────────────────────
  await knex('slots').insert([
    { id:1,  schedule_id:1, start_time:'08:00', end_time:'08:30', max_patients:1, current_patients:1, is_locked:false },
    { id:2,  schedule_id:1, start_time:'08:30', end_time:'09:00', max_patients:1, current_patients:0, is_locked:false },
    { id:3,  schedule_id:1, start_time:'09:00', end_time:'09:30', max_patients:1, current_patients:0, is_locked:false },
    { id:4,  schedule_id:1, start_time:'13:30', end_time:'14:00', max_patients:1, current_patients:1, is_locked:false },
    { id:5,  schedule_id:1, start_time:'14:00', end_time:'14:30', max_patients:1, current_patients:0, is_locked:false },
    { id:6,  schedule_id:1, start_time:'14:30', end_time:'15:00', max_patients:1, current_patients:0, is_locked:false },
    { id:7,  schedule_id:2, start_time:'08:00', end_time:'08:30', max_patients:1, current_patients:0, is_locked:false },
    { id:8,  schedule_id:2, start_time:'08:30', end_time:'09:00', max_patients:1, current_patients:0, is_locked:false },
    { id:9,  schedule_id:2, start_time:'09:00', end_time:'09:30', max_patients:1, current_patients:0, is_locked:false },
    { id:10, schedule_id:2, start_time:'13:30', end_time:'14:00', max_patients:1, current_patients:0, is_locked:false },
    { id:11, schedule_id:2, start_time:'14:00', end_time:'14:30', max_patients:1, current_patients:0, is_locked:false },
    { id:12, schedule_id:2, start_time:'14:30', end_time:'15:00', max_patients:1, current_patients:0, is_locked:false },
    { id:13, schedule_id:6, start_time:'08:00', end_time:'08:30', max_patients:1, current_patients:1, is_locked:false },
    { id:14, schedule_id:6, start_time:'08:30', end_time:'09:00', max_patients:1, current_patients:0, is_locked:false },
    { id:15, schedule_id:6, start_time:'09:00', end_time:'09:30', max_patients:1, current_patients:0, is_locked:false },
    { id:16, schedule_id:6, start_time:'09:30', end_time:'10:00', max_patients:1, current_patients:0, is_locked:false },
    { id:17, schedule_id:6, start_time:'13:30', end_time:'14:00', max_patients:1, current_patients:0, is_locked:false },
    { id:18, schedule_id:6, start_time:'14:00', end_time:'14:30', max_patients:1, current_patients:0, is_locked:false },
  ]);

  // ── 13. appointments ─────────────────────────────────────────────
  await knex('appointments').insert([
    { id:1,  user_id:2, member_id:1,  doctor_id:1,  hospital_id:1, slot_id:1,    appointment_type:'clinic', appointment_date:'2025-06-02', reason:'Đau tức ngực, khó thở khi gắng sức',              status:'completed', payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:2,  user_id:2, member_id:2,  doctor_id:8,  hospital_id:1, slot_id:null, appointment_type:'clinic', appointment_date:'2025-06-10', reason:'Khám thai định kỳ tuần 28',                        status:'confirmed', payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:3,  user_id:3, member_id:4,  doctor_id:1,  hospital_id:1, slot_id:4,    appointment_type:'clinic', appointment_date:'2025-06-02', reason:'Kiểm tra huyết áp định kỳ, đang dùng thuốc',       status:'completed', payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:4,  user_id:3, member_id:5,  doctor_id:2,  hospital_id:1, slot_id:13,   appointment_type:'clinic', appointment_date:'2025-06-02', reason:'Con gái bị sốt 3 ngày, ho nhiều',                  status:'completed', payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:5,  user_id:4, member_id:7,  doctor_id:10, hospital_id:1, slot_id:null, appointment_type:'clinic', appointment_date:'2025-06-05', reason:'Kiểm tra đường huyết, đang điều trị tiểu đường',   status:'confirmed', payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:6,  user_id:4, member_id:8,  doctor_id:7,  hospital_id:1, slot_id:null, appointment_type:'video',  appointment_date:'2025-06-08', reason:'Đau lưng lan xuống chân trái từ 2 tuần nay',       status:'pending',   payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:7,  user_id:5, member_id:10, doctor_id:4,  hospital_id:1, slot_id:null, appointment_type:'clinic', appointment_date:'2025-06-15', reason:'Nhức đầu thường xuyên, chóng mặt buổi sáng',       status:'pending',   payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:8,  user_id:6, member_id:13, doctor_id:3,  hospital_id:1, slot_id:null, appointment_type:'clinic', appointment_date:'2025-06-12', reason:'Mụn trứng cá nặng, muốn điều trị laser',           status:'confirmed', payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:9,  user_id:2, member_id:1,  doctor_id:9,  hospital_id:2, slot_id:null, appointment_type:'clinic', appointment_date:'2025-05-20', reason:'Khám mắt định kỳ, đo độ cận thị',                  status:'completed', payment_status:'unpaid', reason_cancel:null, guest_name:null, guest_phone:null },
    { id:10, user_id:7, member_id:16, doctor_id:5,  hospital_id:1, slot_id:null, appointment_type:'clinic', appointment_date:'2025-04-15', reason:'Viêm xoang mãn tính, nghẹt mũi kéo dài',           status:'cancelled', payment_status:'unpaid', reason_cancel:'Bệnh nhân xin hủy vì bận công tác', guest_name:null, guest_phone:null },
  ]);

  // ── 14. examination_results ──────────────────────────────────────
  await knex('examination_results').insert([
    { id:1, appointment_id:1, diagnosis:'Tăng huyết áp độ I, nghi ngờ rối loạn nhịp tim sớm',    notes:'Huyết áp 145/92 mmHg, nhịp tim không đều nhẹ trên ECG.',    treatment_plan:'Khởi đầu Amlodipine 5mg/ngày. Hạn chế muối, giảm cân. Tái khám sau 4 tuần.', follow_up_date:'2025-07-02' },
    { id:2, appointment_id:3, diagnosis:'Tăng huyết áp đang được kiểm soát tốt',                 notes:'Huyết áp 128/80 mmHg, ổn định với phác đồ hiện tại.',       treatment_plan:'Tiếp tục thuốc huyết áp hiện tại. Duy trì chế độ ăn nhạt muối.',           follow_up_date:'2025-09-02' },
    { id:3, appointment_id:4, diagnosis:'Viêm tiểu phế quản cấp, sốt virus',                    notes:'Sốt 38.8°C, ran nhỏ 2 bên đáy. SpO2 97%.',                  treatment_plan:'Paracetamol 10mg/kg khi sốt. Thuốc giãn phế quản khí dung 3 lần/ngày.',     follow_up_date:'2025-06-09' },
    { id:4, appointment_id:9, diagnosis:'Cận thị 2 mắt, độ ổn định',                            notes:'Mắt phải: -3.50D, trái: -3.25D. Không thay đổi so với 1 năm.', treatment_plan:'Thay kính mới theo đơn. Đủ điều kiện phẫu thuật SMILE.',                   follow_up_date:'2026-05-20' },
  ]);

  // ── 15. medical_records ──────────────────────────────────────────
  await knex('medical_records').insert([
    { id:1, member_id:1,  appointment_id:1,  visit_date:'2025-06-02', hospital_name:'Bệnh viện VitaFamily',          doctor_name:'PGS. TS. BS. Nguyễn Văn An', reason:'Đau tức ngực, khó thở', diagnosis:'Tăng huyết áp độ I, rối loạn nhịp tim sớm', notes:'Bắt đầu điều trị Amlodipine' },
    { id:2, member_id:4,  appointment_id:3,  visit_date:'2025-06-02', hospital_name:'Bệnh viện VitaFamily',          doctor_name:'PGS. TS. BS. Nguyễn Văn An', reason:'Kiểm tra huyết áp định kỳ', diagnosis:'Tăng huyết áp đang kiểm soát tốt', notes:'Huyết áp 128/80 ổn định' },
    { id:3, member_id:5,  appointment_id:4,  visit_date:'2025-06-02', hospital_name:'Bệnh viện VitaFamily',          doctor_name:'TS. BS. Trần Thị Bình',       reason:'Sốt 3 ngày, ho nhiều', diagnosis:'Viêm tiểu phế quản cấp, sốt virus', notes:'Điều trị ngoại trú, tái khám sau 7 ngày' },
    { id:4, member_id:1,  appointment_id:9,  visit_date:'2025-05-20', hospital_name:'Phòng khám VitaFamily Quận 7', doctor_name:'TS. BS. Phạm Quốc Bình',      reason:'Khám mắt định kỳ', diagnosis:'Cận thị 2 mắt, độ ổn định', notes:'Thay kính mới, đủ tiêu chuẩn SMILE' },
    { id:5, member_id:4,  appointment_id:null, visit_date:'2024-12-15', hospital_name:'Bệnh viện Bạch Mai',          doctor_name:null,                          reason:'Đau đầu, chóng mặt', diagnosis:'Thiếu máu nhẹ, thiếu sắt', notes:'Nhập tay từ lần khám bên ngoài hệ thống.' },
  ]);

  // ── 16. prescriptions + prescription_items ───────────────────────
  await knex('prescriptions').insert([
    { id:1, medical_record_id:1, doctor_id:1, notes:'Uống thuốc đúng giờ, không bỏ liều. Tái khám ngay nếu đau ngực tái phát.' },
    { id:2, medical_record_id:2, doctor_id:1, notes:'Tiếp tục phác đồ cũ. Ăn nhạt, hạn chế rượu bia.' },
    { id:3, medical_record_id:3, doctor_id:2, notes:'Uống đủ nước 1.5 lít/ngày. Hút mũi trước khi cho uống thuốc.' },
  ]);

  await knex('prescription_items').insert([
    { id:1, prescription_id:1, medicine_name:'Amlodipine 5mg',      dosage:'1 viên',   frequency:'1 lần/ngày vào buổi sáng',     time_slots:JSON.stringify(['Sáng']),                     start_date:'2025-06-02', end_date:null,         notes:'Uống sau ăn sáng' },
    { id:2, prescription_id:1, medicine_name:'Aspirin 81mg',        dosage:'1 viên',   frequency:'1 lần/ngày vào buổi tối',      time_slots:JSON.stringify(['Tối']),                      start_date:'2025-06-02', end_date:null,         notes:'Uống sau ăn tối, không nhai' },
    { id:3, prescription_id:2, medicine_name:'Amlodipine 5mg',      dosage:'1 viên',   frequency:'1 lần/ngày vào buổi sáng',     time_slots:JSON.stringify(['Sáng']),                     start_date:'2025-06-02', end_date:null,         notes:null },
    { id:4, prescription_id:3, medicine_name:'Salbutamol khí dung', dosage:'2.5mg/lần', frequency:'3 lần/ngày',                 time_slots:JSON.stringify(['Sáng','Trưa','Tối']),         start_date:'2025-06-02', end_date:'2025-06-09', notes:'Xịt trước ăn 30 phút' },
    { id:5, prescription_id:3, medicine_name:'Paracetamol 250mg',   dosage:'1 gói',    frequency:'Khi sốt trên 38.5°C, cách 4–6h', time_slots:JSON.stringify(['Sáng','Trưa','Chiều','Tối']), start_date:'2025-06-02', end_date:'2025-06-09', notes:'Chỉ dùng khi sốt, tối đa 4 lần/ngày' },
  ]);

  // ── 17. reminders ────────────────────────────────────────────────
  await knex('reminders').insert([
    { id:1, prescription_item_id:1, remind_time:'2025-06-03 07:30:00', status:'taken' },
    { id:2, prescription_item_id:2, remind_time:'2025-06-03 20:00:00', status:'taken' },
    { id:3, prescription_item_id:1, remind_time:'2025-06-04 07:30:00', status:'taken' },
    { id:4, prescription_item_id:2, remind_time:'2025-06-04 20:00:00', status:'skipped' },
    { id:5, prescription_item_id:1, remind_time:'2025-06-05 07:30:00', status:'sent' },
    { id:6, prescription_item_id:2, remind_time:'2025-06-05 20:00:00', status:'pending' },
    { id:7, prescription_item_id:4, remind_time:'2025-06-02 07:00:00', status:'taken' },
    { id:8, prescription_item_id:4, remind_time:'2025-06-02 12:00:00', status:'taken' },
    { id:9, prescription_item_id:4, remind_time:'2025-06-02 19:00:00', status:'taken' },
  ]);

  // ── 18. appointment_reviews ──────────────────────────────────────
  await knex('appointment_reviews').insert([
    { id:1, appointment_id:1, user_id:2, doctor_id:1, rating:5, comment:'Bác sĩ Nguyễn Văn An rất tận tâm, giải thích chi tiết tình trạng bệnh và hướng điều trị rõ ràng.', is_visible:true },
    { id:2, appointment_id:3, user_id:3, doctor_id:1, rating:5, comment:'Bác sĩ khám kỹ lưỡng, hỏi thăm cặn kẽ tiền sử bệnh. Thái độ thân thiện, dễ gần.', is_visible:true },
    { id:3, appointment_id:4, user_id:3, doctor_id:2, rating:5, comment:'BS Bình rất kiên nhẫn với trẻ nhỏ, biết cách dỗ bé không khóc. Chẩn đoán chính xác.', is_visible:true },
    { id:4, appointment_id:9, user_id:2, doctor_id:9, rating:4, comment:'Phòng khám sạch sẽ, đội ngũ y tế chuyên nghiệp. Bác sĩ Bình tư vấn kỹ về SMILE.', is_visible:true },
  ]);

  // ── 19. notifications ────────────────────────────────────────────
  await knex('notifications').insert([
    { id:1, user_id:2, title:'Lịch hẹn đã được xác nhận', content:'Lịch hẹn khám với BS. Hoàng Thị Mai ngày 10/06/2025 đã được xác nhận. Vui lòng đến đúng giờ.', type:'appointment', related_id:2,    is_read:false },
    { id:2, user_id:2, title:'Nhắc uống thuốc',           content:'Đã đến giờ uống Amlodipine 5mg (buổi sáng). Nhớ uống sau ăn sáng!',                          type:'medicine',     related_id:5,    is_read:true  },
    { id:3, user_id:3, title:'Lịch hẹn đã được xác nhận', content:'Lịch hẹn khám nội tiết cho Trần Thị Hoa ngày 05/06/2025 đã được BS. Nguyễn Thu Hà xác nhận.', type:'appointment', related_id:5,    is_read:false },
    { id:4, user_id:4, title:'Lịch hẹn chờ xác nhận',    content:'Lịch hẹn tư vấn video với BS. Đặng Văn Hùng ngày 08/06/2025 đang chờ xác nhận từ bác sĩ.',    type:'appointment', related_id:6,    is_read:true  },
    { id:5, user_id:7, title:'Lịch hẹn đã bị hủy',       content:'Lịch hẹn với BS. Võ Thanh Quang ngày 15/04/2025 đã được hủy theo yêu cầu của bạn.',           type:'appointment', related_id:10,   is_read:true  },
    { id:6, user_id:2, title:'Thông báo từ VitaFamily',   content:'VitaFamily vừa ra mắt tính năng theo dõi sức khỏe gia đình. Trải nghiệm ngay!',               type:'system',      related_id:null, is_read:false },
  ]);

  // ── 20. articles ─────────────────────────────────────────────────
  await knex('articles').insert([
    { id:1, title:'VitaFamily triển khai hệ thống đặt lịch trực tuyến thế hệ mới', slug:'vitafamily-dat-lich-truc-tuyen-moi',   category:'Tin tức',  summary:'Hệ thống đặt lịch mới giúp bệnh nhân dễ dàng kết nối với bác sĩ chuyên khoa 24/7.', content:'<p>Bệnh viện VitaFamily vừa chính thức ra mắt hệ thống đặt lịch khám trực tuyến thế hệ mới.</p>', thumbnail:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', author_id:1, published_at:'2024-06-10', is_published:true },
    { id:2, title:'Phòng khám tim mạch VitaFamily đạt chứng chỉ quốc tế JCI',     slug:'phong-kham-tim-mach-dat-chung-chi-jci', category:'Thành tựu', summary:'Chứng chỉ JCI khẳng định chất lượng dịch vụ y tế đạt chuẩn quốc tế của VitaFamily.', content:'<p>Khoa Tim mạch BV VitaFamily được JCI cấp chứng chỉ công nhận chất lượng quốc tế.</p>',        thumbnail:'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop', author_id:1, published_at:'2024-05-22', is_published:true },
    { id:3, title:'Hội thảo sức khỏe cộng đồng: Phòng ngừa đột quỵ mùa hè',     slug:'hoi-thao-phong-ngua-dot-quy',          category:'Sự kiện',  summary:'Hội thảo miễn phí với sự tham gia của các chuyên gia đầu ngành thần kinh học.',          content:'<p>BV VitaFamily tổ chức hội thảo miễn phí chủ đề "Phòng ngừa đột quỵ trong mùa hè".</p>',    thumbnail:'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop', author_id:1, published_at:'2024-05-15', is_published:true },
    { id:4, title:'Dinh dưỡng thông minh: Chế độ ăn giúp tăng cường miễn dịch',  slug:'dinh-duong-tang-cuong-mien-dich',      category:'Sức khỏe', summary:'Các chuyên gia dinh dưỡng VitaFamily chia sẻ bí quyết xây dựng hệ miễn dịch khỏe mạnh.', content:'<p>Hệ miễn dịch đóng vai trò then chốt trong việc bảo vệ cơ thể khỏi bệnh tật.</p>',           thumbnail:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop', author_id:1, published_at:'2024-04-30', is_published:true },
    { id:5, title:'VitaFamily mở rộng cơ sở tại TP. Hồ Chí Minh',               slug:'vitafamily-mo-rong-co-so-hcm',         category:'Tin tức',  summary:'Cơ sở mới tại Quận 7 với quy mô 5 tầng và đầy đủ trang thiết bị hiện đại.',          content:'<p>BV VitaFamily khai trương phòng khám chuyên khoa tại Quận 7, TP.HCM.</p>',                  thumbnail:'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop', author_id:1, published_at:'2024-04-12', is_published:true },
    { id:6, title:'Tầm soát ung thư sớm: Cơ hội sống khỏe cho mọi gia đình',    slug:'tam-soat-ung-thu-som',                 category:'Sức khỏe', summary:'Chương trình tầm soát ung thư miễn phí dành cho 1.000 bệnh nhân đầu tiên đăng ký.',     content:'<p>Phát hiện ung thư sớm ở giai đoạn I có tỷ lệ chữa khỏi lên tới 90%.</p>',                   thumbnail:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop', author_id:1, published_at:'2024-03-28', is_published:true },
  ]);

  // ── 21. hero_banners ─────────────────────────────────────────────
  await knex('hero_banners').insert([
    { id:1, title:'Sức khỏe của bạn — Ưu tiên hàng đầu của chúng tôi',  subtitle:'Đội ngũ bác sĩ chuyên khoa hàng đầu, trang thiết bị hiện đại, dịch vụ tận tâm — VitaFamily đồng hành cùng sức khỏe gia đình bạn.', image_url:'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1440&h=600&fit=crop', cta_primary:'Đặt lịch khám ngay', cta_secondary:'Tìm bác sĩ',       sort_order:0, is_active:true },
    { id:2, title:'Chuyên khoa đa dạng — Chăm sóc toàn diện',           subtitle:'Hơn 30 chuyên khoa với đội ngũ 120+ bác sĩ giàu kinh nghiệm, sẵn sàng phục vụ bạn mọi lúc.',                                          image_url:'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1440&h=600&fit=crop', cta_primary:'Xem chuyên khoa',    cta_secondary:'Tư vấn trực tuyến', sort_order:1, is_active:true },
    { id:3, title:'Công nghệ y tế tiên tiến — Kết quả chính xác',       subtitle:'Hệ thống máy móc thế hệ mới nhất, quy trình chuẩn quốc tế JCI đảm bảo chất lượng dịch vụ vượt trội.',                                  image_url:'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1440&h=600&fit=crop', cta_primary:'Khám phá dịch vụ',   cta_secondary:'Liên hệ ngay',     sort_order:2, is_active:true },
  ]);

  // ── 22. payment_settings ────────────────────────────────────────
  await knex('payment_settings').insert([
    { id:1, key_name:'commission_rate',    value:'15', description:'Phần trăm hoa hồng VitaFamily giữ lại (%)' },
    { id:2, key_name:'refund_tier1_hours', value:'24', description:'Huỷ trước ≥ N giờ → hoàn 100%' },
    { id:3, key_name:'refund_tier2_hours', value:'12', description:'Huỷ trước ≥ N giờ → hoàn 80%' },
    { id:4, key_name:'refund_tier3_hours', value:'6',  description:'Huỷ trước ≥ N giờ → hoàn 50% (dưới ngưỡng = 0%)' },
  ]);

  // ── Reset sequences ──────────────────────────────────────────────
  const tables = [
    'users','specialties','hospitals','doctors','services','service_packages',
    'families','members','doctor_schedules','slots','appointments',
    'examination_results','medical_records','medical_files','prescriptions',
    'prescription_items','reminders','appointment_reviews','notifications',
    'system_notifications','chat_sessions','chat_messages','articles',
    'hero_banners','payments','refunds','payouts','payment_settings',
  ];
  for (const t of tables) {
    await knex.raw(`SELECT setval('${t}_id_seq', COALESCE((SELECT MAX(id) FROM ${t}), 1))`);
  }

  await knex.raw('SET session_replication_role = DEFAULT');
};
