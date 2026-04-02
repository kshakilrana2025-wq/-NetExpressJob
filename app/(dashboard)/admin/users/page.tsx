'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/admin/users').then(res => res.json()).then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      <Card>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Activation</th>
              <th>Wallet</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="py-2">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.activationStatus}</td>
                <td>{user.wallet.available} BDT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
