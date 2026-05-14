import db from '../../db.json';
import type { ServicePackage } from '../types';

let _cache: ServicePackage[] | null = null;

// Trả về cache đồng bộ ([] nếu chưa load lần nào)
export const getCachedServicePackages = (): ServicePackage[] => _cache ?? [];

export const getServicePackages = async (): Promise<ServicePackage[]> => {
  if (_cache) return _cache;
  await new Promise((r) => setTimeout(r, 300));
  _cache = db.servicePackages as ServicePackage[];
  return _cache;
};

export const getServicePackagesByCategory = async (category: string): Promise<ServicePackage[]> => {
  const all = await getServicePackages();
  if (category === 'Tất cả') return all;
  return all.filter((s) => s.category === category);
};

export const getServicePackageBySlug = async (slug: string): Promise<ServicePackage | null> => {
  const all = await getServicePackages();
  return all.find((s) => s.slug === slug) ?? null;
};
