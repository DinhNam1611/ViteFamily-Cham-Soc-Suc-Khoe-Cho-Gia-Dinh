import { SPECIALTIES, getSpecialtyBySlug as findBySlug } from '../data/specialtyData';
import type { Specialty } from '../types';

export const getSpecialties = async (): Promise<Specialty[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return SPECIALTIES;
};

export const getSpecialtyBySlug = async (slug: string): Promise<Specialty | undefined> => {
  await new Promise((r) => setTimeout(r, 300));
  return findBySlug(slug);
};
