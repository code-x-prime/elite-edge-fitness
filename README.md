# Elite Edge Fitness

Full-stack fitness website for Elite Edge Fitness by Coach Gineel N.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS (white/gold aggressive theme)
- Prisma ORM + PostgreSQL
- NextAuth.js (admin auth — credentials)
- Razorpay (India-first payments)
- Resend (transactional email)

## Quick Start

```bash
# 1. Copy and fill env
cp .env.example .env

# 2. Install (already done)
npm install

# 3. DB migration + seed
npx prisma migrate dev --name init
npx prisma db seed

# 4. Dev server
npm run dev
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, coach teaser, programs, services, testimonials, blog |
| `/about` | Coach Gineel N full profile |
| `/gallery` | Masonry grid, category filter, lightbox |
| `/plans` | Training plans + Razorpay checkout modal |
| `/payments` | Manual payment methods (GPay, UPI, PayPal, HSBC) |
| `/contact` | Contact form + address/hours |
| `/download?token=` | eBook secure download |
| `/admin` | Dashboard (protected) |
| `/admin/login` | Admin sign-in |

## Admin Credentials (after seed)

```
Email:    admin@eliteedgefitness.in
Password: admin123
```

## Payment Flow (Razorpay)

1. Plans page → select plan → checkout modal (name, email, phone)
2. `POST /api/payment/create-order` creates Razorpay order + pending DB order
3. Razorpay widget opens
4. On success → `POST /api/payment/verify` validates HMAC signature → marks paid
5. eBook orders: download token generated → email sent with link
6. Redirect to `/download?token=xxx`

## Design System

| Token | Value |
|-------|-------|
| Heading font | Bebas Neue (all-caps, aggressive) |
| Body font | Inter |
| Primary accent | Gold `#F5A623 → #FFD700` |
| Secondary | Orange `#FF6B00` |
| BG | White `#FFFFFF` / Light gray `#F7F7F7` |
| Text | Black `#0A0A0A` |
| Footer | Dark `#111111` |

## ENV Variables

See `.env.example`. Required for full functionality:

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — any random string (32+ chars)
- `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` — from Razorpay dashboard
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — same as KEY_ID (public)
- `RESEND_API_KEY` — for email confirmations
- `EMAIL_TO` — where contact form submissions go

## Deploy

```bash
npx prisma migrate deploy
npm run build
npm start
```
