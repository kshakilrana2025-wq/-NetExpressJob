'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ui/Toast';

export default function HomePage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Modal states
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [suEmail, setSuEmail] = useState('');
  const [suCode, setSuCode] = useState('+880');
  const [suWhatsapp, setSuWhatsapp] = useState('');
  const [suFirst, setSuFirst] = useState('');
  const [suLast, setSuLast] = useState('');
  const [suPass, setSuPass] = useState('');
  const [suReferral, setSuReferral] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const [subadminId, setSubadminId] = useState('');
  const [subadminPass, setSubadminPass] = useState('');
  const [subadminLoading, setSubadminLoading] = useState(false);

  // For course modal
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({ title: '', desc: '' });

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById('menu');
      const btn = document.getElementById('menuBtn');
      if (menuOpen && menu && !menu.contains(e.target as Node) && btn && !btn.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const openModal = (id: string) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginId, password: loginPass })
    });
    const data = await res.json();
    if (res.ok) {
      showToast.success('Logged in successfully');
      router.push('/dashboard');
    } else {
      showToast.error(data.error || 'Login failed');
    }
    setLoginLoading(false);
  };

  // Signup handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast.error('You must agree to the Terms and Privacy Policy');
      return;
    }
    setSignupLoading(true);
    const fullName = `${suFirst} ${suLast}`.trim();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        email: suEmail,
        password: suPass,
        ref: suReferral || undefined,
        phone: `${suCode}${suWhatsapp}`,
      })
    });
    const data = await res.json();
    if (res.ok) {
      showToast.success('OTP sent to your email. Please verify.');
      router.push(`/verify-email?email=${encodeURIComponent(suEmail)}`);
    } else {
      showToast.error(data.error || 'Registration failed');
    }
    setSignupLoading(false);
  };

  // Subadmin login (demo - replace with your logic)
  const handleSubadminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubadminLoading(true);
    // Simulate API call – replace with real admin endpoint
    if (subadminId === 'subadmin1' && subadminPass === 'sub@1234') {
      showToast.success('Subadmin login successful (demo)');
      // router.push('/admin'); // uncomment when you have admin route
    } else {
      showToast.error('Invalid credentials');
    }
    setSubadminLoading(false);
  };

  const courses = [
    { title: 'Quran education', img: 'https://i.postimg.cc/3J2vsXnD/course1.jpg', desc: 'Quran education is the guiding light for a Muslim’s life, offering spiritual growth and moral direction. Its core aim is proper recitation with Tajweed, understanding the meaning, and living by its teachings. It leads people to the right path and brings peace to the heart.' },
    { title: 'Cyber Security', img: 'https://i.postimg.cc/6p0G39sW/course2.jpg', desc: 'Cybersecurity is the practice of protecting computers, networks, servers, and data from unauthorized access, attacks, or damage. It involves tools and techniques like firewalls, encryption, strong passwords, and regular software updates. Good cybersecurity keeps personal information safe, prevents hacking, and ensures the smooth functioning of digital systems.' },
    { title: 'Digital Marketing', img: 'https://i.postimg.cc/gcChtSqW/course3.jpg', desc: 'Digital marketing is the promotion of products or services using online platforms like social media, search engines, email, and websites. It focuses on reaching the right audience through methods such as SEO, content marketing, paid ads, and analytics. Effective digital marketing helps businesses build brand awareness, increase sales, and engage customers worldwide.' },
    { title: 'Graphic Design', img: 'https://i.postimg.cc/FHmLNYBC/course4.jpg', desc: 'Graphic design is the art and practice of creating visual content to communicate ideas. It combines elements like typography, color, images, and layout to deliver a clear message. Graphic design is used in branding, advertising, websites, packaging, and many other creative fields.' },
    { title: 'Video Editing Capcut', img: 'https://i.postimg.cc/Pq5vvBhm/course5.jpg', desc: 'CapCut is a free, user-friendly video editing app for mobile and desktop that lets you create professional-looking videos. It offers features like trimming, transitions, filters, text, music, and advanced effects such as keyframes and motion tracking. CapCut is popular for making social-media content, vlogs, and short creative projects quickly and easily.' },
    { title: 'Photo Editing Canva', img: 'https://i.postimg.cc/nLSj40cN/course6.jpg', desc: 'Canva is an easy-to-use design platform that also offers powerful photo editing tools. You can crop, resize, adjust brightness or contrast, apply filters, and add text or graphics right in your browser or app. It’s ideal for creating social media posts, marketing materials, or quick photo touch-ups without advanced software.' },
    { title: 'Data Entry', img: 'https://i.postimg.cc/50HHnLXy/course7.jpg', desc: 'Data entry is the process of accurately inputting information into digital systems such as spreadsheets, databases, or specialized software. It requires attention to detail, typing speed, and basic computer skills to ensure data is correct and well-organized. This work is essential for businesses to maintain records, track inventory, process transactions, and analyze information efficiently.' },
    { title: 'Lead Generation', img: 'https://i.postimg.cc/HxfrKnM2/course8.jpg', desc: 'Lead generation in social marketing involves retargeting, lead form optimization, analytics & tracking, CRM integration, and lead nurturing. Following these practices helps businesses collect high-quality leads and increase sales opportunities through social media marketing.' }
  ];

  return (
    <>
      <style jsx global>{`
        /* Custom styles to match original HTML */
        body {
          margin: 0;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          background: #f9fafb;
        }
        .menu-btn-custom {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
        }
        .menu {
          position: fixed;
          top: 0;
          right: -280px;
          width: 280px;
          height: 100%;
          background: white;
          box-shadow: -2px 0 8px rgba(0,0,0,0.1);
          transition: right 0.3s ease;
          z-index: 1000;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .menu.open {
          right: 0;
        }
        .close {
          font-size: 32px;
          cursor: pointer;
          text-align: right;
        }
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
          z-index: 1100;
          visibility: hidden;
          opacity: 0;
          transition: 0.2s;
        }
        .modal.open {
          visibility: visible;
          opacity: 1;
        }
        .modal .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          width: 90%;
          max-width: 420px;
          max-height: 90vh;
          overflow-y: auto;
        }
        .eye {
          background: #f0f0f0;
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
        }
        .submit-btn {
          background: #7c3aed;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 40px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        }
        .submit-btn:hover { background: #6d28d9; }
        .service-card, .course-item, .ibox {
          transition: transform 0.2s;
        }
        .service-card:hover, .course-item:hover, .ibox:hover {
          transform: translateY(-4px);
        }
        .whatsapp-float {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
        }
        .whatsapp-float img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        @media (max-width: 640px) {
          .field-row {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Header */}
      <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://i.postimg.cc/FsCZKg0C/logo.png" alt="logo" className="w-12 h-12 object-contain" />
          <div>
            <div className="font-bold">BD LEARNING AND EARNING IT PLATFORM</div>
            <div className="text-sm opacity-75">bdlearningandearningitplatform</div>
          </div>
        </div>
        <button id="menuBtn" className="menu-btn-custom text-3xl" onClick={() => setMenuOpen(true)}>☰</button>
      </header>

      {/* Side Menu */}
      <div id="menu" className={`menu ${menuOpen ? 'open' : ''}`}>
        <div className="close text-right text-3xl cursor-pointer" onClick={() => setMenuOpen(false)}>&times;</div>
        <nav className="flex flex-col gap-4 mt-8">
          <a href="#" className="text-gray-800 hover:text-purple-700">Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>About / Courses</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <button className="bg-purple-600 text-white py-2 rounded-full" onClick={() => { setMenuOpen(false); openModal('loginModal'); }}>LOGIN</button>
          <button className="bg-purple-600 text-white py-2 rounded-full" onClick={() => { setMenuOpen(false); openModal('signupModal'); }}>SIGN UP</button>
          <button className="bg-gray-700 text-white py-2 rounded-full" onClick={() => { setMenuOpen(false); openModal('subadminModal'); }}>SUB ADMIN LOGIN</button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">WELCOME TO BD LEARNING AND EARNING IT PLATFORM</h1>
          <div className="relative pb-[56.25%] h-0 mb-6">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/tt2mvij4uak?autoplay=1&mute=1&loop=1&playlist=tt2mvij4uak"
              title="YouTube Short Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="text-gray-700 mb-6">It is a Bangladeshi trusted online platform. It is a learning and earning process by using your valuable free time at home through your smart phone only. Learn in your mother tongue and earn from community courses & services.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => openModal('loginModal')} className="bg-purple-600 text-white px-6 py-2 rounded-full">Login</button>
            <button onClick={() => openModal('signupModal')} className="bg-purple-600 text-white px-6 py-2 rounded-full">Sign Up</button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full">Apps Download</button>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">OUR SERVICES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="service-card bg-white p-6 rounded-xl shadow text-center"><b>10+</b> Courses</div>
            <div className="service-card bg-white p-6 rounded-xl shadow text-center">Expert Trainer</div>
            <div className="service-card bg-white p-6 rounded-xl shadow text-center">Lifetime Access</div>
          </div>
        </section>

        {/* Popular Courses */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Popular Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, idx) => (
              <div key={idx} className="course-item bg-white rounded-xl shadow overflow-hidden cursor-pointer" onClick={() => { setSelectedCourse({ title: course.title, desc: course.desc }); setCourseModalOpen(true); }}>
                <img src={course.img} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <button className="text-purple-600 text-sm mt-2">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="ibox bg-purple-100 p-6 rounded-xl text-center font-bold text-purple-800">Total Withdrawals: (3,184,681.256)$</div>
          <div className="ibox bg-purple-100 p-6 rounded-xl text-center font-bold text-purple-800">Active Students: (7,886)$</div>
          <div className="ibox bg-purple-100 p-6 rounded-xl text-center font-bold text-purple-800">Monthly Withdrawals: (6,370.23)$</div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-white p-4 rounded-xl"><summary className="font-semibold cursor-pointer">What is BD LEARNING AND EARNING IT PLATFORM?</summary><p className="mt-2 text-gray-600">BD LEARNING AND EARNING IT PLATFORM is a comprehensive online platform offering diverse educational resources and courses for learners of all ages and interests.</p></details>
            <details className="bg-white p-4 rounded-xl"><summary className="font-semibold cursor-pointer">Do we need to pay any admission fee?</summary><p className="mt-2 text-gray-600">After your ID activation we may require small service charges for certain services. This is not an admission fee in most cases/please check the exact course terms.</p></details>
            <details className="bg-white p-4 rounded-xl"><summary className="font-semibold cursor-pointer">Can we do this from the comfort of home?</summary><p className="mt-2 text-gray-600"><b>Yes</b>, all facilities are provided to learn from home via mobile or computer.</p></details>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-12 bg-gray-800 text-white rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div><h3 className="font-bold mb-2">BD LEARNING AND EARNING IT PLATFORM</h3><p className="opacity-80">A comprehensive online platform offering resources and courses.</p></div>
            <div><h3 className="font-bold mb-2">Legal Info</h3><p><a href="#" className="hover:underline">Privacy & Policy</a></p><p><a href="#" className="hover:underline">Cookie Policy</a></p><p><a href="#" className="hover:underline">FAQs</a></p></div>
            <div><h3 className="font-bold mb-2">Contact Info</h3><p>Address: Dhaka, Bangladesh</p><p>Phone: +8801707349407</p><p>Email: bdlearningearningitplatform@gmail.com</p></div>
          </div>
          <div className="text-center mt-8 pt-4 border-t border-gray-700 text-sm">Copyright &copy; 2025 <a href="#" className="hover:underline">BD LEARNING AND EARNING IT PLATFORM</a></div>
        </footer>
      </main>

      {/* WhatsApp Float */}
      <a href="https://wa.me/8801890193958" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <img src="https://i.postimg.cc/C1j0H25x/Chat-GPT-Image-Sep-20-2025-07-06-41-PM.png" alt="WhatsApp Chat" />
      </a>

      {/* Google Translate */}
      <div id="google_translate_element" className="fixed bottom-4 left-4 z-50"></div>
      <script dangerouslySetInnerHTML={{
        __html: `
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
          }
        `
      }} />
      <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />

      {/* Modals */}
      {/* Login Modal */}
      <div className={`modal ${activeModal === 'loginModal' ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="card">
          <div className="close-x text-right text-2xl cursor-pointer" onClick={closeModal}>&times;</div>
          <h2 className="text-2xl font-bold">Sign In</h2>
          <small>New User? <a href="#" onClick={(e) => { e.preventDefault(); closeModal(); openModal('signupModal'); }} className="underline font-bold">Create an Account</a></small>
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <div><label className="block font-semibold">Student ID or Phone</label><input type="text" className="w-full border rounded-lg p-2" value={loginId} onChange={(e) => setLoginId(e.target.value)} required /></div>
            <div><label className="block font-semibold">Password</label><div className="flex gap-2"><input type="password" className="flex-1 border rounded-lg p-2" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} required /><div className="eye" onClick={() => { const inp = document.getElementById('loginPass') as HTMLInputElement; if (inp) inp.type = inp.type === 'password' ? 'text' : 'password'; }}>show</div></div></div>
            <a href="#" className="text-sm underline" onClick={(e) => { e.preventDefault(); alert('Please contact support to reset password.'); }}>Forgot Password?</a>
            <button type="submit" disabled={loginLoading} className="submit-btn">{loginLoading ? 'Signing in...' : 'Sign In'}</button>
          </form>
        </div>
      </div>

      {/* Signup Modal */}
      <div className={`modal ${activeModal === 'signupModal' ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="card max-w-lg">
          <div className="close-x text-right text-2xl cursor-pointer" onClick={closeModal}>&times;</div>
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <small>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); closeModal(); openModal('loginModal'); }} className="underline font-bold">Sign In</a></small>
          <form onSubmit={handleSignup} className="mt-4 space-y-3">
            <div><label>Email *</label><input type="email" className="w-full border rounded-lg p-2" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} required /></div>
            <div className="flex gap-2 flex-wrap"><select className="border rounded-lg p-2 flex-1" value={suCode} onChange={(e) => setSuCode(e.target.value)}><option value="+880">+880 (Bangladesh)</option><option value="+91">+91 (India)</option><option value="+1">+1 (USA)</option><option value="+44">+44 (UK)</option></select><input type="text" placeholder="WhatsApp Number" className="border rounded-lg p-2 flex-2" value={suWhatsapp} onChange={(e) => setSuWhatsapp(e.target.value)} required /></div>
            <div className="flex gap-2"><input type="text" placeholder="First Name" className="border rounded-lg p-2 flex-1" value={suFirst} onChange={(e) => setSuFirst(e.target.value)} required /><input type="text" placeholder="Last Name" className="border rounded-lg p-2 flex-1" value={suLast} onChange={(e) => setSuLast(e.target.value)} required /></div>
            <div><label>Password *</label><div className="flex gap-2"><input type="password" className="flex-1 border rounded-lg p-2" value={suPass} onChange={(e) => setSuPass(e.target.value)} required /><div className="eye" onClick={() => { const inp = document.getElementById('suPass') as HTMLInputElement; if (inp) inp.type = inp.type === 'password' ? 'text' : 'password'; }}>show</div></div></div>
            <div><label>Referral code</label><input type="text" placeholder="Referral Code (optional)" className="w-full border rounded-lg p-2" value={suReferral} onChange={(e) => setSuReferral(e.target.value)} /></div>
            <div className="flex items-start gap-2"><input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required /><label className="text-sm">By clicking Create account, I agree to the <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.</label></div>
            <button type="submit" disabled={signupLoading} className="submit-btn">{signupLoading ? 'Creating account...' : 'Sign Up'}</button>
          </form>
          <div className="text-xs text-gray-500 mt-2">After successful signup you'll get a Student ID (keep it safe).</div>
        </div>
      </div>

      {/* Subadmin Modal */}
      <div className={`modal ${activeModal === 'subadminModal' ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="card">
          <div className="close-x text-right text-2xl cursor-pointer" onClick={closeModal}>&times;</div>
          <h2 className="text-2xl font-bold">Sub Admin Login</h2>
          <form onSubmit={handleSubadminLogin} className="mt-4 space-y-4">
            <div><label>Sub Admin ID</label><input type="text" className="w-full border rounded-lg p-2" value={subadminId} onChange={(e) => setSubadminId(e.target.value)} required /></div>
            <div><label>Password</label><input type="password" className="w-full border rounded-lg p-2" value={subadminPass} onChange={(e) => setSubadminPass(e.target.value)} required /></div>
            <button type="submit" disabled={subadminLoading} className="submit-btn">{subadminLoading ? 'Logging in...' : 'Login'}</button>
          </form>
          <div className="text-xs text-gray-500 mt-2">Demo: subadmin1 / sub@1234</div>
        </div>
      </div>

      {/* Course Detail Modal */}
      <div className={`modal ${courseModalOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setCourseModalOpen(false); }}>
        <div className="card max-w-md">
          <div className="close-x text-right text-2xl cursor-pointer" onClick={() => setCourseModalOpen(false)}>&times;</div>
          <h3 className="text-xl font-bold">{selectedCourse.title}</h3>
          <p className="mt-2 text-gray-700">{selectedCourse.desc}</p>
        </div>
      </div>
    </>
  );
}
