import nodemailer from "nodemailer";
import { env } from "@/lib/env";

const transporter = nodemailer.createTransport({
  host: env.email.smtpHost,
  port: env.email.smtpPort,
  secure: false,
  auth: {
    user: env.email.smtpUser,
    pass: env.email.smtpPass,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  return transporter.sendMail({
    from: env.email.from,
    to,
    subject,
    html,
    text,
  });
}

export function orderConfirmationHtml(data: {
  buyerName: string;
  planName?: string;
  productName?: string;
  amount: number;
  address?: {
    fullName: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    pincode: string;
  } | null;
  downloadLink?: string | null;
}) {
  const item = data.planName || data.productName || "Order";
  const addr = data.address;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; background: #f7f7f7; margin: 0; padding: 0; }
  .wrap { max-width: 600px; margin: 40px auto; background: #fff; border: 1px solid #e5e5e5; }
  .header { background: #0A0A0A; padding: 32px; text-align: center; }
  .header h1 { color: #F5A623; font-size: 28px; margin: 0; letter-spacing: 4px; text-transform: uppercase; }
  .header p { color: #aaa; font-size: 12px; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 2px; }
  .body { padding: 32px; }
  .amount { background: linear-gradient(135deg, #F5A623, #FFD700); padding: 20px 24px; text-align: center; margin: 24px 0; }
  .amount p { margin: 0; font-size: 13px; color: #0A0A0A; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
  .amount h2 { margin: 4px 0 0; font-size: 36px; color: #0A0A0A; }
  .label { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
  .value { font-size: 14px; color: #0A0A0A; margin-bottom: 16px; }
  .addr-box { background: #f7f7f7; border-left: 3px solid #F5A623; padding: 16px 20px; margin: 24px 0; }
  .download-btn { display: block; text-align: center; background: linear-gradient(135deg, #F5A623, #FFD700); color: #0A0A0A; padding: 16px 32px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; margin: 24px 0; font-size: 13px; }
  .footer { background: #0A0A0A; padding: 20px 32px; text-align: center; }
  .footer p { color: #555; font-size: 11px; margin: 0; }
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>Elite Edge</h1>
    <p>Fitness</p>
  </div>
  <div class="body">
    <p style="font-size:15px;color:#0A0A0A;">Hi <strong>${data.buyerName}</strong>,</p>
    <p style="color:#444;font-size:14px;">Your order has been confirmed. Here are the details:</p>

    <div class="amount">
      <p>${item}</p>
      <h2>₹${data.amount.toLocaleString("en-IN")}</h2>
    </div>

    ${
      addr
        ? `<div class="addr-box">
        <div class="label">Delivery / Billing Address</div>
        <div class="value" style="margin:0">
          ${addr.fullName}<br>
          ${addr.line1}${addr.line2 ? ", " + addr.line2 : ""}<br>
          ${addr.city}, ${addr.state} – ${addr.pincode}<br>
          India
        </div>
      </div>`
        : ""
    }

    ${
      data.downloadLink
        ? `<a href="${data.downloadLink}" class="download-btn">⬇ Download Your eBook</a>
        <p style="font-size:12px;color:#888;text-align:center;">Link valid for one download. Keep this email safe.</p>`
        : `<p style="color:#444;font-size:14px;">We will contact you within 24 hours to schedule your training and get you started.</p>`
    }

    <p style="color:#888;font-size:12px;margin-top:32px;">Questions? Reply to this email or WhatsApp us at +91 9665962938</p>
  </div>
  <div class="footer">
    <p>© 2026 Elite Edge Fitness · Kothrud, Pune 411038</p>
  </div>
</div>
</body>
</html>
  `.trim();
}

export function contactNotificationHtml(data: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f7f7f7;padding:40px;">
<div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;padding:32px;">
  <h2 style="color:#0A0A0A;text-transform:uppercase;letter-spacing:3px;border-bottom:3px solid #F5A623;padding-bottom:12px;">New Contact Query</h2>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
  <p><strong>Phone:</strong> ${data.phone || "—"}</p>
  <div style="background:#f7f7f7;border-left:3px solid #F5A623;padding:16px;margin-top:16px;">
    <p style="margin:0;color:#444;">${data.message.replace(/\n/g, "<br>")}</p>
  </div>
</div>
</body>
</html>
  `.trim();
}
