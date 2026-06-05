import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { downloadToken: params.token },
      include: { product: true },
    });

    if (!order || order.status !== "paid") {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 });
    }

    if (order.downloadedAt) {
      return NextResponse.json({ error: "Download link already used" }, { status: 410 });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { downloadedAt: new Date() },
    });

    if (!order.product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), "public", order.product.pdfUrl);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found on server" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${order.product.name.replace(/\s+/g, "_")}.pdf"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("download error:", err);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
