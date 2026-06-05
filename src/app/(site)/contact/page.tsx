import ContactForm from "./ContactForm";
import { ContactCTA } from "@/components/ui/cta-contact";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

export const metadata = {
  title: "Contact — Elite Edge Fitness",
};

const info = [
  { Icon: IconMapPin, label: "Address", value: "Anand Garage, Ameya Bunglow, Plot no 20-C, 12th lane, Ganesh kripa soc, Kothrud, 411038" },
  { Icon: IconPhone, label: "Phone", value: "+91 9665962938", href: "tel:+919665962938" },
  { Icon: IconMail, label: "Email", value: "contact@eliteedgefitness.in", href: "mailto:contact@eliteedgefitness.in" },
  { Icon: IconClock, label: "Hours", value: "MON–SUN: 6:00 AM – 10:00 PM" },
];

const socials = [
  { label: "Instagram", Icon: IconBrandInstagram, href: "#" },
  { label: "YouTube", Icon: IconBrandYoutube, href: "#" },
  { label: "Facebook", Icon: IconBrandFacebook, href: "#" },
  { label: "WhatsApp", Icon: IconBrandWhatsapp, href: "https://wa.me/919665962938" },
];

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="py-20 bg-white border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#FF6B00]" />
            <span className="text-[#FF6B00] font-bold uppercase tracking-[0.3em] text-xs font-body">Get in Touch</span>
          </div>
          <h1 className="font-heading text-6xl md:text-8xl uppercase text-[#0A0A0A] leading-none">
            CONTACT
          </h1>
          <h1 className="font-heading text-6xl md:text-8xl uppercase text-[#FF6B00] leading-none">
            US
          </h1>
          <div className="h-1 w-16 bg-[#FF6B00] mt-4 mb-6" />
          <p className="text-[#444] max-w-xl font-body">
            Ready to transform? Have questions? Reach out and we&apos;ll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Split */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-heading text-3xl uppercase text-[#0A0A0A] mb-8">
                Send a <span className="text-[#FF6B00]">Message</span>
              </h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div>
              <h2 className="font-heading text-3xl uppercase text-[#0A0A0A] mb-8">
                Find <span className="text-[#FF6B00]">Us</span>
              </h2>

              <div className="space-y-4 mb-8">
                {info.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-5 border border-[#E8E8E8] hover:border-[#FF6B00] transition-colors">
                    <item.Icon size={20} className="text-[#FF6B00] flex-shrink-0 mt-0.5" stroke={1.5} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-1 font-body">{item.label}</p>
                      {"href" in item && item.href ? (
                        <a href={item.href} className="text-[#0A0A0A] font-semibold hover:text-[#FF6B00] transition-colors font-body text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#0A0A0A] font-semibold font-body text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map */}
              <div className="overflow-hidden border border-[#E8E8E8]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.392325898272!2d73.80061697519147!3d18.511164882580626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c78c00000001%3A0x5e2e479e2116eeee!2sANAND%20GARAGE!5e0!3m2!1sen!2sin!4v1780675593164!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anand Garage, Kothrud, Pune"
                />
              </div>

              {/* Socials */}
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-4 font-body">Follow Us</p>
                <div className="flex gap-3 flex-wrap">
                  {socials.map(({ label, Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 border border-[#E8E8E8] text-xs font-bold uppercase tracking-wide text-[#0A0A0A] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors font-body"
                    >
                      <Icon size={16} stroke={1.5} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactCTA />
        </div>
      </section>
    </div>
  );
}
