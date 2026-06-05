/**
 * Central env config.
 * Server-side vars: access via `env.*`
 * Public (client-safe) vars: access via `env.public.*`
 *
 * Usage:
 *   import { env } from "@/lib/env"
 *   env.razorpay.keyId        // server
 *   env.public.razorpayKeyId  // client
 */

// ── Helpers ────────────────────────────────────────────────────────────────

function optional(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

// ── Public (NEXT_PUBLIC_*) — safe to use client-side ───────────────────────

export const publicEnv = {
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
} as const;

// ── Server-only env ────────────────────────────────────────────────────────

export const env = {
  nodeEnv: optional("NODE_ENV", "development") as "development" | "production" | "test",

  // Database
  databaseUrl: optional("DATABASE_URL"),

  // NextAuth
  nextauth: {
    secret: optional("NEXTAUTH_SECRET"),
    url: optional("NEXTAUTH_URL", "http://localhost:3000"),
  },

  // Razorpay
  razorpay: {
    keyId: optional("RAZORPAY_KEY_ID"),
    keySecret: optional("RAZORPAY_KEY_SECRET"),
    enabled: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
  },

  // Cloudflare R2
  r2: {
    endpoint: optional("R2_ENDPOINT"),
    accessKeyId: optional("R2_ACCESS_KEY_ID"),
    secretAccessKey: optional("R2_SECRET_ACCESS_KEY"),
    bucketName: optional("R2_BUCKET_NAME", "elite-edge-fitness"),
    publicUrl: optional("R2_PUBLIC_URL"),
  },

  // Email (Brevo SMTP)
  email: {
    smtpHost: optional("SMTP_HOST", "smtp-relay.brevo.com"),
    smtpPort: parseInt(optional("SMTP_PORT", "587")),
    smtpUser: optional("SMTP_USER"),
    smtpPass: optional("SMTP_PASS"),
    from: optional("EMAIL_FROM", "Elite Edge Fitness <noreply@eliteedgefitness.in>"),
    to: optional("EMAIL_TO", "contact@eliteedgefitness.in"),
    enabled: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
  },

  // Public mirror (for server components that need public values)
  public: publicEnv,
} as const;
