// question2/src/app/top-users/page.tsx
import { fetchTopUsers } from 'app/lib/api';
import UserCard from 'components/UserCard';

export default async function TopUsersPage() {
  const users = await fetchTopUsers();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top Users</h1>
      
      {users.length === 0 ? (
        <p className="text-center py-10">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard key={user.userId} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
