'use client';
import Link from 'next/link';
import { FiWifi } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FiWifi className="text-3xl text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                NetExpressJob
              </span>
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
              <Link href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <FiWifi className="text-xl" />
            <span className="text-sm font-medium">Start Earning Today</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4">
            Earn Money with <span className="text-purple-600">Referrals & Tasks</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get 1 BDT per signup, 150 BDT after activation. Withdraw to bKash, Nagad, Rocket. Complete tasks for extra income.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 shadow-md transition">Create Free Account</Link>
            <Link href="/login" className="bg-white text-purple-600 border border-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition">Sign In</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-2xl">💰</span></div>
            <h3 className="text-xl font-bold text-gray-800">Referral Bonus</h3>
            <p className="text-gray-500 mt-2">1 BDT per signup + 150 BDT after activation</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-2xl">📱</span></div>
            <h3 className="text-xl font-bold text-gray-800">Easy Withdrawals</h3>
            <p className="text-gray-500 mt-2">bKash, Nagad, Rocket – min 10 BDT</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-2xl">📋</span></div>
            <h3 className="text-xl font-bold text-gray-800">Paid Tasks</h3>
            <p className="text-gray-500 mt-2">Complete tasks and earn extra income</p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div><h3 className="text-lg font-semibold">Sign Up</h3><p className="text-gray-500 text-sm">Create your free account using email</p></div>
            <div className="text-center"><div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div><h3 className="text-lg font-semibold">Activate Account</h3><p className="text-gray-500 text-sm">Pay 500 BDT activation fee via bKash/Nagad/Rocket</p></div>
            <div className="text-center"><div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div><h3 className="text-lg font-semibold">Start Earning</h3><p className="text-gray-500 text-sm">Refer friends, complete tasks, withdraw earnings</p></div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Earning?</h2>
          <p className="text-gray-600 mb-6">Join thousands of users already making money with NetExpressJob.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition">Get Started Now <FiWifi className="text-xl" /></Link>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <p>© 2025 NetExpressJob. All rights reserved.</p>
      </footer>
    </div>
  );
}
