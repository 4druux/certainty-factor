const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Menghapus semua data konsultasi...');
  const { count } = await prisma.konsultasi.deleteMany({});
  console.log(`Berhasil menghapus ${count} data.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });