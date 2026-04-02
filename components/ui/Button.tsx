'use client';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({ children, onClick, variant = 'primary', disabled, type = 'button', className = '' }: ButtonProps) {
  const base = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50';
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg',
    secondary: 'bg-gray-700 text-gray-200 hover:bg-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
