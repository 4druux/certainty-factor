import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

globalThis.prisma = globalThis.prisma ?? prismaClientSingleton();

export const db = globalThis.prisma;
