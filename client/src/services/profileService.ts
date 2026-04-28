import axiosInstance from '../config/axios';
import type {
  User,
  UpdateProfilePayload,
  ChangePasswordPayload,
  Family,
  FamilyMemberPayload,
  FamilyMember,
  MedicalRecord,
} from '../types';

const USE_MOCK = true;
const mockDelay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_FAMILY: Family = {
  id: 1,
  userId: 1,
  familyName: 'Gia đình Nguyễn Văn A',
  members: [
    {
      id: 1,
      familyId: 1,
      fullName: 'Nguyễn Văn A',
      dob: '1985-05-15',
      gender: 'male',
      bloodType: 'O+',
      allergy: 'Penicillin',
      medicalHistory: 'Tăng huyết áp độ 1',
      relationship: 'Bản thân',
    },
    {
      id: 2,
      familyId: 1,
      fullName: 'Trần Thị B',
      dob: '1988-09-22',
      gender: 'female',
      bloodType: 'A+',
      allergy: '',
      medicalHistory: '',
      relationship: 'Vợ/Chồng',
    },
    {
      id: 3,
      familyId: 1,
      fullName: 'Nguyễn Văn C',
      dob: '2015-03-10',
      gender: 'male',
      bloodType: 'B+',
      allergy: 'Hải sản',
      medicalHistory: 'Viêm mũi dị ứng',
      relationship: 'Con',
    },
  ],
};

const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 1,
    memberId: 1,
    memberName: 'Nguyễn Văn A',
    visitDate: '2024-12-10',
    hospitalName: 'Bệnh viện Đa khoa VitaFamily',
    doctorName: 'BS. Nguyễn Thị Hương',
    reason: 'Khám định kỳ huyết áp',
    diagnosis: 'Tăng huyết áp kiểm soát tốt',
    notes: 'Tiếp tục dùng thuốc hạ áp, tái khám sau 3 tháng',
    files: [
      { id: 1, fileUrl: '', fileType: 'pdf', fileName: 'ket_qua_xet_nghiem_1210.pdf' },
      { id: 2, fileUrl: '', fileType: 'image', fileName: 'dien_tam_do_1210.jpg' },
    ],
  },
  {
    id: 2,
    memberId: 1,
    memberName: 'Nguyễn Văn A',
    visitDate: '2024-09-05',
    hospitalName: 'Phòng khám Nội tiết VitaFamily',
    doctorName: 'BS. Lê Văn Minh',
    reason: 'Kiểm tra đường huyết',
    diagnosis: 'Đường huyết ổn định, không có dấu hiệu tiểu đường',
    notes: 'Duy trì chế độ ăn và luyện tập',
    files: [
      { id: 3, fileUrl: '', fileType: 'pdf', fileName: 'xet_nghiem_mau_0905.pdf' },
    ],
  },
  {
    id: 3,
    memberId: 2,
    memberName: 'Trần Thị B',
    visitDate: '2025-01-15',
    hospitalName: 'Bệnh viện Đa khoa VitaFamily',
    doctorName: 'BS. Phạm Thị Lan',
    reason: 'Khám phụ khoa định kỳ',
    diagnosis: 'Sức khỏe bình thường',
    notes: 'Không có bất thường, tái khám sau 6 tháng',
    files: [],
  },
  {
    id: 4,
    memberId: 3,
    memberName: 'Nguyễn Văn C',
    visitDate: '2025-02-20',
    hospitalName: 'Phòng khám Nhi VitaFamily',
    doctorName: 'BS. Trần Văn Đức',
    reason: 'Viêm họng, sốt cao',
    diagnosis: 'Viêm họng cấp do vi khuẩn',
    notes: 'Kháng sinh 7 ngày, hạ sốt khi cần',
    files: [
      { id: 4, fileUrl: '', fileType: 'pdf', fileName: 'don_thuoc_0220.pdf' },
    ],
  },
];

// ─── Profile ──────────────────────────────────────────────────────────────────

export const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
  if (USE_MOCK) {
    await mockDelay();
    const raw = localStorage.getItem('user');
    const current: User = raw ? JSON.parse(raw) : {};
    const updated = { ...current, ...payload };
    localStorage.setItem('user', JSON.stringify(updated));
    return updated;
  }
  const res = await axiosInstance.put<{ success: boolean; data: User }>('/users/profile', payload);
  return res.data.data;
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<void> => {
  if (USE_MOCK) {
    await mockDelay();
    if (payload.currentPassword !== '123456') {
      throw new Error('Mật khẩu hiện tại không đúng');
    }
    return;
  }
  await axiosInstance.put('/users/change-password', payload);
};

// ─── Family ──────────────────────────────────────────────────────────────────

export const getFamily = async (): Promise<Family> => {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_FAMILY;
  }
  const res = await axiosInstance.get<{ success: boolean; data: Family }>('/families');
  return res.data.data;
};

export const addFamilyMember = async (payload: FamilyMemberPayload): Promise<FamilyMember> => {
  if (USE_MOCK) {
    await mockDelay();
    const newMember: FamilyMember = { id: Date.now(), familyId: 1, ...payload };
    MOCK_FAMILY.members = [...MOCK_FAMILY.members, newMember];
    return newMember;
  }
  const res = await axiosInstance.post<{ success: boolean; data: FamilyMember }>('/families/members', payload);
  return res.data.data;
};

export const updateFamilyMember = async (id: number, payload: FamilyMemberPayload): Promise<FamilyMember> => {
  if (USE_MOCK) {
    await mockDelay();
    const idx = MOCK_FAMILY.members.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Không tìm thấy thành viên');
    const updated: FamilyMember = { ...MOCK_FAMILY.members[idx], ...payload };
    const newMembers = [...MOCK_FAMILY.members];
    newMembers[idx] = updated;
    MOCK_FAMILY.members = newMembers;
    return updated;
  }
  const res = await axiosInstance.put<{ success: boolean; data: FamilyMember }>(`/families/members/${id}`, payload);
  return res.data.data;
};

export const deleteFamilyMember = async (id: number): Promise<void> => {
  if (USE_MOCK) {
    await mockDelay(400);
    MOCK_FAMILY.members = MOCK_FAMILY.members.filter((m) => m.id !== id);
    return;
  }
  await axiosInstance.delete(`/families/members/${id}`);
};

// ─── Medical Records ─────────────────────────────────────────────────────────

export const getMedicalRecords = async (): Promise<MedicalRecord[]> => {
  if (USE_MOCK) {
    await mockDelay();
    return [...MOCK_RECORDS];
  }
  const res = await axiosInstance.get<{ success: boolean; data: MedicalRecord[] }>('/medical-records');
  return res.data.data;
};
