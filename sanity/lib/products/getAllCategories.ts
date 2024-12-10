import { sanityFetch } from '../live';
import { defineQuery } from 'next-sanity';

export const getAllCategoriess = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(`
    *[
        -type == 'category'
    ] | order(name asc)
    `);
  try {
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });

    return categories.data || [];
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
};
