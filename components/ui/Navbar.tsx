'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">NetExpressJob</Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-300">Hi, {user.name}</span>
                <button onClick={handleLogout} className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
                <Link href="/register" className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
