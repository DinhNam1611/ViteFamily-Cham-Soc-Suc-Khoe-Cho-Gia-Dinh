import db from '../../db.json';
import type { Doctor } from '../types';

export const getDoctors = async (): Promise<Doctor[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return db.doctors as Doctor[];
};

export const getDoctorsByFilter = async (
  specialty: string,
  name: string
): Promise<Doctor[]> => {
  await new Promise((r) => setTimeout(r, 200));
  let result = db.doctors as Doctor[];
  if (specialty !== 'Tất cả') {
    result = result.filter((d) => d.specialty === specialty);
  }
  if (name.trim()) {
    const lower = name.toLowerCase();
    result = result.filter((d) => d.fullName.toLowerCase().includes(lower));
  }
  return result;
};

export const getDoctorBySlug = async (slug: string): Promise<Doctor | undefined> => {
  await new Promise((r) => setTimeout(r, 200));
  return (db.doctors as Doctor[]).find((d) => d.slug === slug);
};
