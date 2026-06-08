"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX, IconUser } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/plans", label: "Plans" },
  { href: "/longevity", label: "Longevity" },
  { href: "/payments", label: "Payments" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then(r => r.json())
      .then(d => { if (d?.name) setUserName(d.name); })
      .catch(() => {});
  }, [pathname]);

  // Hero page = transparent navbar; other pages = always solid
  const isHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const solid = !isHero || scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          solid
            ? "bg-[#0A0A0A] shadow-lg h-20"
            : "bg-transparent h-[72px]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.png" alt="EliteEdge Logo" width={200} height={200} className="h-16 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link text-xs font-body font-bold uppercase tracking-widest transition-colors duration-200",
                    isActive
                      ? "text-[#FF6B00] active"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {/* User profile icon — shows initials if logged in */}
            <Link
              href="/profile"
              className={`hidden md:flex w-9 h-9 items-center justify-center transition-all duration-200 ${
                userName
                  ? "bg-[#FF6B00] text-white font-heading text-sm hover:bg-[#E55A00]"
                  : "border border-white/20 hover:border-[#FF6B00] hover:text-[#FF6B00] text-white/60"
              }`}
              aria-label="My Profile"
              title={userName ? `${userName} — Profile` : "My Profile"}
            >
              {userName ? userName.charAt(0).toUpperCase() : <IconUser size={18} stroke={1.5} />}
            </Link>
            <Link
              href="/plans"
              className="hidden md:inline-flex items-center bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-[#E55A00] transition-all duration-200"
            >
              Get Started
            </Link>
            <button
              className="md:hidden p-2 text-white hover:text-[#FF6B00] transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <IconMenu2 size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60]" aria-modal="true">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#0A0A0A] flex flex-col shadow-2xl border-l border-[#1F1F1F]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1F1F1F]">
              <span className="font-heading text-xl tracking-widest text-white uppercase">
                ELITE<span className="text-[#FF6B00]">EDGE</span>
              </span>
              <button onClick={() => setOpen(false)} className="text-white hover:text-[#FF6B00] transition-colors">
                <IconX size={22} />
              </button>
            </div>
            <nav className="flex flex-col flex-1 px-6 py-8 gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "py-3 border-b border-[#1F1F1F] text-sm font-bold uppercase tracking-widest transition-colors",
                      isActive ? "text-[#FF6B00]" : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/plans"
                className="mt-6 bg-[#FF6B00] text-white text-sm font-bold uppercase tracking-widest px-5 py-3 text-center hover:bg-[#E55A00] transition-all"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
