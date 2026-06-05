import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRazorpayConfig } from "@/lib/razorpay";
import { signUserToken, USER_COOKIE_OPTIONS, COOKIE_NAME, getUserFromCookie } from "@/lib/userAuth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { planId, productId, name, email, phone, addressId, password } = await req.json();
    if (!phone) return NextResponse.json({ error: "phone required" }, { status: 400 });

    // Auto-register or update user with password
    let userId: string | null = null;
    let userToken: string | null = null;

    const session = await getUserFromCookie();
    if (session) {
      userId = session.id;
    } else if (email && name) {
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        const hashed = password ? await bcrypt.hash(password, 12) : null;
        user = await prisma.user.create({ data: { name, email, phone, password: hashed } });
      } else if (password && !user.password) {
        const hashed = await bcrypt.hash(password, 12);
        user = await prisma.user.update({ where: { email }, data: { password: hashed, name, phone } });
      }
      userId = user.id;
      userToken = signUserToken({ id: user.id, email: user.email, name: user.name });
    }

    let amount = 0;
    if (planId) {
      const plan = await prisma.plan.findUnique({ where: { id: planId } });
      if (!plan) return NextResponse.json({ error: "Plan not found" }, { status: 404 });
      amount = plan.price;
    } else if (productId) {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
      amount = product.price;
    } else {
      return NextResponse.json({ error: "planId or productId required" }, { status: 400 });
    }

    const amountPaise = Math.round(amount * 100);
    const rzpConfig = await getRazorpayConfig();

    const makeRes = (body: Record<string, unknown>) => {
      const r = NextResponse.json(body);
      if (userToken) r.cookies.set(COOKIE_NAME, userToken, USER_COOKIE_OPTIONS);
      return r;
    };

    if (!rzpConfig.enabled) {
      const order = await prisma.order.create({
        data: {
          buyerName: name, buyerEmail: email, buyerPhone: phone, amount,
          planId: planId || null, productId: productId || null,
          addressId: addressId || null,
          userId: userId || null,
          status: "demo",
          razorpayOrderId: `demo_${Date.now()}`,
        },
      });
      return makeRes({ orderId: order.id, amount: amountPaise, razorpayOrderId: order.razorpayOrderId, demo: true });
    }

    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: rzpConfig.keyId, key_secret: rzpConfig.keySecret });

    const rzpOrder = await razorpay.orders.create({
      amount: amountPaise, currency: "INR", receipt: `order_${Date.now()}`,
    });

    const order = await prisma.order.create({
      data: {
        buyerName: name, buyerEmail: email, buyerPhone: phone, amount,
        planId: planId || null, productId: productId || null,
        addressId: addressId || null,
        userId: userId || null,
        razorpayOrderId: rzpOrder.id,
      },
    });

    return makeRes({
      orderId: order.id,
      amount: amountPaise,
      razorpayOrderId: rzpOrder.id,
      keyId: rzpConfig.keyId,
    });
  } catch (err) {
    console.error("create-order error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
