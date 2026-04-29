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
  { id: "specialties", label: "nav.specialties", path: "/specialties" },
  { id: "about", label: "nav.about", path: "/about" },
  { id: "guide", label: "nav.guide", path: "/help" },
  { id: "services", label: "nav.services", path: "/services" },
  { id: "doctors", label: "nav.doctors", path: "/doctors" },
  { id: "news", label: "nav.news", path: "/news" },
  { id: "contact", label: "nav.contact", path: "/contact" },
] as const;

export const SPECIALTY_GROUPS = [
  {
    label: "specialties.internal",
    path: "/specialties?group=internal",
    items: [
      { label: "specialties.cardiology", path: "/specialties/tim-mach" },
      {
        label: "specialties.gastroenterology",
        path: "/specialties/tieu-hoa-gan-mat",
      },
      { label: "specialties.endocrinology", path: "/specialties/noi-tiet" },
      { label: "specialties.pediatrics", path: "/specialties/nhi-so-sinh" },
      { label: "specialties.respiratory", path: "/specialties/ho-hap" },
      { label: "specialties.neurology", path: "/specialties/than-kinh-noi" },
      { label: "specialties.dermatology", path: "/specialties/da-lieu" },
      { label: "specialties.oncology", path: "/specialties/ung-buou" },
    ],
  },
  {
    label: "specialties.surgical",
    path: "/specialties?group=surgical",
    items: [
      { label: "specialties.obstetrics", path: "/specialties/san-phu-khoa" },
      {
        label: "specialties.orthopedics",
        path: "/specialties/chan-thuong-chinh-hinh",
      },
      { label: "specialties.ent", path: "/specialties/tai-mui-hong" },
      { label: "specialties.ophthalmology", path: "/specialties/mat" },
      { label: "specialties.dentistry", path: "/specialties/rang-ham-mat" },
      {
        label: "specialties.neurosurgery",
        path: "/specialties/phau-thuat-than-kinh",
      },
      { label: "specialties.urology", path: "/specialties/tiet-nieu" },
    ],
  },
  {
    label: "specialties.support",
    path: "/specialties?group=support",
    items: [
      {
        label: "specialties.radiology",
        path: "/specialties/chan-doan-hinh-anh",
      },
      { label: "specialties.laboratory", path: "/specialties/xet-nghiem" },
      {
        label: "specialties.physical_therapy",
        path: "/specialties/vat-ly-tri-lieu",
      },
      { label: "specialties.nutrition", path: "/specialties/dinh-duong" },
      { label: "specialties.pharmacy", path: "/specialties/khoa-duoc" },
    ],
  },
];

export const FOOTER_NAV = {
  services: [
    { label: "footer.general_checkup", path: "/services/kham-tong-quat" },
    { label: "footer.lab_test", path: "/services/xet-nghiem" },
    { label: "footer.imaging", path: "/services/chan-doan-hinh-anh" },
    { label: "footer.online_consult", path: "/services/tu-van-truc-tuyen" },
  ],
  quickLinks: [
    { label: "footer.book_appointment", path: "/contact/dat-lich-kham" },
    { label: "footer.find_doctor", path: "/doctors" },
    { label: "footer.lab_results", path: "/ket-qua-xet-nghiem" },
    { label: "footer.health_news", path: "/news" },
  ],
} as const;

export const NEWS_CATEGORIES = [
  {
    label: "Sự Kiện",
    slug: "su-kien",
    path: "/news?category=su-kien",
    banner: "https://picsum.photos/seed/hospital-event/1440/400",
  },
  {
    label: "Thông Tin Báo Chí",
    slug: "bao-chi",
    path: "/news?category=bao-chi",
    banner: "https://picsum.photos/seed/press-medical/1440/400",
  },
  {
    label: "Tin Tức Ưu Đãi",
    slug: "uu-dai",
    path: "/news?category=uu-dai",
    banner: "https://picsum.photos/seed/health-promotion/1440/400",
  },
  {
    label: "Ca Bệnh Thành Công",
    slug: "ca-benh",
    path: "/news?category=ca-benh",
    banner: "https://picsum.photos/seed/success-surgery/1440/400",
  },
  {
    label: "Cảm Nhận Khách Hàng",
    slug: "cam-nhan",
    path: "/news?category=cam-nhan",
    banner: "https://picsum.photos/seed/patient-care/1440/400",
  },
  {
    label: "Chuyên Môn Y Tế",
    slug: "chuyen-mon",
    path: "/news?category=chuyen-mon",
    banner: "https://picsum.photos/seed/doctor-expert/1440/400",
  },
  {
    label: "Thư Viện Ảnh",
    slug: "thu-vien",
    path: "/news?category=thu-vien",
    banner: "https://picsum.photos/seed/gallery-clinic/1440/400",
  },
] as const;

export const PATIENT_GUIDE_DROPDOWN = [
  {
    label: "guide_dropdown.outpatient",
    path: "/help?tab=kham-ngoai-tru",
    icon: "medicine",
  },
  {
    label: "guide_dropdown.inpatient",
    path: "/help?tab=nhap-vien",
    icon: "home",
  },
  {
    label: "guide_dropdown.payment",
    path: "/help?tab=thanh-toan",
    icon: "credit-card",
  },
  {
    label: "guide_dropdown.amenities",
    path: "/help?tab=tien-ich",
    icon: "star",
  },
  { label: "guide_dropdown.visit", path: "/help?tab=tham-benh", icon: "team" },
];

export const SERVICES_DROPDOWN = [
  {
    label: "services_dropdown.specialist",
    path: "/services?cat=kham-chuyen-khoa",
    icon: "medicine",
  },
  {
    label: "services_dropdown.general",
    path: "/services?cat=goi-kham-tong-quat",
    icon: "heart",
  },
  {
    label: "services_dropdown.lab",
    path: "/services?cat=xet-nghiem",
    icon: "experiment",
  },
  {
    label: "services_dropdown.vaccine",
    path: "/services?cat=tiem-chung",
    icon: "safety",
  },
  {
    label: "services_dropdown.surgery",
    path: "/services?cat=phau-thuat",
    icon: "scan",
  },
  {
    label: "services_dropdown.digital",
    path: "/services?cat=dich-vu-so",
    icon: "video",
  },
];

export const CONTACT_INFO = {
  address: "123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
  phone: "1800 123 456",
  email: "contact@vitafamily.vn",
  workingHours: "Thứ 2 – Chủ nhật: 7:00 – 20:00",
} as const;
