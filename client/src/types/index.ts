export interface Specialty {
  id: number;
  name: string;
  icon: string;
  slug: string;
  doctorCount: number;
  group: 'internal' | 'surgical' | 'support';
  groupLabel: string;
  description: string;
  commonDiseases: string[];
  staffTypes: string[];
}

export interface TimelineItem {
  period: string;
  description: string;
}

export interface Doctor {
  id: number;
  fullName: string;
  specialty: string;
  subSpecialty?: string;
  hospital: string;
  experience: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  qualifications: string;
  bio: string;
  slug: string;
  languages?: string[];
  education?: TimelineItem[];
  certifications?: TimelineItem[];
  workExperience?: TimelineItem[];
  memberships?: string[];
  specialInterests?: string[];
}

export interface Service {
  id: number;
  name: string;
  icon: string;
  description: string;
  slug: string;
}

export interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
  prefix: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  thumbnail: string;
  summary: string;
}

export interface HeroBanner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
}

export interface ServicePackage {
  id: number;
  name: string;
  category: string;
  slug: string;
  image: string;
  description: string;
  features: string[];
  targetAudience: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'doctor' | 'admin';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UpdateProfilePayload {
  fullName: string;
  phone?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// ─── Family ──────────────────────────────────────────────────────────────────

export interface FamilyMember {
  id: number;
  familyId: number;
  fullName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  allergy?: string;
  medicalHistory?: string;
  relationship: string;
}

export interface Family {
  id: number;
  userId: number;
  familyName: string;
  members: FamilyMember[];
}

export type FamilyMemberPayload = Omit<FamilyMember, 'id' | 'familyId'>;

// ─── Medical Records ─────────────────────────────────────────────────────────

export interface MedicalFile {
  id: number;
  fileUrl: string;
  fileType: 'image' | 'pdf';
  fileName: string;
}

export interface MedicalRecord {
  id: number;
  memberId: number;
  memberName: string;
  visitDate: string;
  hospitalName: string;
  doctorName: string;
  reason: string;
  diagnosis?: string;
  notes?: string;
  files: MedicalFile[];
}
