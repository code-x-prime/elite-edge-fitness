﻿import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  IconBarbell,
  IconShoppingCart,
  IconCurrencyRupee,
  IconPhoto,
  IconMessage,
  IconUsers,
} from "@tabler/icons-react";

async function getStats() {
  try {
    const [orders, plans, contacts, users, gallery] = await Promise.all([
      prisma.order.count(),
      prisma.plan.count(),
      prisma.contactSubmission.count(),
      prisma.user.count(),
      prisma.galleryImage.count(),
    ]);
    const revenue = await prisma.order.aggregate({
      _sum: { amount: true },
      where: { status: "paid" },
    });
    return { orders, plans, contacts, users, gallery, revenue: revenue._sum.amount || 0 };
  } catch {
    return { orders: 0, plans: 0, contacts: 0, users: 0, gallery: 0, revenue: 0 };
  }
}

export default async function AdminDashboard() {
  await requireAdmin();
  const stats = await getStats();

  const cards = [
    { label: "Training Plans", value: stats.plans, Icon: IconBarbell, color: "bg-amber-50 text-amber-600", href: "/admin/plans" },
    { label: "Total Orders", value: stats.orders, Icon: IconShoppingCart, color: "bg-green-50 text-green-600", href: "/admin/orders" },
    { label: "Revenue (Paid)", value: `₹${stats.revenue.toLocaleString("en-IN")}`, Icon: IconCurrencyRupee, color: "bg-amber-50 text-amber-600", href: "/admin/orders" },
    { label: "Gallery Images", value: stats.gallery, Icon: IconPhoto, color: "bg-blue-50 text-blue-600", href: "/admin/gallery" },
    { label: "Contact Queries", value: stats.contacts, Icon: IconMessage, color: "bg-purple-50 text-purple-600", href: "/admin/contacts" },
    { label: "Registered Users", value: stats.users, Icon: IconUsers, color: "bg-rose-50 text-rose-600", href: "/admin/users" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl uppercase text-[#0A0A0A]">Dashboard</h1>
        <p className="text-sm text-[#666] font-body mt-1">Elite Edge Fitness Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {cards.map(({ label, value, Icon, color, href }) => (
          <Link key={label} href={href} className="block group">
            <div className="bg-white border border-[#E8E8E8] p-6 hover:border-[#FF6B00] hover:shadow-md transition-all duration-200 group-hover:translate-y-[-1px]">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
                  <Icon size={20} stroke={1.5} />
                </div>
              </div>
              <p className="font-heading text-3xl text-[#0A0A0A] leading-none">{value}</p>
              <p className="text-xs font-body font-bold uppercase tracking-widest text-[#666] mt-2">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-[#E8E8E8] p-6">
        <h2 className="font-heading text-2xl uppercase text-[#0A0A0A] mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "View Plans", href: "/admin/plans" },
            { label: "View Orders", href: "/admin/orders" },
            { label: "View Contacts", href: "/admin/contacts" },
            { label: "View Users", href: "/admin/users" },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F8F8F8] border border-[#E8E8E8] text-xs font-body font-bold uppercase tracking-widest text-[#0A0A0A] hover:border-[#FF6B00] hover:bg-white transition-all"
            >
              {a.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

