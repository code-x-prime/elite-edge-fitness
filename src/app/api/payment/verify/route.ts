import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, orderConfirmationHtml } from "@/lib/email";
import { env } from "@/lib/env";
import { getRazorpayConfig } from "@/lib/razorpay";
import crypto from "crypto";

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = await req.json();

    // Use DB keys first, fallback to env
    const rzpConfig = await getRazorpayConfig();
    const secretToUse = rzpConfig.keySecret || env.razorpay.keySecret;

    if (secretToUse && razorpay_order_id && razorpay_payment_id) {
      const expected = crypto
        .createHmac("sha256", secretToUse)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (expected !== razorpay_signature) {
        return NextResponse.json({ success: false, error: "Signature mismatch" }, { status: 400 });
      }
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, plan: true, address: true },
    });
    if (!order) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });

    const downloadToken = order.productId ? generateToken() : null;

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "paid", razorpayPayId: razorpay_payment_id || null, downloadToken },
    });

    const downloadLink = downloadToken
      ? `${env.nextauth.url}/download?token=${downloadToken}`
      : null;

    if (env.email.enabled) {
      try {
        await sendEmail({
          to: order.buyerEmail,
          subject: `Order Confirmed — ${order.plan?.name || order.product?.name || "Elite Edge Fitness"}`,
          html: orderConfirmationHtml({
            buyerName: order.buyerName,
            planName: order.plan?.name,
            productName: order.product?.name,
            amount: order.amount,
            address: order.address,
            downloadLink,
          }),
        });

        await sendEmail({
          to: env.email.to,
          subject: `New Order: ${order.plan?.name || order.product?.name} — ₹${order.amount}`,
          html: orderConfirmationHtml({
            buyerName: order.buyerName,
            planName: order.plan?.name,
            productName: order.product?.name,
            amount: order.amount,
            address: order.address,
            downloadLink,
          }),
        });
      } catch (emailErr) {
        console.error("Email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, downloadToken });
  } catch (err) {
    console.error("verify error:", err);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
