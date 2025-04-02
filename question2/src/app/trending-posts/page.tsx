// question2/src/app/trending-posts/page.tsx
import { fetchPosts } from 'app/lib/api';
import PostCard from 'components/PostCard';

export default async function TrendingPostsPage() {
  const posts = await fetchPosts('popular');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trending Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-center py-10">No trending posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
