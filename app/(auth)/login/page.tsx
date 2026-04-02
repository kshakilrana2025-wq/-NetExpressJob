'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      showToast.success('Logged in successfully');
      router.push('/dashboard');
    } else {
      showToast.error(data.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login to NetExpressJob</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading} className="w-full">{loading ? 'Logging in...' : 'Login'}</Button>
      </form>
      <p className="text-center text-gray-400 mt-4">
        Don't have an account? <Link href="/register" className="text-purple-400">Sign up</Link>
      </p>
    </Card>
  );
}
