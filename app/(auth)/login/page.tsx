'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // The HTML uses "Student ID or Phone" – we'll treat as email or phone.
    // Your backend expects email. We'll assume the user enters email.
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginId, password })
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="modal" style={{ display: 'block', position: 'relative', background: 'transparent', boxShadow: 'none' }}>
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 id="loginTitle">Sign In</h2>
          <small>
            New User?{' '}
            <a href="/register" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Create an Account
            </a>
          </small>

          <form onSubmit={handleSubmit}>
            <label htmlFor="loginId">Student ID or Phone</label>
            <input
              id="loginId"
              type="text"
              placeholder="Type your student id or phone"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />

            <label htmlFor="loginPass" style={{ marginTop: '8px' }}>Password</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                id="loginPass"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                style={{ flex: 1 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="eye" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                {showPassword ? 'hide' : 'show'}
              </div>
            </div>

            <a
              className="forgot"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Please contact support to reset password (demo).');
              }}
              style={{ fontWeight: 'bold', textDecoration: 'underline', display: 'inline-block', marginTop: '8px' }}
            >
              Forgot Password?
            </a>

            <button className="submit-btn" type="submit" disabled={loading} style={{ marginTop: '12px', width: '100%' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          width: 90%;
          max-width: 420px;
          box-shadow: 0 20px 35px -8px rgba(0,0,0,0.2);
        }
        .card h2 {
          margin: 0 0 8px 0;
          font-size: 28px;
        }
        .card label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #333;
        }
        .card input, .card select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
        }
        .eye {
          background: #f0f0f0;
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        .submit-btn {
          background: #7c3aed;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 40px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }
        .submit-btn:hover {
          background: #6d28d9;
        }
        .forgot {
          font-size: 13px;
          margin-top: 8px;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
