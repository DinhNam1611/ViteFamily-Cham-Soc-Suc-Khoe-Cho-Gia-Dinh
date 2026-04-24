export interface Specialty {
  id: number;
  name: string;
  icon: string;
  slug: string;
  doctorCount: number;
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
