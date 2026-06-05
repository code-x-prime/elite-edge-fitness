"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  IconLayoutDashboard,
  IconBarbell,
  IconPhoto,
  IconUsers,
  IconBook,
  IconShoppingCart,
  IconMessage,
  IconSettings,
  IconLogout,
  IconExternalLink,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", Icon: IconLayoutDashboard },
  { href: "/admin/plans", label: "Plans", Icon: IconBarbell },
  { href: "/admin/products", label: "Products", Icon: IconBook },
  { href: "/admin/gallery", label: "Gallery", Icon: IconPhoto },
  { href: "/admin/orders", label: "Orders", Icon: IconShoppingCart },
  { href: "/admin/contacts", label: "Contacts", Icon: IconMessage },
  { href: "/admin/users", label: "Users", Icon: IconUsers },
  { href: "/admin/settings", label: "Settings", Icon: IconSettings },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="w-60 bg-[#0A0A0A] text-white flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 pt-6 pb-5 border-b border-[#1F1F1F] flex items-center justify-between">
        <div>
          <p className="font-heading text-xl text-[#FF6B00] tracking-widest">EEF ADMIN</p>
          <p className="text-xs text-[#555] font-body mt-0.5">Elite Edge Fitness</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-[#555] hover:text-white transition-colors lg:hidden">
            <IconX size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-body font-semibold transition-all duration-150 ${
                isActive
                  ? "text-white bg-[#1A1A1A] border-l-2 border-[#FF6B00]"
                  : "text-[#999] hover:text-white hover:bg-[#1A1A1A] border-l-2 border-transparent"
              }`}
            >
              <Icon size={18} stroke={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-[#1F1F1F] space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-2 py-2.5 text-xs text-[#666] hover:text-[#999] transition-colors font-body"
        >
          <IconExternalLink size={16} stroke={1.5} />
          View Site
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/admin-login" })}
          className="w-full flex items-center gap-3 px-2 py-2.5 text-xs text-[#666] hover:text-red-400 transition-colors font-body"
        >
          <IconLogout size={16} stroke={1.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-60 z-40">
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0A0A0A] border-b border-[#1F1F1F] flex items-center justify-between px-4 z-40">
        <p className="font-heading text-lg text-[#FF6B00] tracking-widest">EEF ADMIN</p>
        <button onClick={() => setOpen(true)} className="text-white p-2 hover:text-[#FF6B00] transition-colors">
          <IconMenu2 size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-10 flex flex-col h-full">
            <SidebarContent onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
