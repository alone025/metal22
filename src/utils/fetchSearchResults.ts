'use server';

import { FoundProduct } from 'components//SearchBlock';

export default async function fetchSearchResults(
  searchQuery: string
): Promise<FoundProduct[]> {
  if (!searchQuery) {
    return [];
  }

  try {
    const response = await fetch(
      `https://marcas.pro/api/product?product_name=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}
