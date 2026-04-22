import db from '../../db.json';
import type { NewsItem } from '../types';

export const getNews = async (): Promise<NewsItem[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return db.news;
};

export const getNewsBySlug = async (slug: string): Promise<NewsItem | undefined> => {
  await new Promise((r) => setTimeout(r, 300));
  return db.news.find((n) => n.slug === slug);
};
