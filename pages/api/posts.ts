import type { NextApiRequest, NextApiResponse } from 'next';

interface Post {
  id: number;
  content: string;
  commentCount: number;
  createdAt: string;
}

const posts: Post[] = [
  { id: 1, content: 'Post about tech', commentCount: 3, createdAt: '2025-04-02T10:00:00Z' },
  { id: 2, content: 'Post about design', commentCount: 5, createdAt: '2025-04-02T11:00:00Z' },
  { id: 3, content: 'Post about food', commentCount: 5, createdAt: '2025-04-02T12:00:00Z' },
  { id: 4, content: 'Post about travel', commentCount: 2, createdAt: '2025-04-02T09:00:00Z' },
  { id: 5, content: 'Post about lifestyle', commentCount: 1, createdAt: '2025-04-02T08:00:00Z' },
  { id: 6, content: 'Post about coding', commentCount: 5, createdAt: '2025-04-02T12:30:00Z' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const type = req.query.type;
  if (type === 'popular') {
    const maxComments = Math.max(...posts.map(p => p.commentCount));
    const popularPosts = posts.filter(p => p.commentCount === maxComments);
    res.status(200).json({ posts: popularPosts });
  } else if (type === 'latest') {
    const latestPosts = posts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    res.status(200).json({ posts: latestPosts });
  } else {
    res.status(400).json({ error: 'Invalid query parameter. Use type=popular or type=latest' });
  }
}
