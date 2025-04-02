// question2/src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Social Media Analytics</h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          Real-time analytics platform for social media data. Explore top users, trending posts, and a live feed.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link href="/top-users" className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition">
            <h2 className="text-2xl font-bold mb-2">Top Users</h2>
            <p>Discover the most active users on the platform</p>
          </Link>
          
          <Link href="/trending-posts" className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 transition">
            <h2 className="text-2xl font-bold mb-2">Trending Posts</h2>
            <p>See what posts are getting the most engagement</p>
          </Link>
          
          <Link href="/feed" className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition">
            <h2 className="text-2xl font-bold mb-2">Live Feed</h2>
            <p>View the latest posts in real-time</p>
          </Link>
        </div>
      </div>
    </div>
  );
}