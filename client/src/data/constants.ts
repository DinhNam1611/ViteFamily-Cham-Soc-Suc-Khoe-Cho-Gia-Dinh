export const COLORS = {
  primaryBlue: "#0077C8",
  lightBlue: "#E8F4FD",
  accentCyan: "#00B4D8",
  white: "#FFFFFF",
  textDark: "#1A2B4B",
  textMuted: "#6B7C99",
  successGreen: "#28A745",
  borderGray: "#E2E8F0",
} as const;

export const NAV_ITEMS = [
  { label: "Chuyên khoa", path: "/specialties" },
  { label: "Giới thiệu", path: "/about" },
  { label: "Hướng dẫn bệnh nhân", path: "/help" },
  { label: "Dịch vụ", path: "/services" },
  { label: "Bác sĩ", path: "/doctors" },
  { label: "Tin tức", path: "/news" },
  { label: "Liên hệ", path: "/contact" },
] as const;

export const SPECIALTY_GROUPS = [
  {
    label: 'Chuyên khoa nội',
    path: '/specialties?group=internal',
    items: [
      { label: 'Tim Mạch & Can Thiệp', path: '/specialties/tim-mach' },
      { label: 'Tiêu Hóa & Gan Mật', path: '/specialties/tieu-hoa-gan-mat' },
      { label: 'Nội Tiết', path: '/specialties/noi-tiet' },
      { label: 'Nhi & Sơ Sinh', path: '/specialties/nhi-so-sinh' },
      { label: 'Hô Hấp', path: '/specialties/ho-hap' },
      { label: 'Thần Kinh Nội', path: '/specialties/than-kinh-noi' },
      { label: 'Da Liễu', path: '/specialties/da-lieu' },
      { label: 'Ung Bướu', path: '/specialties/ung-buou' },
    ],
  },
  {
    label: 'Chuyên khoa ngoại',
    path: '/specialties?group=surgical',
    items: [
      { label: 'Sản & Phụ Khoa', path: '/specialties/san-phu-khoa' },
      { label: 'Chấn Thương & Chỉnh Hình', path: '/specialties/chan-thuong-chinh-hinh' },
      { label: 'Tai - Mũi - Họng', path: '/specialties/tai-mui-hong' },
      { label: 'Mắt', path: '/specialties/mat' },
      { label: 'Răng - Hàm - Mặt', path: '/specialties/rang-ham-mat' },
      { label: 'Phẫu Thuật Thần Kinh', path: '/specialties/phau-thuat-than-kinh' },
      { label: 'Tiết Niệu', path: '/specialties/tiet-nieu' },
    ],
  },
  {
    label: 'Chuyên khoa hỗ trợ',
    path: '/specialties?group=support',
    items: [
      { label: 'Chẩn Đoán Hình Ảnh', path: '/specialties/chan-doan-hinh-anh' },
      { label: 'Xét Nghiệm', path: '/specialties/xet-nghiem' },
      { label: 'Vật Lý Trị Liệu', path: '/specialties/vat-ly-tri-lieu' },
      { label: 'Dinh Dưỡng', path: '/specialties/dinh-duong' },
      { label: 'Khoa Dược', path: '/specialties/khoa-duoc' },
    ],
  },
];

export const FOOTER_NAV = {
  services: [
    { label: "Khám tổng quát", path: "/services/kham-tong-quat" },
    { label: "Xét nghiệm", path: "/services/xet-nghiem" },
    { label: "Chẩn đoán hình ảnh", path: "/services/chan-doan-hinh-anh" },
    { label: "Tư vấn trực tuyến", path: "/services/tu-van-truc-tuyen" },
  ],
  quickLinks: [
    { label: "Đặt lịch khám", path: "/contact" },
    { label: "Tìm bác sĩ", path: "/doctors" },
    { label: "Kết quả xét nghiệm", path: "/login" },
    { label: "Tin tức sức khỏe", path: "/news" },
  ],
} as const;

export const NEWS_CATEGORIES = [
  { label: 'Sự kiện', slug: 'su-kien', path: '/news?category=su-kien', banner: 'https://picsum.photos/seed/hospital-event/1440/400' },
  { label: 'Thông tin báo chí', slug: 'bao-chi', path: '/news?category=bao-chi', banner: 'https://picsum.photos/seed/press-medical/1440/400' },
  { label: 'Tin tức ưu đãi', slug: 'uu-dai', path: '/news?category=uu-dai', banner: 'https://picsum.photos/seed/health-promotion/1440/400' },
  { label: 'Ca Bệnh Thành Công', slug: 'ca-benh', path: '/news?category=ca-benh', banner: 'https://picsum.photos/seed/success-surgery/1440/400' },
  { label: 'Cảm Nhận Khách Hàng', slug: 'cam-nhan', path: '/news?category=cam-nhan', banner: 'https://picsum.photos/seed/patient-care/1440/400' },
  { label: 'Tin tức chuyên môn', slug: 'chuyen-mon', path: '/news?category=chuyen-mon', banner: 'https://picsum.photos/seed/doctor-expert/1440/400' },
  { label: 'Thư viện ảnh', slug: 'thu-vien', path: '/news?category=thu-vien', banner: 'https://picsum.photos/seed/gallery-clinic/1440/400' },
] as const;

export const PATIENT_GUIDE_DROPDOWN = [
  {
    label: 'Quy trình đặt lịch khám',
    path: '/help/dat-lich-kham',
    icon: 'calendar',
  },
  {
    label: 'Quy trình khám bệnh',
    path: '/help/quy-trinh-kham',
    icon: 'file-text',
  },
  {
    label: 'Thanh toán & Bảo hiểm',
    path: '/help/thanh-toan-bao-hiem',
    icon: 'credit-card',
  },
  {
    label: 'Câu hỏi thường gặp',
    path: '/help/faq',
    icon: 'question',
  },
  {
    label: 'Chính sách & Quy định',
    path: '/help/chinh-sach',
    icon: 'safety',
  },
];

export const SERVICES_DROPDOWN = [
  {
    label: 'Khám tổng quát',
    path: '/services/kham-tong-quat',
    icon: 'medicine',
  },
  {
    label: 'Xét nghiệm',
    path: '/services/xet-nghiem',
    icon: 'experiment',
  },
  {
    label: 'Chẩn đoán hình ảnh',
    path: '/services/chan-doan-hinh-anh',
    icon: 'scan',
  },
  {
    label: 'Tư vấn trực tuyến',
    path: '/services/tu-van-truc-tuyen',
    icon: 'video',
  },
  {
    label: 'Khám tại nhà',
    path: '/services/kham-tai-nha',
    icon: 'home',
  },
  {
    label: 'Gói sức khỏe gia đình',
    path: '/services/goi-suc-khoe-gia-dinh',
    icon: 'heart',
  },
];

export const CONTACT_INFO = {
  address: "123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
  phone: "1800 123 456",
  email: "contact@vitafamily.vn",
  workingHours: "Thứ 2 – Chủ nhật: 7:00 – 20:00",
} as const;
