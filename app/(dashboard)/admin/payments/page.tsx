'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function AdminPayments() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/admin/payments').then(res => res.json()).then(setTransactions);
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    const res = await fetch('/api/admin/payments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId: id, action })
    });
    if (res.ok) {
      showToast.success(`Payment ${action}d`);
      setTransactions(prev => prev.filter((t: any) => t._id !== id));
    } else {
      showToast.error('Action failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pending Payment Verifications</h1>
      <Card>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">User</th>
              <th>Method</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx: any) => (
              <tr key={tx._id} className="border-b border-gray-700">
                <td className="py-2">{tx.user?.email}</td>
                <td>{tx.method}</td>
                <td>{tx.transactionId}</td>
                <td>{tx.amount} BDT</td>
                <td>
                  <button onClick={() => handleAction(tx._id, 'approve')} className="bg-green-600 px-3 py-1 rounded mr-2">Approve</button>
                  <button onClick={() => handleAction(tx._id, 'reject')} className="bg-red-600 px-3 py-1 rounded">Reject</button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && <tr><td colSpan={5} className="text-center py-4">No pending payments</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
