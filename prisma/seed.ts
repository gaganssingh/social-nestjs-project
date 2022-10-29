import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
