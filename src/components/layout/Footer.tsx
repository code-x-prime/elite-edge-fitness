import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
} from "@tabler/icons-react";
import Image from "next/image";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/plans", label: "Plans" },
  { href: "/contact", label: "Contact" },
  { href: "/payments", label: "Payments" },
  { href: "/parq", label: "PAR-Q Form" },
  { href: "/terms", label: "Terms & Conditions" },
];

const services = [
  "Diet Designing",
  "Body Transformation",
  "Weight Loss",
  "Online Training",
  "Six Pack Plans",
  "Body Building",
];

const socials = [
  { Icon: IconBrandFacebook, href: "https://www.facebook.com/gineelnfitness?mibextid=LQQJ4d", label: "Facebook" },
  { Icon: IconBrandInstagram, href: "https://www.instagram.com/eliteedgefitness09?igsh=MW91c2lqbmp1amI2aQ==", label: "Instagram" },
  { Icon: IconBrandYoutube, href: "https://youtube.com/@ginieel?si=e4KhSkIY5cFIUK2j", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 flex-shrink-0">
              <Image src="/logo.png" alt="EliteEdge Logo" className="h-12 w-auto"
                width={100} height={100} />
            </Link>
            <p className="text-sm text-[#666] mb-6 font-body leading-relaxed">
              You are more than what you think.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center text-[#666] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg tracking-widest text-[#FF6B00] mb-5 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#999] hover:text-white hover:pl-1 transition-all duration-200 font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg tracking-widest text-[#FF6B00] mb-5 uppercase">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-sm text-[#999] hover:text-white transition-colors duration-200 font-body cursor-default">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg tracking-widest text-[#FF6B00] mb-5 uppercase">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <IconMapPin size={16} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#999] font-body leading-relaxed">
                  Anand Garage, Ameya Bunglow, Plot no 20-C, 12th lane, Ganesh kripa soc, Kothrud, 411038
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IconPhone size={16} className="text-[#FF6B00] flex-shrink-0" />
                <a href="tel:+919665962938" className="text-sm text-[#999] hover:text-white transition-colors font-body">
                  9665962938
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconMail size={16} className="text-[#FF6B00] flex-shrink-0" />
                <a href="mailto:eliteedgefitness09@gmail.com" className="text-sm text-[#999] hover:text-white transition-colors font-body">
                  eliteedgefitness09@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconClock size={16} className="text-[#FF6B00] flex-shrink-0" />
                <span className="text-sm text-[#999] font-body">MON–SAT: 6:00 AM – 10:00 PM (SUN OFF)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#555] font-body">© 2026 Elite Edge Fitness. All rights reserved.</p>
          <p className="text-xs text-[#555] font-body">
            Designed &amp; Developed by{" "}
            <a
              href="https://groxmedia.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B00] hover:text-white transition-colors font-bold"
            >
              Grox Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

