'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast';

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState({ available: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/wallet').then(res => res.json()).then(data => setWallet(data));
  }, []);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount < 10) {
      showToast.error('Minimum withdrawal is 10 BDT');
      return;
    }
    if (numAmount > wallet.available) {
      showToast.error('Insufficient balance');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: numAmount })
    });
    const data = await res.json();
    if (res.ok) {
      showToast.success('Withdrawal request submitted');
      setAmount('');
      setWallet(prev => ({ ...prev, available: prev.available - numAmount }));
    } else {
      showToast.error(data.error || 'Request failed');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Withdraw Funds</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Request Withdrawal</h2>
          <p className="text-gray-400 mb-4">Available balance: <span className="text-green-400 font-bold">{wallet.available} BDT</span></p>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <Input type="number" step="1" min="10" placeholder="Amount (BDT)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Submitting...' : 'Request Withdrawal'}</Button>
          </form>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4">Withdrawal Rules</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Minimum withdrawal: 10 BDT</li>
            <li>Processing time: 24-48 hours</li>
            <li>Funds will be sent to your bKash/Nagad/Rocket</li>
            <li>Admin approval required</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
