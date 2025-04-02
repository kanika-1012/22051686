// question1/src/lib/cache.ts
import { User, Post } from './types';

// Cache for user post counts
interface UserCache {
  data: Map<string, User>;
  lastFetched: number;
}

// Cache for posts
interface PostsCache {
  data: Post[];
  lastFetched: number;
}

export const userCache: UserCache = {
  data: new Map<string, User>(),
  lastFetched: 0
};

export const postsCache: PostsCache = {
  data: [],
  lastFetched: 0
};

// Cache TTL in milliseconds
export const USER_CACHE_TTL = 60000; // 1 minute
export const POSTS_CACHE_TTL = 30000; // 30 seconds

export function isUserCacheValid(): boolean {
  return (
    userCache.lastFetched > 0 &&
    Date.now() - userCache.lastFetched < USER_CACHE_TTL &&
    userCache.data.size > 0
  );
}

export function isPostsCacheValid(): boolean {
  return (
    postsCache.lastFetched > 0 &&
    Date.now() - postsCache.lastFetched < POSTS_CACHE_TTL &&
    postsCache.data.length > 0
  );
}

export function updateUserCache(users: Map<string, User>): void {
  userCache.data = users;
  userCache.lastFetched = Date.now();
}

export function updatePostsCache(posts: Post[]): void {
  postsCache.data = posts;
  postsCache.lastFetched = Date.now();
}