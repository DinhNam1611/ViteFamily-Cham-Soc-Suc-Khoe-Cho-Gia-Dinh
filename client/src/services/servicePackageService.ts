import db from '../../db.json';
import type { ServicePackage } from '../types';

export const getServicePackages = async (): Promise<ServicePackage[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return db.servicePackages as ServicePackage[];
};

export const getServicePackagesByCategory = async (category: string): Promise<ServicePackage[]> => {
  await new Promise((r) => setTimeout(r, 200));
  if (category === 'Tất cả') return db.servicePackages as ServicePackage[];
  return (db.servicePackages as ServicePackage[]).filter((s) => s.category === category);
};
