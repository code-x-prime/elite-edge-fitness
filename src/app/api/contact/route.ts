import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, contactNotificationHtml } from "@/lib/email";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: { name, email, phone, message },
    });

    if (env.email.enabled) {
      try {
        await sendEmail({
          to: env.email.to,
          subject: `New Contact Query — ${name}`,
          html: contactNotificationHtml({ name, email, phone, message }),
        });
        await sendEmail({
          to: email,
          subject: "We received your message — Elite Edge Fitness",
          html: `<p>Hi ${name},</p><p>Thank you for reaching out! We'll get back to you within 24 hours.</p><p>— Team Elite Edge Fitness</p>`,
        });
      } catch (emailError) {
        console.error("Email send failed:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
