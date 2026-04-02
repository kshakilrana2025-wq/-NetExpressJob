'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function ReferralsPage() {
  const [stats, setStats] = useState<any>(null);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => {
      if (data.user) {
        setReferralLink(`${window.location.origin}/register?ref=${data.user.referralCode}`);
      }
    });
    fetch('/api/referrals/stats').then(res => res.json()).then(data => setStats(data));
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    showToast.success('Referral link copied!');
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Referral Program</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <p className="text-gray-400">Total Referrals</p>
          <p className="text-3xl font-bold text-purple-400">{stats.totalReferrals}</p>
        </Card>
        <Card>
          <p className="text-gray-400">Activated Referrals</p>
          <p className="text-3xl font-bold text-green-400">{stats.purchasedReferrals || 0}</p>
        </Card>
        <Card>
          <p className="text-gray-400">Total Earnings from Referrals</p>
          <p className="text-3xl font-bold text-yellow-400">{stats.totalEarnings} BDT</p>
        </Card>
      </div>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
        <div className="flex gap-2">
          <input type="text" readOnly value={referralLink} className="flex-1 bg-gray-700 px-3 py-2 rounded" />
          <button onClick={copyLink} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Copy</button>
        </div>
        <p className="text-sm text-gray-400 mt-4">Earn 1 BDT for every signup, and 150 BDT when they activate their account.</p>
      </Card>
    </div>
  );
}
