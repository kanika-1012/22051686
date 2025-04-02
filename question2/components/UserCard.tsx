// question2/src/components/UserCard.tsx
import Image from 'next/image';
import { User } from '@/app/lib/types';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  // Generate a deterministic but random-looking avatar URL
  const getAvatarUrl = (userId: string) => {
    return `https://i.pravatar.cc/150?u=${userId}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className="w-16 h-16 relative mr-4">
        <Image 
          src={getAvatarUrl(user.userId)}
          alt={user.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.postCount} posts</p>
      </div>
    </div>
  );
}