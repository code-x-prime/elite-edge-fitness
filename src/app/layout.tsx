import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Edge Fitness — Unlock Your Elite Potential",
  description:
    "Transform your body and mind with Elite Edge Fitness. Personal training, online coaching, and fitness programs by Gineel N — Kothrud, Pune.",
  keywords: ["fitness", "gym", "personal trainer", "Kothrud", "Pune", "Elite Edge Fitness", "Gineel N"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: "var(--font-dm-sans)", fontSize: "14px" },
          }}
        />
        {children}
      </body>
    </html>
  );
}
