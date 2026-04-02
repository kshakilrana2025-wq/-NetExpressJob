import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(to: string, otp: string) {
  await transporter.sendMail({
    from: `"NetExpressJob" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Email Verification OTP',
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #4f46e5;">NetExpressJob</h2>
      <p>Your OTP for email verification is:</p>
      <h1 style="font-size: 32px; letter-spacing: 4px; background: #f3f4f6; display: inline-block; padding: 10px 20px; border-radius: 8px;">${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    </div>`,
  });
}
