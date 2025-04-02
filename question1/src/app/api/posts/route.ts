// question1/src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth';
import { Post } from '@/lib/types';
import { postsCache, isPostsCacheValid, updatePostsCache } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'latest';
    
    if (!['popular', 'latest'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type parameter. Use "popular" or "latest"' }, 
        { status: 400 }
      );
    }
    
    // Check if cache is valid
    if (isPostsCacheValid()) {
      return getPostsResponse(type);
    }
    
    // Get auth token
    const token = await getAuthToken();
    
    // Get all users
    const usersResponse = await fetch(`${process.env.BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!usersResponse.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const usersData = await usersResponse.json();
    const allPosts: Post[] = [];
    
    // For each user, get their posts
    for (const userId in usersData.users) {
      const postsResponse = await fetch(`${process.env.BASE_URL}/users/${userId}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!postsResponse.ok) continue;
      
      const postsData = await postsResponse.json();
      if (postsData.posts && Array.isArray(postsData.posts)) {
        // Add timestamp and user info
        const postsWithInfo = postsData.posts.map((post: Post) => ({
          ...post,
          timestamp: Date.now(),
          commentCount: 0,
          userName: usersData.users[userId]
        }));
        
        allPosts.push(...postsWithInfo);
      }
    }
    
    // Get comment counts for each post
    for (const post of allPosts) {
      const commentsResponse = await fetch(`${process.env.BASE_URL}/posts/${post.id}/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!commentsResponse.ok) continue;
      
      const commentsData = await commentsResponse.json();
      post.commentCount = commentsData.comments?.length || 0;
    }
    
    // Update cache
    updatePostsCache(allPosts);
    
    // Return response based on type
    return getPostsResponse(type);
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

function getPostsResponse(type: string): NextResponse {
  if (type === 'popular') {
    // Find max comment count
    const maxCommentCount = Math.max(...postsCache.data.map(post => post.commentCount || 0));
    
    // Get all posts with max comment count
    const popularPosts = postsCache.data.filter(post => post.commentCount === maxCommentCount);
    
    return NextResponse.json({ popularPosts });
  } else {
    // Get 5 latest posts
    const latestPosts = [...postsCache.data]
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
      .slice(0, 5);
    
    return NextResponse.json({ latestPosts });
  }
}