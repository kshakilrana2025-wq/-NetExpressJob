'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '@/components/ui/Toast';
import { WiWifi } from 'react-icons/wi';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || '';

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('+880');
  const [whatsapp, setWhatsapp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [referral, setReferral] = useState(refCode);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast.error('You must agree to the Terms and Privacy Policy');
      return;
    }
    setLoading(true);
    const fullName = `${firstName} ${lastName}`.trim();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
        ref: referral || undefined,
        phone: `${code}${whatsapp}`,
      })
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-center mb-4">
          <WiWifi className="text-4xl text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent ml-2">NetExpressJob</span>
        </div>
        <h2 className="text-2xl font-bold">Create an Account</h2>
        <p className="text-gray-500 text-sm mt-1">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 font-semibold">Sign In</a>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Code *</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              >
                <option value="">Select Code</option>
                <optgroup label="Asia">
                  <option value="+880">+880 (Bangladesh)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+92">+92 (Pakistan)</option>
                  <option value="+977">+977 (Nepal)</option>
                  <option value="+94">+94 (Sri Lanka)</option>
                  <option value="+86">+86 (China)</option>
                  <option value="+81">+81 (Japan)</option>
                  <option value="+82">+82 (South Korea)</option>
                  <option value="+966">+966 (Saudi Arabia)</option>
                  <option value="+971">+971 (UAE)</option>
                </optgroup>
                <optgroup label="Europe">
                  <option value="+44">+44 (UK)</option>
                  <option value="+33">+33 (France)</option>
                  <option value="+49">+49 (Germany)</option>
                  <option value="+39">+39 (Italy)</option>
                  <option value="+34">+34 (Spain)</option>
                  <option value="+7">+7 (Russia)</option>
                </optgroup>
                <optgroup label="North America">
                  <option value="+1">+1 (USA/Canada)</option>
                  <option value="+52">+52 (Mexico)</option>
                </optgroup>
                <optgroup label="South America">
                  <option value="+55">+55 (Brazil)</option>
                  <option value="+54">+54 (Argentina)</option>
                  <option value="+51">+51 (Peru)</option>
                </optgroup>
                <optgroup label="Africa">
                  <option value="+20">+20 (Egypt)</option>
                  <option value="+234">+234 (Nigeria)</option>
                  <option value="+27">+27 (South Africa)</option>
                </optgroup>
                <optgroup label="Oceania">
                  <option value="+61">+61 (Australia)</option>
                  <option value="+64">+64 (New Zealand)</option>
                </optgroup>
              </select>
            </div>
            <div className="flex-2">
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number *</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Type your whatsapp number"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password *</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Referral code</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Referral Code (optional)"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
              By clicking Create account, I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="text-purple-600">Terms of Use</a> and <a href="#" onClick={(e) => e.preventDefault()} className="text-purple-600">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">After successful signup you'll get a Student ID (keep it safe).</p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
