'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '@/components/ui/Toast';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || '';

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('+880'); // default BD
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

    // Combine code + whatsapp to full phone number (optional, we use email as primary)
    const fullName = `${firstName} ${lastName}`.trim();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
        ref: referral || undefined,
        phone: `${code}${whatsapp}`, // store phone if needed
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
      <div className="modal" style={{ display: 'block', position: 'relative', background: 'transparent', boxShadow: 'none' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2>Create an Account</h2>
          <small>
            Already have an account?{' '}
            <a href="/login" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Sign In
            </a>
          </small>

          <form onSubmit={handleSubmit}>
            <label htmlFor="suEmail">Email *</label>
            <input
              id="suEmail"
              type="email"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="field-row" style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="suCode">Code *</label>
                <select
                  id="suCode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
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
              <div className="field" style={{ flex: 2 }}>
                <label htmlFor="suWhatsapp">WhatsApp Number *</label>
                <input
                  id="suWhatsapp"
                  type="text"
                  placeholder="Type your whatsapp number"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field-row" style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="suFirst">First Name *</label>
                <input
                  id="suFirst"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="suLast">Last Name *</label>
                <input
                  id="suLast"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <label htmlFor="suPass" style={{ marginTop: '6px' }}>Password *</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                id="suPass"
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

            <label htmlFor="suReferral" style={{ marginTop: '8px' }}>Referral code</label>
            <input
              id="suReferral"
              type="text"
              placeholder="Referral Code (optional)"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
            />

            <div className="terms" style={{ marginTop: '12px' }}>
              <input
                id="agreeTerms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="agreeTerms" style={{ fontSize: '13px', color: '#444', marginLeft: '6px' }}>
                By clicking Create account, I agree to the <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms (demo)'); }}>Terms of Use</a> and{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy (demo)'); }}>Privacy Policy</a>.
              </label>
            </div>

            <button className="submit-btn" type="submit" disabled={loading} style={{ marginTop: '12px', width: '100%' }}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          <div className="muted" style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            After successful signup you'll get a Student ID (keep it safe).
          </div>
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
          max-width: 540px;
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
        .field-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 500px) {
          .field-row {
            flex-direction: column;
          }
        }
      `}</style>
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
