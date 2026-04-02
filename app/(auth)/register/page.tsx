'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, ref })
    });
    const data = await res.json();
    if (res.ok) {
      showToast.success('OTP sent to your email. Please verify.');
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } else {
      showToast.error(data.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      {ref && <p className="text-center text-green-400 text-sm mb-4">Referred by: {ref}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading} className="w-full">{loading ? 'Sending OTP...' : 'Register'}</Button>
      </form>
      <p className="text-center text-gray-400 mt-4">
        Already have an account? <Link href="/login" className="text-purple-400">Login</Link>
      </p>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
