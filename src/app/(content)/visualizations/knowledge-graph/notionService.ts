import { Concept } from '@/types/notion';

export async function fetchConcepts(): Promise<Concept[]> {
  try {
    const response = await fetch('/api/notion/concepts');
    if (!response.ok) {
      throw new Error('Failed to fetch concepts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching concepts:', error);
    return [];
  }
} 