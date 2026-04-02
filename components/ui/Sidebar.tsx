'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiDollarSign, FiUsers, FiBriefcase, FiLogOut, FiSettings } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState('user');

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => {
      if (data.user) setRole(data.user.role);
    });
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: FiHome },
    { href: '/wallet', label: 'Wallet', icon: FiDollarSign },
    { href: '/referrals', label: 'Referrals', icon: FiUsers },
    { href: '/tasks', label: 'Tasks', icon: FiBriefcase },
    { href: '/withdraw', label: 'Withdraw', icon: FiDollarSign },
  ];
  if (role === 'admin') {
    navItems.push({ href: '/admin', label: 'Admin Panel', icon: FiSettings });
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="w-64 bg-gray-800 h-screen sticky top-0 flex flex-col border-r border-gray-700">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">NetExpressJob</h1>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-700 transition ${
                pathname === item.href ? 'bg-gray-700 text-white border-r-4 border-purple-500' : ''
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-gray-700 transition">
        <FiLogOut size={20} /> Logout
      </button>
    </div>
  );
}
