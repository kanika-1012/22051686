// question2/src/lib/api.ts
import { User, Post } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchTopUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch top users');
    }
    
    const data = await response.json();
    return data.topUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
}

export async function fetchPosts(type: 'popular' | 'latest' = 'latest'): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?type=${type}`, {
      next: { revalidate: 10 } // Revalidate every 10 seconds for "real-time" updates
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} posts`);
    }
    
    const data = await response.json();
    return type === 'popular' ? data.popularPosts : data.latestPosts;
  } catch (error) {
    console.error(`Error fetching ${type} posts:`, error);
    throw error;
  }
}