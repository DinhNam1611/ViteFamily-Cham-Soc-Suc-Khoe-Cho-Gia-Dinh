import db from '../../db.json';
import type { Doctor } from '../types';

export const getDoctors = async (): Promise<Doctor[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return db.doctors;
};

export const getDoctorById = async (id: number): Promise<Doctor | undefined> => {
  await new Promise((r) => setTimeout(r, 300));
  return db.doctors.find((d) => d.id === id);
};
