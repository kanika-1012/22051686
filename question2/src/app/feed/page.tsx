// question2/src/app/feed/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchPosts } from 'app/lib/api';
import PostCard from 'components/PostCard';
import { Post } from 'app/lib/types';

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const latestPosts = await fetchPosts('latest');
        setPosts(latestPosts);
        setError(null);
      } catch (err) {
        setError('Failed to load feed posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Load posts initially
    loadPosts();
    
    // Set up polling for real-time updates
    const interval = setInterval(loadPosts, 10000); // Poll every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (loading && posts.length === 0) {
    return <div className="text-center py-10">Loading feed...</div>;
  }

  if (error && posts.length === 0) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Live Feed</h1>
      <div className="max-w-3xl mx-auto">
        {posts.length === 0 ? (
          <p className="text-center py-10">No posts in feed.</p>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
