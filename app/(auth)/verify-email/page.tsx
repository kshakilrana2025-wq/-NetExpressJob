'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    if (res.ok) {
      showToast.success('Email verified! Please login.');
      router.push('/login');
    } else {
      const data = await res.json();
      showToast.error(data.error || 'Verification failed');
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Verify Email</h2>
      <p className="text-gray-400 text-center mb-4">We sent a 6-digit OTP to {email}</p>
      <form onSubmit={handleVerify} className="space-y-4">
        <Input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <Button type="submit" disabled={loading} className="w-full">{loading ? 'Verifying...' : 'Verify'}</Button>
      </form>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
