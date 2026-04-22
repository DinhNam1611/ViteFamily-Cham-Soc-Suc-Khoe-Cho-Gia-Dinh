import db from '../../db.json';
import type { HeroBanner, Stat, Milestone, Service } from '../types';

export const getHeroBanners = async (): Promise<HeroBanner[]> => {
  await new Promise((r) => setTimeout(r, 200));
  return db.heroBanners;
};

export const getStats = async (): Promise<Stat[]> => {
  await new Promise((r) => setTimeout(r, 200));
  return db.stats;
};

export const getMilestones = async (): Promise<Milestone[]> => {
  await new Promise((r) => setTimeout(r, 200));
  return db.milestones;
};

export const getServices = async (): Promise<Service[]> => {
  await new Promise((r) => setTimeout(r, 200));
  return db.services;
};
