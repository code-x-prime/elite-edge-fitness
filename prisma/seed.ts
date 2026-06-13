import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  await prisma.planImage.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.order.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.product.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.adminUser.deleteMany();

  const plans = await Promise.all([
    prisma.plan.create({
      data: {
        name: "Group Training",
        type: "group",
        price: 3499,
        duration: "1 Month",
        features: [
          "Group sessions (up to 10 members)",
          "Structured workout plan",
          "Diet guidance",
          "Progress tracking",
          "WhatsApp support",
        ],
        isActive: true,
        popular: false,
      },
    }),
    prisma.plan.create({
      data: {
        name: "Personal Training",
        type: "personal",
        price: 5999,
        duration: "1 Month",
        features: [
          "1-on-1 personal training sessions",
          "Custom workout program",
          "Custom nutrition plan",
          "Daily check-ins",
          "Priority support",
          "Body composition analysis",
        ],
        isActive: true,
        popular: true,
      },
    }),
    prisma.plan.create({
      data: {
        name: "Online Training",
        type: "online",
        price: 2999,
        duration: "1 Month",
        features: [
          "Custom online workout plan",
          "Video demonstrations",
          "Weekly check-ins",
          "WhatsApp support",
          "Diet chart",
        ],
        isActive: true,
        popular: false,
      },
    }),
    prisma.plan.create({
      data: {
        name: "Elite Package",
        type: "elite",
        price: 19000,
        duration: "6 Months",
        features: [
          "Everything in Personal Training",
          "6-month transformation program",
          "Unlimited sessions",
          "Supplement guidance",
          "Competition prep (optional)",
          "Lifetime support post program",
          "Progress photo reviews",
        ],
        isActive: true,
        popular: false,
      },
    }),
  ]);

  console.log(`✅ Created ${plans.length} plans`);

  const product = await prisma.product.create({
    data: {
      name: "The Ultimate Fat Loss Guide",
      description:
        "A comprehensive science-backed guide to sustainable fat loss. Includes meal plans, workout routines, mindset strategies, and supplement recommendations from Ginieel - Founder (Elite Edge Fitness).",
      price: 499,
      pdfUrl: "/products/fat-loss-guide.pdf",
      isActive: true,
    },
  });

  console.log(`✅ Created product: ${product.name}`);

  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.create({
    data: {
      email: "admin@eliteedgefitness.in",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("✅ Admin user created");
  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
