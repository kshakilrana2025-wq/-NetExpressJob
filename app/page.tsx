'use client';
import Link from 'next/link';
import { FiTrendingUp, FiDollarSign, FiUsers, FiBriefcase } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Earn Money with Referrals & Tasks
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join NetExpressJob – Get 1 BDT per referral, 150 BDT on activation, and earn from tasks.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="bg-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">Get Started</Link>
            <Link href="/login" className="bg-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">Login</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <FiTrendingUp className="text-4xl text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Referral Earnings</h3>
          <p className="text-gray-400">1 BDT per signup + 150 BDT after activation</p>
        </div>
        <div className="text-center">
          <FiDollarSign className="text-4xl text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Instant Wallet</h3>
          <p className="text-gray-400">Withdraw anytime to your mobile wallet</p>
        </div>
        <div className="text-center">
          <FiBriefcase className="text-4xl text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Paid Tasks</h3>
          <p className="text-gray-400">Complete tasks & get rewarded</p>
        </div>
        <div className="text-center">
          <FiUsers className="text-4xl text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Grow Your Network</h3>
          <p className="text-gray-400">Unlimited referrals, unlimited earnings</p>
        </div>
      </div>
    </div>
  );
}
