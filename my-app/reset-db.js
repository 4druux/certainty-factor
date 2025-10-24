const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses reset database...");
  console.log("Menghapus semua data (Konsultasi & Admin) dalam transaksi...");

  const [deletedKonsultasi, deletedAdmin] = await prisma.$transaction([
    prisma.konsultasi.deleteMany({}),
    prisma.admin.deleteMany({}),
  ]);

  console.log(`Berhasil menghapus ${deletedKonsultasi.count} data konsultasi.`);
  console.log(`Berhasil menghapus ${deletedAdmin.count} data admin.`);
  console.log("Database berhasil di-reset.");
}

main()
  .catch((e) => {
    console.error("Terjadi error saat mereset database:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
