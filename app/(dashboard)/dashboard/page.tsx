'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import PaymentMethodCard from '@/components/ui/PaymentMethodCard';
import { showToast } from '@/components/ui/Toast';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [methods, setMethods] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [txId, setTxId] = useState('');
  const [stats, setStats] = useState({ totalReferrals: 0, totalEarnings: 0 });

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => setUser(data.user));
    fetch('/api/payment/methods').then(res => res.json()).then(setMethods);
    fetch('/api/referrals/stats').then(res => res.json()).then(data => setStats(data));
  }, []);

  const handlePaymentSubmit = async () => {
    const res = await fetch('/api/payment/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: selectedMethod, transactionId: txId, amount: 500 })
    });
    const data = await res.json();
    if (res.ok) {
      showToast.success('Payment submitted. Awaiting verification.');
      setShowPayment(false);
      setTxId('');
    } else {
      showToast.error(data.error || 'Submission failed');
    }
  };

  if (!user) return <div className="text-center">Loading...</div>;

  if (user.activationStatus !== 'active') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <h1 className="text-2xl font-bold mb-4">Activate Your Account</h1>
          <p className="mb-6">Pay 500 BDT activation fee to start earning.</p>
          {!showPayment ? (
            methods.map((method: any) => (
              <PaymentMethodCard
                key={method.name}
                method={method.name}
                number={method.number}
                onSelect={() => { setSelectedMethod(method.name); setShowPayment(true); }}
              />
            ))
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Transaction ID"
                className="w-full p-2 bg-gray-700 rounded"
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
              />
              <button onClick={handlePaymentSubmit} className="bg-green-600 px-6 py-2 rounded">Submit</button>
              <button onClick={() => setShowPayment(false)} className="ml-2 bg-gray-600 px-6 py-2 rounded">Back</button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
      <p className="text-gray-400 mb-8">Your dashboard overview</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Referrals</h3>
          <p className="text-3xl font-bold text-purple-400">{stats.totalReferrals}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-green-400">{stats.totalEarnings} BDT</p>
        </Card>
      </div>
    </div>
  );
}
