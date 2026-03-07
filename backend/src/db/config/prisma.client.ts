import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({
  connectionString,
});

const singletonPrismaClient = () => {
  return new PrismaClient({
    adapter,
  });
};

type prismaSingletonType = ReturnType<typeof singletonPrismaClient>;
const globalForPrisma = globalThis as unknown as {
  prisma: prismaSingletonType | undefined;
};

const prisma = globalForPrisma.prisma ?? singletonPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
