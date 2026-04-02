/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs', 'nodemailer']
  },
  images: {
    domains: ['via.placeholder.com', 'supabase.co']
  }
};

module.exports = nextConfig;
