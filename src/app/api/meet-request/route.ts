import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

function meetRequestHtml(data: {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; background: #f7f7f7; margin: 0; padding: 0; }
  .wrap { max-width: 600px; margin: 40px auto; background: #fff; border: 1px solid #e5e5e5; }
  .header { background: #0A0A0A; padding: 32px; text-align: center; }
  .header h1 { color: #F5A623; font-size: 26px; margin: 0; letter-spacing: 4px; text-transform: uppercase; }
  .header p { color: #aaa; font-size: 12px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 2px; }
  .badge { display: inline-block; background: linear-gradient(135deg, #F5A623, #FFD700); color: #0A0A0A; font-weight: bold; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px; margin-bottom: 24px; }
  .body { padding: 32px; }
  .row { margin-bottom: 18px; }
  .label { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
  .value { font-size: 15px; color: #0A0A0A; font-weight: 500; }
  .highlight { background: linear-gradient(135deg, #F5A623, #FFD700); padding: 20px 24px; text-align: center; margin: 24px 0; }
  .highlight .lbl { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #0A0A0A; margin: 0; }
  .highlight .val { font-size: 28px; font-weight: bold; color: #0A0A0A; margin: 4px 0 0; }
  .msg-box { background: #f7f7f7; border-left: 3px solid #F5A623; padding: 16px 20px; margin-top: 8px; }
  .footer { background: #0A0A0A; padding: 20px 32px; text-align: center; }
  .footer p { color: #555; font-size: 11px; margin: 0; }
  .meet-btn { display: inline-block; background: #1a73e8; color: #fff !important; padding: 12px 28px; text-decoration: none; font-weight: bold; font-size: 13px; letter-spacing: 1px; border-radius: 4px; margin-top: 20px; }
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>Elite Edge Fitness</h1>
    <p>Google Meet Request</p>
  </div>
  <div class="body">
    <div class="badge">📅 New Meeting Request</div>

    <div class="row">
      <div class="label">Client Name</div>
      <div class="value">${data.name}</div>
    </div>
    <div class="row">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${data.email}" style="color:#1a73e8;">${data.email}</a></div>
    </div>
    <div class="row">
      <div class="label">Phone</div>
      <div class="value">${data.phone || "—"}</div>
    </div>

    <div class="highlight">
      <p class="lbl">Requested Meeting Time</p>
      <p class="val">${data.preferredDate} &nbsp;|&nbsp; ${data.preferredTime}</p>
    </div>

    ${data.message ? `
    <div class="row">
      <div class="label">Message / Purpose</div>
      <div class="msg-box">${data.message.replace(/\n/g, "<br>")}</div>
    </div>` : ""}

    <p style="color:#444;font-size:14px;margin-top:24px;">
      Please create a Google Meet link and send it to the client at the requested time.
    </p>
    <a href="https://meet.google.com/new" class="meet-btn">🎥 Create Google Meet</a>

    <p style="color:#888;font-size:12px;margin-top:32px;">
      This request was submitted via the Elite Edge Fitness website.
    </p>
  </div>
  <div class="footer">
    <p>© 2026 Elite Edge Fitness · Kothrud, Pune 411038</p>
  </div>
</div>
</body>
</html>
  `.trim();
}

function meetConfirmationHtml(data: { name: string; preferredDate: string; preferredTime: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f7f7f7;padding:40px;">
<div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;padding:32px;">
  <div style="background:#0A0A0A;padding:24px;text-align:center;margin:-32px -32px 32px;">
    <h1 style="color:#F5A623;font-size:22px;margin:0;letter-spacing:3px;text-transform:uppercase;">Elite Edge Fitness</h1>
  </div>
  <p style="font-size:16px;color:#0A0A0A;">Hi <strong>${data.name}</strong>,</p>
  <p style="color:#444;font-size:14px;">We've received your Google Meet request! 🎉</p>
  <div style="background:linear-gradient(135deg,#F5A623,#FFD700);padding:20px 24px;text-align:center;margin:24px 0;">
    <p style="margin:0;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#0A0A0A;">Your Requested Time</p>
    <p style="margin:8px 0 0;font-size:24px;font-weight:bold;color:#0A0A0A;">${data.preferredDate} &nbsp;|&nbsp; ${data.preferredTime}</p>
  </div>
  <p style="color:#444;font-size:14px;">
    Ginieel will confirm the meeting and send you a Google Meet link at the scheduled time.
    If there's any change, we'll reach out on your email or phone.
  </p>
  <p style="color:#888;font-size:12px;margin-top:32px;">
    Questions? WhatsApp us at <strong>+91 9665962938</strong>
  </p>
  <div style="background:#0A0A0A;padding:16px;text-align:center;margin:32px -32px -32px;">
    <p style="color:#555;font-size:11px;margin:0;">© 2026 Elite Edge Fitness · Kothrud, Pune</p>
  </div>
</div>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, preferredDate, preferredTime, message } = await req.json();

    if (!name || !email || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send notification to Ginieel (owner)
    await sendEmail({
      to: "ginieelnvalkr@gmail.com",
      subject: `📅 New Meet Request — ${name} (${preferredDate} ${preferredTime})`,
      html: meetRequestHtml({ name, email, phone, preferredDate, preferredTime, message }),
    });

    // Send confirmation to the user
    await sendEmail({
      to: email,
      subject: "Your Google Meet Request Received — Elite Edge Fitness",
      html: meetConfirmationHtml({ name, preferredDate, preferredTime }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Meet request error:", err);
    return NextResponse.json({ error: "Failed to send meet request" }, { status: 500 });
  }
}
