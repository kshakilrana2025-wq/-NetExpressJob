# NetExpressJob - Complete Referral & Earning Platform

## Features
- Email verification (OTP) – login blocked until verified
- Multi-method payment: bKash, Nagad, Rocket with dynamic numbers & step-by-step UI
- Admin payment control panel: change numbers, API keys, enable/disable, live/sandbox mode
- Payment verification: API (auto) or manual (admin approve)
- Account activation requires payment (500 BDT)
- Referral system: 1 BDT on registration, 150 BDT on activation (only after activation)
- Wallet: available, pending, total earned, transaction history
- Withdrawal: user request, admin approve/reject (reject returns funds)
- Task system: admin creates tasks, users submit work, admin approves → wallet credited
- Full admin panel: users, payments, withdrawals, tasks, settings
- Premium dark theme UI with gradients, animations, responsive design

## Tech Stack
- Next.js 14 App Router
- MongoDB (main DB)
- PostgreSQL (Neon) for logs via Prisma
- JWT authentication (httpOnly cookies)
- Tailwind CSS + Framer Motion
- Nodemailer (SMTP for OTP)

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill all values
4. Set up MongoDB Atlas (connection string already provided)
5. Set up Neon PostgreSQL and run:
   - `npx prisma generate`
   - `npx prisma db push`
6. Run development server: `npm run dev`

## Deployment to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add all environment variables from `.env` to Vercel dashboard
4. Deploy

## First Admin User

On first run, the system will automatically create an admin if none exists using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from env.

## Notes
- Payment API verification is mock. Replace `lib/payment/verifier.ts` with real bKash/Nagad/Rocket API calls.
- Email SMTP must be configured for OTP to work.

## License
MIT
