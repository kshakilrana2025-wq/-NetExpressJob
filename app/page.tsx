'use client';
import Link from 'next/link';
import { WiWifi } from 'react-icons/wi'; // wifi icon from react-icons

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <WiWifi className="text-3xl text-purple-600" />
            <span className="text-xl font-bold text-gray-800">NetExpressJob</span>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="text-gray-600 hover:text-purple-600 px-3 py-2">Login</Link>
            <Link href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
          <WiWifi className="text-xl" />
          <span className="text-sm font-medium">Earn with referrals</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Earn Money <span className="text-purple-600">Effortlessly</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Get 1 BDT per referral signup and 150 BDT when they activate. Complete tasks and withdraw to bKash, Nagad, or Rocket.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/register" className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 shadow-md transition">
            Create Free Account
          </Link>
          <Link href="/login" className="bg-white text-purple-600 border border-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Referral Bonus</h3>
            <p className="text-gray-500 mt-2">1 BDT per signup + 150 BDT after activation</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Easy Withdrawals</h3>
            <p className="text-gray-500 mt-2">bKash, Nagad, Rocket – minimum 10 BDT</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Paid Tasks</h3>
            <p className="text-gray-500 mt-2">Complete tasks and earn extra income</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-purple-50 py-16 mt-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to start earning?</h2>
          <p className="text-gray-600 mb-6">Join thousands of users already making money with NetExpressJob.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
            Get Started Now <WiWifi className="text-xl" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <p>© 2025 NetExpressJob. All rights reserved.</p>
      </footer>
    </div>
  );
}
