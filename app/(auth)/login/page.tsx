'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ui/Toast';
import { WiWifi } from 'react-icons/wi';

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState<'email' | 'otp' | 'reset'>('email');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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

  const handleSendOtp = async () => {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forgotEmail })
    });
    if (res.ok) {
      setOtpSent(true);
      setResetStep('otp');
      showToast.success('OTP sent to your email');
    } else {
      const data = await res.json();
      showToast.error(data.error || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    const res = await fetch('/api/auth/verify-reset-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forgotEmail, otp })
    });
    if (res.ok) {
      setResetStep('reset');
      showToast.success('OTP verified. Set new password.');
    } else {
      showToast.error('Invalid OTP');
    }
  };

  const handleResetPassword = async () => {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forgotEmail, otp, newPassword })
    });
    if (res.ok) {
      showToast.success('Password reset successfully. Please login.');
      setShowForgotModal(false);
      setResetStep('email');
      setForgotEmail('');
      setOtp('');
      setNewPassword('');
    } else {
      showToast.error('Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="flex justify-center mb-6">
          <WiWifi className="text-5xl text-purple-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent ml-2">NetExpressJob</span>
        </div>
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          New user?{' '}
          <a href="/register" className="text-purple-600 font-semibold">Create an Account</a>
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID or Phone</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Type your student id or phone"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 pr-20"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-purple-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-purple-600 hover:underline"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>
            {resetStep === 'email' && (
              <>
                <p className="text-gray-600 text-sm mb-4">Enter your email to receive an OTP.</p>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                  placeholder="Your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-purple-600 text-white py-2 rounded-full"
                >
                  Send OTP
                </button>
              </>
            )}
            {resetStep === 'otp' && (
              <>
                <p className="text-gray-600 text-sm mb-4">Enter the OTP sent to {forgotEmail}</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-purple-600 text-white py-2 rounded-full"
                >
                  Verify OTP
                </button>
              </>
            )}
            {resetStep === 'reset' && (
              <>
                <p className="text-gray-600 text-sm mb-4">Enter your new password</p>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-purple-600 text-white py-2 rounded-full"
                >
                  Reset Password
                </button>
              </>
            )}
            <button
              className="mt-4 text-sm text-gray-500 w-full text-center"
              onClick={() => {
                setShowForgotModal(false);
                setResetStep('email');
                setForgotEmail('');
                setOtp('');
                setNewPassword('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
