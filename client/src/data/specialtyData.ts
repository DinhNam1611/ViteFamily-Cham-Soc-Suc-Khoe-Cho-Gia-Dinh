import type { Specialty } from "../types";

export const SPECIALTIES: Specialty[] = [
  // ── Chuyên khoa Nội ──────────────────────────────────────────────────────
  {
    id: 1,
    name: "Tim Mạch & Can Thiệp",
    slug: "tim-mach",
    icon: "heart",
    doctorCount: 8,
    group: "internal",
    groupLabel: "Chuyên khoa nội",
    description:
      "Chẩn đoán và điều trị toàn diện các bệnh lý về tim, mạch máu. Thực hiện can thiệp mạch vành, đặt stent và điều trị rối loạn nhịp tim không phẫu thuật bằng kỹ thuật hiện đại, đội ngũ bác sĩ giàu kinh nghiệm.",
    commonDiseases: [
      "Tăng huyết áp",
      "Suy tim",
      "Rối loạn nhịp tim",
      "Nhồi máu cơ tim",
      "Bệnh van tim",
    ],
    staffTypes: [
      "Bác sĩ Chuyên khoa I, II",
      "Tiến sĩ",
      "Phó Giáo sư",
      "Giáo sư",
    ],
  },
  {
    id: 2,
    name: "Tiêu Hóa & Gan Mật",
    slug: "tieu-hoa-gan-mat",
    icon: "medicine",
    doctorCount: 6,
    group: "internal",
    groupLabel: "Chuyên khoa nội",
    description:
      "Khám và điều trị các bệnh lý đường tiêu hóa, gan, mật và tụy. Thực hiện nội soi dạ dày, đại tràng và các thủ thuật can thiệp qua nội soi với hệ thống máy móc tiên tiến nhất.",
    commonDiseases: [
      "Viêm loét dạ dày",
      "Xơ gan",
      "Viêm gan B/C",
      "Trào ngược dạ dày",
      "Polyp đại tràng",
    ],
    staffTypes: ["Bác sĩ Chuyên khoa I, II", "Tiến sĩ", "Phó Giáo sư"],
  },
  {
    id: 3,
    name: "Nội Tiết",
    slug: "noi-tiet",
    icon: "experiment",
    doctorCount: 5,
    group: "internal",
    groupLabel: "Chuyên khoa nội",
    description:
      "Chuyên khoa về rối loạn nội tiết tố và chuyển hóa. Quản lý đái tháo đường, bệnh tuyến giáp và các vấn đề hormon lâu dài theo phác đồ cá nhân hóa cho từng bệnh nhân.",
    commonDiseases: [
      "Đái tháo đường type 2",
      "Cường/suy giáp",
      "Loãng xương",
      "Béo phì chuyển hóa",
      "Buồng trứng đa nang",
    ],
    staffTypes: ["Bác sĩ Chuyên khoa I, II", "Tiến sĩ", "Phó Giáo sư"],
  },
  {
    id: 4,
    name: "Nhi & Sơ Sinh",
    slug: "nhi-so-sinh",
    icon: "smile",
    doctorCount: 10,
    group: "internal",
    groupLabel: "Chuyên khoa nội",
    description:
      "Chăm sóc sức khỏe toàn diện cho trẻ từ sơ sinh đến 15 tuổi. Theo dõi tăng trưởng, tiêm phòng và điều trị bệnh lý nhi khoa với đội ngũ điều dưỡng chuyên biệt, không gian thân thiện với trẻ em.",
    commonDiseases: [
      "Viêm phổi trẻ em",
      "Sốt xuất huyết",
      "Còi xương",
      "Tiêu chảy cấp",
      "Hen phế quản trẻ em",
    ],
    staffTypes: [
      "Bác sĩ Nhi khoa CKI, CKII",
      "Tiến sĩ Nhi",
      "Điều dưỡng Nhi chuyên biệt",
    ],
  },
  {
    id: 5,
    name: "Hô Hấp",
    slug: "ho-hap",
    icon: "cloud",
    doctorCount: 5,
    group: "internal",
    groupLabel: "Chuyên khoa nội",
    description:
      "Chẩn đoán và điều trị bệnh lý phổi, phế quản và đường hô hấp. Thực hiện nội soi phế quản, đo chức năng hô hấp và quản lý dài hạn các bệnh mãn tính như hen suyễn, COPD.",
    commonDiseases: [
      "Hen suyễn",
      "COPD",
      "Viêm phổi",
      "Lao phổi",
      "Ung thư phổi giai đoạn sớm",
    ],
    staffTypes: [
      "Bác sĩ Chuyên khoa I, II",
      "Tiến sĩ",
      "Kỹ thuật viên đo hô hấp",
    ],
  },
  {
    id: 6,
    name: "Thần Kinh Nội",
    slug: "than-kinh-noi",
    icon: "bulb",
    doctorCount: 6,
    group: "internal",
    groupLabel: "Chuyên khoa nội",
    description:
      "Điều trị nội khoa các bệnh lý hệ thần kinh trung ương và ngoại biên. Xử lý cấp cứu đột quỵ theo chuẩn quốc tế và quản lý dài hạn bệnh mãn tính thần kinh.",
    commonDiseases: [
      "Đột quỵ não",
      "Động kinh",
      "Parkinson",
      "Đau đầu Migraine",
      "Viêm màng não",
    ],
    staffTypes: [
      "Bác sĩ Chuyên khoa I, II Thần kinh",
      "Tiến sĩ",
      "Phó Giáo sư",
    ],
  },
  {
    id: 7,
    name: "Da Liễu",
    slug: "da-lieu",
    icon: "user",
    doctorCount: 4,
    group: "internal",
    groupLabel: "Chuyên khoa nội",
    description:
      "Khám và điều trị bệnh ngoài da, niêm mạc và các vấn đề thẩm mỹ da liễu. Tư vấn phòng ngừa bệnh lây qua da, ứng dụng công nghệ laser và điều trị ánh sáng hiện đại.",
    commonDiseases: [
      "Viêm da cơ địa",
      "Vảy nến",
      "Mụn trứng cá nặng",
      "Nấm da",
      "Dị ứng da",
    ],
    staffTypes: [
      "Bác sĩ Da liễu CKI, CKII",
      "Tiến sĩ",
      "Kỹ thuật viên laser thẩm mỹ",
    ],
  },
  {
    id: 8,
    name: "Ung Bướu",
    slug: "ung-buou",
    icon: "safety",
    doctorCount: 7,
    group: "internal",
    groupLabel: "Chuyên khoa nội",
    description:
      "Tầm soát, chẩn đoán và điều trị ung thư toàn thân theo phác đồ quốc tế. Phối hợp hóa trị, xạ trị và chăm sóc giảm nhẹ, hỗ trợ tâm lý cho bệnh nhân và gia đình.",
    commonDiseases: [
      "Ung thư vú",
      "Ung thư đại tràng",
      "Ung thư gan",
      "Ung thư phổi",
      "U lympho",
    ],
    staffTypes: [
      "Bác sĩ Ung thư CKI, CKII",
      "Tiến sĩ",
      "Phó Giáo sư",
      "Dược sĩ hóa trị",
    ],
  },

  // ── Chuyên khoa Ngoại ─────────────────────────────────────────────────────
  {
    id: 9,
    name: "Sản & Phụ Khoa",
    slug: "san-phu-khoa",
    icon: "woman",
    doctorCount: 9,
    group: "surgical",
    groupLabel: "Chuyên khoa ngoại",
    description:
      "Chăm sóc sức khỏe sinh sản nữ giới từ tuổi dậy thì đến mãn kinh. Theo dõi thai kỳ, đỡ đẻ an toàn và can thiệp phẫu thuật phụ khoa ít xâm lấn với công nghệ nội soi tiên tiến.",
    commonDiseases: [
      "U xơ tử cung",
      "Viêm phần phụ",
      "Thai ngoài tử cung",
      "Lạc nội mạc tử cung",
      "Ung thư cổ tử cung",
    ],
    staffTypes: [
      "Bác sĩ Sản CKI, CKII",
      "Tiến sĩ",
      "Nữ hộ sinh",
      "Điều dưỡng Sản",
    ],
  },
  {
    id: 10,
    name: "Chấn Thương & Chỉnh Hình",
    slug: "chan-thuong-chinh-hinh",
    icon: "tool",
    doctorCount: 8,
    group: "surgical",
    groupLabel: "Chuyên khoa ngoại",
    description:
      "Điều trị gãy xương, tổn thương cơ xương khớp và các dị tật vận động. Phẫu thuật thay khớp nhân tạo, nội soi khớp và phục hồi chức năng vận động sau chấn thương.",
    commonDiseases: [
      "Gãy xương",
      "Thoát vị đĩa đệm",
      "Thoái hóa khớp gối",
      "Đứt dây chằng",
      "Viêm khớp dạng thấp",
    ],
    staffTypes: [
      "Bác sĩ Chỉnh hình CKI, CKII",
      "Tiến sĩ",
      "Kỹ thuật viên phục hồi chức năng",
    ],
  },
  {
    id: 11,
    name: "Tai - Mũi - Họng",
    slug: "tai-mui-hong",
    icon: "sound",
    doctorCount: 5,
    group: "surgical",
    groupLabel: "Chuyên khoa ngoại",
    description:
      "Khám và điều trị bệnh lý tai, mũi, họng, thanh quản. Thực hiện nội soi TMH, phẫu thuật amygdal, VA và polyp mũi với kỹ thuật nội soi HD ít đau, hồi phục nhanh.",
    commonDiseases: [
      "Viêm mũi xoang mãn",
      "Viêm amygdal",
      "Ù tai mất thính lực",
      "Polyp mũi",
      "Viêm họng mãn",
    ],
    staffTypes: ["Bác sĩ TMH CKI, CKII", "Tiến sĩ", "Kỹ thuật viên thính học"],
  },
  {
    id: 12,
    name: "Mắt",
    slug: "mat",
    icon: "eye",
    doctorCount: 6,
    group: "surgical",
    groupLabel: "Chuyên khoa ngoại",
    description:
      "Chẩn đoán và điều trị toàn bộ bệnh lý mắt. Phẫu thuật đục thủy tinh thể, laser điều trị tật khúc xạ và quản lý bệnh glaucoma với máy móc kiểm tra chuyên sâu hiện đại.",
    commonDiseases: [
      "Đục thủy tinh thể",
      "Glaucoma",
      "Thoái hóa điểm vàng",
      "Viêm màng bồ đào",
      "Cận thị nặng",
    ],
    staffTypes: ["Bác sĩ Mắt CKI, CKII", "Tiến sĩ", "Kỹ thuật viên khúc xạ"],
  },
  {
    id: 13,
    name: "Răng - Hàm - Mặt",
    slug: "rang-ham-mat",
    icon: "alert",
    doctorCount: 5,
    group: "surgical",
    groupLabel: "Chuyên khoa ngoại",
    description:
      "Điều trị bệnh lý răng miệng và vùng hàm mặt. Cung cấp dịch vụ từ nhổ răng khôn, cấy ghép implant đến phẫu thuật chỉnh hình hàm mặt với vô cảm an toàn.",
    commonDiseases: [
      "Sâu răng phức tạp",
      "Viêm nha chu",
      "Răng khôn mọc lệch",
      "Rối loạn khớp hàm",
      "U nang vùng hàm",
    ],
    staffTypes: [
      "Bác sĩ RHM CKI, CKII",
      "Tiến sĩ",
      "Kỹ thuật viên phục hình răng",
    ],
  },
  {
    id: 14,
    name: "Phẫu Thuật Thần Kinh",
    slug: "phau-thuat-than-kinh",
    icon: "thunderbolt",
    doctorCount: 4,
    group: "surgical",
    groupLabel: "Chuyên khoa ngoại",
    description:
      "Phẫu thuật điều trị các tổn thương não, tủy sống và dây thần kinh ngoại biên. Xử lý cấp cứu chấn thương sọ não và u não với kính vi phẫu, hệ thống định vị thần kinh 3D.",
    commonDiseases: [
      "Chấn thương sọ não",
      "U não lành/ác tính",
      "Thoát vị đĩa đệm cổ/thắt lưng nặng",
      "Phình động mạch não",
      "Tụ máu nội sọ",
    ],
    staffTypes: [
      "Bác sĩ Phẫu thuật Thần kinh CKI, CKII",
      "Tiến sĩ",
      "Phó Giáo sư",
    ],
  },
  {
    id: 15,
    name: "Tiết Niệu",
    slug: "tiet-nieu",
    icon: "filter",
    doctorCount: 5,
    group: "surgical",
    groupLabel: "Chuyên khoa ngoại",
    description:
      "Điều trị bệnh lý thận, bàng quang, tuyến tiền liệt và đường tiết niệu. Phẫu thuật nội soi tán sỏi và can thiệp ung thư tiết niệu với kỹ thuật robot hỗ trợ.",
    commonDiseases: [
      "Sỏi thận/bàng quang",
      "Phì đại tuyến tiền liệt",
      "Ung thư thận",
      "Nhiễm khuẩn tiết niệu tái phát",
      "Tiểu không kiểm soát",
    ],
    staffTypes: [
      "Bác sĩ Tiết niệu CKI, CKII",
      "Tiến sĩ",
      "Kỹ thuật viên nội soi",
    ],
  },

  // ── Chuyên khoa Hỗ Trợ ───────────────────────────────────────────────────
  {
    id: 16,
    name: "Chẩn Đoán Hình Ảnh",
    slug: "chan-doan-hinh-anh",
    icon: "fileimage",
    doctorCount: 6,
    group: "support",
    groupLabel: "Chuyên khoa hỗ trợ",
    description:
      "Thực hiện và đọc kết quả X-quang, siêu âm, CT scan, MRI toàn thân. Hỗ trợ chẩn đoán chính xác cho tất cả chuyên khoa lâm sàng với thiết bị hình ảnh 1.5T, 3T hiện đại.",
    commonDiseases: [
      "Siêu âm thai sản",
      "CT ngực tầm soát ung thư",
      "MRI não/cột sống",
      "X-quang xương khớp",
      "Siêu âm tim",
    ],
    staffTypes: [
      "Bác sĩ CĐHA CKI, CKII",
      "Tiến sĩ",
      "Kỹ thuật viên X-quang/MRI",
    ],
  },
  {
    id: 17,
    name: "Xét Nghiệm",
    slug: "xet-nghiem",
    icon: "database",
    doctorCount: 4,
    group: "support",
    groupLabel: "Chuyên khoa hỗ trợ",
    description:
      "Phân tích mẫu máu, nước tiểu và mô bệnh học phục vụ chẩn đoán và theo dõi điều trị. Kết quả nhanh chóng và chính xác theo tiêu chuẩn ISO 15189 quốc tế.",
    commonDiseases: [
      "Xét nghiệm máu tổng quát",
      "Sinh hóa gan/thận",
      "Dấu ấn ung thư",
      "Cấy khuẩn kháng sinh đồ",
      "Giải phẫu bệnh",
    ],
    staffTypes: [
      "Bác sĩ Xét nghiệm CKI, CKII",
      "Cử nhân Xét nghiệm",
      "Kỹ thuật viên phòng lab",
    ],
  },
  {
    id: 18,
    name: "Vật Lý Trị Liệu",
    slug: "vat-ly-tri-lieu",
    icon: "fire",
    doctorCount: 5,
    group: "support",
    groupLabel: "Chuyên khoa hỗ trợ",
    description:
      "Phục hồi chức năng vận động sau phẫu thuật, chấn thương và đột quỵ. Kết hợp vật lý trị liệu, điện trị liệu và bài tập phục hồi chuyên biệt theo từng tình trạng bệnh nhân.",
    commonDiseases: [
      "Phục hồi sau đột quỵ",
      "Đau thắt lưng mãn tính",
      "Liệt sau chấn thương",
      "Thoái hóa khớp",
      "Phục hồi sau thay khớp",
    ],
    staffTypes: [
      "Bác sĩ Phục hồi CKI, CKII",
      "Cử nhân VLTL",
      "Kỹ thuật viên trị liệu vận động",
    ],
  },
  {
    id: 19,
    name: "Dinh Dưỡng",
    slug: "dinh-duong",
    icon: "star",
    doctorCount: 3,
    group: "support",
    groupLabel: "Chuyên khoa hỗ trợ",
    description:
      "Tư vấn chế độ ăn uống cá nhân hóa cho người bệnh mãn tính và hỗ trợ điều trị. Quản lý dinh dưỡng lâm sàng toàn diện cho bệnh nhân nội trú và ngoại trú.",
    commonDiseases: [
      "Đái tháo đường chế độ ăn",
      "Béo phì",
      "Suy dinh dưỡng trẻ em",
      "Bệnh thận chế độ ăn đặc biệt",
      "Rối loạn ăn uống",
    ],
    staffTypes: [
      "Bác sĩ Dinh dưỡng CKI",
      "Cử nhân Dinh dưỡng",
      "Kỹ thuật viên tiết chế",
    ],
  },
  {
    id: 20,
    name: "Khoa Dược",
    slug: "khoa-duoc",
    icon: "shop",
    doctorCount: 4,
    group: "support",
    groupLabel: "Chuyên khoa hỗ trợ",
    description:
      "Cấp phát, tư vấn sử dụng thuốc an toàn và quản lý tương tác thuốc cho bệnh nhân. Hỗ trợ bác sĩ tối ưu hóa phác đồ dùng thuốc theo tiêu chuẩn dược lâm sàng quốc tế.",
    commonDiseases: [
      "Tư vấn dùng thuốc mãn tính",
      "Kiểm soát tương tác thuốc",
      "Dược lâm sàng nội trú",
      "Quản lý thuốc kiểm soát",
      "Dược cảnh giác",
    ],
    staffTypes: [
      "Dược sĩ Chuyên khoa I, II",
      "Tiến sĩ Dược",
      "Dược sĩ lâm sàng",
    ],
  },
];

export const getSpecialtyBySlug = (slug: string): Specialty | undefined =>
  SPECIALTIES.find((s) => s.slug === slug);

export const getSpecialtiesByGroup = (group: Specialty["group"]): Specialty[] =>
  SPECIALTIES.filter((s) => s.group === group);

export const GROUP_META: Record<
  Specialty["group"],
  { label: string; description: string }
> = {
  internal: {
    label: "Chuyên khoa nội",
    description:
      "Chẩn đoán và điều trị nội khoa các bệnh lý mãn tính và cấp tính không cần phẫu thuật.",
  },
  surgical: {
    label: "Chuyên khoa ngoại",
    description:
      "Can thiệp phẫu thuật và điều trị ngoại khoa bằng kỹ thuật nội soi và vi phẫu hiện đại.",
  },
  support: {
    label: "Chuyên khoa hỗ trợ",
    description:
      "Hỗ trợ chẩn đoán, xét nghiệm và phục hồi chức năng cho các chuyên khoa lâm sàng.",
  },
};
