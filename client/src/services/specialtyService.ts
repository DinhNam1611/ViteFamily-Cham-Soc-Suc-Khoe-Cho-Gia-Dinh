import db from '../../db.json';
import type { Specialty } from '../types';

export const getSpecialties = async (): Promise<Specialty[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return db.specialties;
};

export const getSpecialtyBySlug = async (slug: string): Promise<Specialty | undefined> => {
  await new Promise((r) => setTimeout(r, 300));
  return db.specialties.find((s) => s.slug === slug);
};
