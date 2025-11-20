const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

// DATA JENIS KB
const JENIS_KB = [
  {
    id: "KB01", // P001
    nama: "Pil KB",
    deskripsi:
      "Mengandung hormon estrogen dan progestin, efektif untuk KB jangka pendek.",
  },
  {
    id: "KB02", // P002
    nama: "Suntik KB",
    deskripsi:
      "Mengandung hormon progestin, diberikan setiap 1-3 bulan, cocok untuk pengguna yang tidak ingin repot minum obat setiap hari.",
  },
  {
    id: "KB03", // P003
    nama: "Implan",
    deskripsi:
      "Batang kecil yang dipasang di bawah kulit lengan atas, efektif hingga 3 tahun dan memiliki tingkat keberhasilan tinggi.",
  },
  {
    id: "KB04", // P004
    nama: "IUD (Spiral)",
    deskripsi:
      "Alat kontrasepsi yang dipasang di dalam rahim, tersedia dalam bentuk hormonal dan non-hormonal.",
  },
  {
    id: "KB05", // P005
    nama: "Kondom",
    deskripsi:
      "Alat kontrasepsi mekanis yang digunakan saat berhubungan, tidak mengandung hormon dan mencegah infeksi menular seksual.",
  },
];

// PILIHAN JAWABAN
const pilihanJawaban = [
  "Sangat Yakin",
  "Yakin",
  "Cukup Yakin",
  "Kurang Yakin",
  "Tidak Tahu",
  "Tidak",
];

// DAFTAR GEJALA
const KRITERIA = [
  {
    id: "G01",
    pertanyaan: "Apakah usia Anda di bawah 20 tahun?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G02",
    pertanyaan: "Apakah usia Anda di atas 35 tahun?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G03",
    pertanyaan: "Apakah Anda sudah memiliki anak?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G04",
    pertanyaan: "Apakah Anda belum memiliki anak?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G05",
    pertanyaan: "Apakah Anda sedang menyusui?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G06",
    pertanyaan: "Apakah Anda memiliki tekanan darah tinggi?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G07",
    pertanyaan: "Apakah Anda memiliki riwayat migrain?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G08",
    pertanyaan: "Apakah Anda memiliki gangguan hati?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G09",
    pertanyaan: "Apakah Anda mengalami anemia?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G10",
    pertanyaan: "Apakah menstruasi Anda tidak teratur?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G11",
    pertanyaan: "Apakah Anda mengalami nyeri haid berat?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G12",
    pertanyaan: "Apakah Anda ingin KB jangka panjang?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G13",
    pertanyaan: "Apakah Anda ingin KB jangka pendek?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G14",
    pertanyaan: "Apakah Anda sering lupa minum obat?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G15",
    pertanyaan: "Apakah Anda takut jarum suntik?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G16",
    pertanyaan: "Apakah Anda takut prosedur invasif?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G17",
    pertanyaan: "Apakah Anda tidak ingin efek samping hormonal?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G18",
    pertanyaan: "Apakah Anda memiliki alergi terhadap logam?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G19",
    pertanyaan: "Apakah Anda memiliki berat badan berlebih (obesitas)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G20",
    pertanyaan: "Apakah aktivitas Anda padat atau sering bepergian?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
];

// ATURAN CF
const ATURAN_CF = [
  // P001: Pil KB
  { kriteriaId: "G01", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 0.6 },
  { kriteriaId: "G04", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 0.8 },
  { kriteriaId: "G13", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 1.0 },
  { kriteriaId: "G14", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 1.0 },

  // P002: Suntik KB
  { kriteriaId: "G05", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.6 },
  { kriteriaId: "G06", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.6 },
  { kriteriaId: "G11", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.4 },
  { kriteriaId: "G12", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.8 },

  // P003: Implan
  { kriteriaId: "G03", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.4 },
  { kriteriaId: "G12", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 1.0 },
  { kriteriaId: "G19", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.6 },
  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.4 },
  { kriteriaId: "G17", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.6 },

  // P004: IUD
  { kriteriaId: "G03", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.8 },
  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },
  { kriteriaId: "G07", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },
  { kriteriaId: "G08", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },
  { kriteriaId: "G17", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },

  // P005: Kondom
  { kriteriaId: "G16", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 1.0 },
  { kriteriaId: "G17", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.8 },
  { kriteriaId: "G15", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 1.0 },
  { kriteriaId: "G01", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.6 },
  { kriteriaId: "G20", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.8 },
];

async function main() {
  console.log("Start seeding ...");

  await db.aturanCf.deleteMany({});
  await db.kriteria.deleteMany({});
  await db.jenisKb.deleteMany({});
  console.log("Deleted old data.");

  await db.jenisKb.createMany({
    data: JENIS_KB,
  });
  console.log("Seeded JenisKb.");

  await db.kriteria.createMany({
    data: KRITERIA.map((k) => ({
      id: k.id,
      pertanyaan: k.pertanyaan,
      tipe: k.tipe,
      pilihan: k.pilihan,
    })),
  });
  console.log("Seeded Kriteria.");

  await db.aturanCf.createMany({
    data: ATURAN_CF,
  });
  console.log("Seeded AturanCf.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
