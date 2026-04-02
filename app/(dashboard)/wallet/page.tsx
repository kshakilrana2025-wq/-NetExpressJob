'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function WalletPage() {
  const [wallet, setWallet] = useState({ available: 0, pending: 0, totalEarned: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/wallet').then(res => res.json()).then(setWallet);
    fetch('/api/transactions').then(res => res.json()).then(setTransactions);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Available</p>
              <p className="text-2xl font-bold text-green-400">{wallet.available} BDT</p>
            </div>
            <FiTrendingUp className="text-3xl text-green-400" />
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{wallet.pending} BDT</p>
            </div>
            <FiClock className="text-3xl text-yellow-400" />
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Total Earned</p>
              <p className="text-2xl font-bold text-purple-400">{wallet.totalEarned} BDT</p>
            </div>
            <FiCheckCircle className="text-3xl text-purple-400" />
          </div>
        </Card>
      </div>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet.</p>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx: any) => (
              <div key={tx.id} className="flex justify-between border-b border-gray-700 py-2">
                <span>{tx.type}</span>
                <span className={tx.amount > 0 ? 'text-green-400' : 'text-red-400'}>{tx.amount} BDT</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
