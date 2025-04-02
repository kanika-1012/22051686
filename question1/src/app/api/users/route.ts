// question1/src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth';
import { User } from '@/lib/types';
import { userCache, isUserCacheValid, updateUserCache } from '@/lib/cache';

export async function GET() {
  try {
    // Check if cache is valid
    if (isUserCacheValid()) {
      const topUsers = Array.from(userCache.data.values())
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5);
      
      return NextResponse.json({ topUsers });
    }
    
    // Get auth token
    const token = await getAuthToken();
    
    // Get all users
    const usersResponse = await fetch(`${process.env.BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!usersResponse.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const usersData = await usersResponse.json();
    const users = usersData.users;
    
    // New cache
    const newCache = new Map<string, User>();
    
    // Fetch post counts for each user
    for (const userId in users) {
      // Get posts for this user
      const postsResponse = await fetch(`${process.env.BASE_URL}/users/${userId}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!postsResponse.ok) {
        continue; // Skip this user if error occurs
      }
      
      const postsData = await postsResponse.json();
      const postCount = postsData.posts?.length || 0;
      
      // Add to cache
      newCache.set(userId, {
        userId,
        name: users[userId],
        postCount
      });
    }
    
    // Update cache
    updateUserCache(newCache);
    
    // Get top 5 users
    const topUsers = Array.from(newCache.values())
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);
    
    return NextResponse.json({ topUsers });
    
  } catch (error) {
    console.error('Error fetching top users:', error);
    return NextResponse.json({ error: 'Failed to fetch top users' }, { status: 500 });
  }
}