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
  { label: "Trang chủ", path: "/" },
  { label: "Giới thiệu", path: "/about" },
  { label: "Hướng dẫn bệnh nhân", path: "/help" },
  { label: "Dịch vụ", path: "/services" },
  { label: "Bác sĩ", path: "/doctors" },
  { label: "Tin tức", path: "/news" },
  { label: "Liên hệ", path: "/contact" },
] as const;

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

export const CONTACT_INFO = {
  address: "123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
  phone: "1800 123 456",
  email: "contact@vitafamily.vn",
  workingHours: "Thứ 2 – Chủ nhật: 7:00 – 20:00",
} as const;
