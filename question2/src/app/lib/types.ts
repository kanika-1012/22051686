// question2/src/lib/types.ts
export interface User {
  userId: string;
  name: string;
  postCount: number;
}

export interface Post {
  id: number;
  userid: number;
  content: string;
  commentCount?: number;
  timestamp?: number;
  userName?: string;
}