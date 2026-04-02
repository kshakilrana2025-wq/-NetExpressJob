'use client';
import { ReactNode } from 'react';

export default function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 ${className}`}>{children}</div>;
}
