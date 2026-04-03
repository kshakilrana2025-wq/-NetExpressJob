import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/Toast';
import { WiWifi } from 'react-icons/wi';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NetExpressJob - Earn with Referrals',
  description: 'Referral earning platform with tasks and withdrawals',
  icons: {
    icon: '/favicon.ico', // you'll need to add a custom favicon.ico or generate one
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
