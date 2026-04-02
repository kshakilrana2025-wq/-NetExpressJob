'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    fetch('/api/admin/withdrawals').then(res => res.json()).then(setWithdrawals);
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    const res = await fetch('/api/admin/withdrawal', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ withdrawalId: id, action })
    });
    if (res.ok) {
      showToast.success(`Withdrawal ${action}d`);
      setWithdrawals(prev => prev.filter((w: any) => w._id !== id));
    } else {
      showToast.error('Action failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pending Withdrawals</h1>
      <Card>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">User</th>
              <th>Amount</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w: any) => (
              <tr key={w._id} className="border-b border-gray-700">
                <td className="py-2">{w.user?.email}</td>
                <td>{w.amount} BDT</td>
                <td>{new Date(w.requestDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleAction(w._id, 'approve')} className="bg-green-600 px-3 py-1 rounded mr-2">Approve</button>
                  <button onClick={() => handleAction(w._id, 'reject')} className="bg-red-600 px-3 py-1 rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
