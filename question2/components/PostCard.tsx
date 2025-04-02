// question2/src/components/PostCard.tsx
import Image from 'next/image';
import { Post } from '@/app/lib/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Generate a deterministic but random-looking image URL
  const getImageUrl = (postId: number) => {
    return `https://picsum.photos/seed/${postId}/400/300`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="h-48 relative">
        <Image 
          src={getImageUrl(post.id)}
          alt={post.content}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 relative mr-3">
            <Image 
              src={`https://i.pravatar.cc/150?u=${post.userid}`}
              alt={post.userName || 'User'}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="font-medium">{post.userName || 'User'}</span>
        </div>
        
        <p className="text-gray-700 mb-2">{post.content}</p>
        
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <span className="mr-4">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {post.commentCount || 0} comments
          </span>
        </div>
      </div>
    </div>
  );
}