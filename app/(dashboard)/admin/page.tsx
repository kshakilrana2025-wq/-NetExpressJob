'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { FiUsers, FiDollarSign, FiCreditCard, FiBriefcase, FiSettings } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, pendingWithdrawals: 0, pendingPayments: 0, pendingTasks: 0 });

  useEffect(() => {
    fetch('/api/admin/stats').then(res => res.json()).then(setStats);
  }, []);

  const items = [
    { title: 'Users', value: stats.users, icon: FiUsers, href: '/admin/users' },
    { title: 'Pending Withdrawals', value: stats.pendingWithdrawals, icon: FiDollarSign, href: '/admin/withdrawals' },
    { title: 'Pending Payments', value: stats.pendingPayments, icon: FiCreditCard, href: '/admin/payments' },
    { title: 'Pending Task Submissions', value: stats.pendingTasks, icon: FiBriefcase, href: '/admin/tasks' },
    { title: 'Settings', value: 'Configure', icon: FiSettings, href: '/admin/settings' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Control Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="hover:scale-105 transition cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">{item.title}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <item.icon className="text-4xl text-purple-400" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
