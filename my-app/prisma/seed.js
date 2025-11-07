const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const JENIS_KB = [
  {
    id: "KB01",
    nama: "Pil KB",
    deskripsi:
      "Diminum setiap hari, mengandung hormon untuk mencegah ovulasi. Efektifitas tinggi jika digunakan secara teratur.",
  },
  {
    id: "KB02",
    nama: "KB Suntik 1 Bulan",
    deskripsi:
      "Suntikan hormonal yang diberikan setiap satu bulan sekali. Praktis dan efektif untuk kontrasepsi jangka menengah.",
  },
  {
    id: "KB03",
    nama: "Kondom",
    deskripsi:
      "Alat kontrasepsi penghalang yang mencegah sperma bertemu sel telur. Efektif jika digunakan dengan benar setiap kali berhubungan.",
  },
  {
    id: "KB04",
    nama: "IUD (Spiral)",
    deskripsi:
      "Alat kecil yang dipasang di dalam rahim, efektif untuk jangka panjang (5-10 tahun). Sangat efektif dan ekonomis.",
  },
  {
    id: "KB05",
    nama: "Implan (Susuk KB)",
    deskripsi:
      "Batang kecil fleksibel yang dimasukkan di bawah kulit lengan, efektif hingga 3 tahun. Praktis dan reversibel.",
  },
];

const pilihanJawaban = [
  "Sangat Yakin",
  "Yakin",
  "Cukup Yakin",
  "Kurang Yakin",
  "Tidak Tahu",
  "Tidak",
];

const KRITERIA = [
  {
    id: "G01",
    pertanyaan: "Apakah usia Anda di bawah 20 tahun?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G02",
    pertanyaan: "Apakah usia anda diatas 35 tahun?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G03",
    pertanyaan: "Apakah Anda sudah memiliki anak??",
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
    pertanyaan: "Apakah Anda sedang dalam masa menyusui?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G06",
    pertanyaan: "Apakah Anda memiliki tekanan darah tinggi (hipertensi)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G07",
    pertanyaan:
      "Apakah Anda memiliki riwayat migrain atau sering mengalami sakit kepala berat?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G08",
    pertanyaan:
      "Apakah Anda memiliki gangguan pada organ hati (misalnya hepatitis atau penyakit hati lainnya)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G09",
    pertanyaan: "Apakah Anda mengalami anemia atau kekurangan darah?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G10",
    pertanyaan: "Apakah menstruasi Anda tidak teratur setiap bulannya?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G11",
    pertanyaan:
      "Apakah Anda sering mengalami nyeri haid yang berat (dismenore)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G12",
    pertanyaan:
      "Apakah Anda menginginkan metode KB jangka panjang (misalnya lebih dari 1 tahun)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G13",
    pertanyaan:
      "Apakah Anda menginginkan metode KB jangka pendek (yang bisa dihentikan kapan saja)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G14",
    pertanyaan:
      "Apakah Anda menginginkan metode KB jangka pendek (yang bisa dihentikan kapan saja)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G15",
    pertanyaan: "Apakah Anda takut terhadap jarum suntik?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G16",
    pertanyaan:
      "Apakah Anda takut terhadap prosedur invasif, seperti pemasangan alat di dalam tubuh (contohnya spiral/IUD atau implan)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G17",
    pertanyaan:
      "Apakah Anda tidak ingin menggunakan KB yang mengandung hormon karena khawatir efek sampingnya",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G18",
    pertanyaan:
      "Apakah Anda memiliki alergi terhadap logam, seperti bahan yang terdapat pada spiral (IUD tembaga)?",
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
    pertanyaan:
      "Apakah Anda memiliki aktivitas yang padat atau sering bepergian, sehingga membutuhkan metode KB yang praktis?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
];

const ATURAN_CF = [
  { kriteriaId: "G01", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 0.8 },
  { kriteriaId: "G01", jawaban: "Yakin", kbId: "KB01", cfPakar: 0.6 },
  { kriteriaId: "G01", jawaban: "Cukup Yakin", kbId: "KB01", cfPakar: 0.4 },

  { kriteriaId: "G02", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.7 },
  { kriteriaId: "G02", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.7 },

  { kriteriaId: "G04", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: -0.8 },
  { kriteriaId: "G04", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: -0.8 },
  { kriteriaId: "G04", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.7 },
  { kriteriaId: "G04", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.7 },
  { kriteriaId: "G04", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },

  { kriteriaId: "G05", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: -0.9 },
  { kriteriaId: "G05", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: -0.9 },

  { kriteriaId: "G06", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: -0.7 },
  { kriteriaId: "G06", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: -0.6 },

  { kriteriaId: "G07", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.9 },
  { kriteriaId: "G07", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.9 },
  { kriteriaId: "G07", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: -0.5 },

  { kriteriaId: "G08", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 0.8 },
  { kriteriaId: "G08", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.7 },
  { kriteriaId: "G08", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.7 },
  { kriteriaId: "G08", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: -0.8 },
  { kriteriaId: "G08", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: -0.8 },

  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: -0.9 },
  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: -0.9 },
  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: -0.9 },
  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: -0.9 },
  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.8 },

  { kriteriaId: "G10", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 0.7 },
  { kriteriaId: "G10", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.6 },

  { kriteriaId: "G11", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: -0.9 },
  { kriteriaId: "G11", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: -0.9 },

  { kriteriaId: "G12", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: -0.9 },
  { kriteriaId: "G12", jawaban: "Tidak", kbId: "KB01", cfPakar: 0.4 },

  { kriteriaId: "G13", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: -0.9 },

  { kriteriaId: "G14", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: -0.9 },
  { kriteriaId: "G14", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: -0.9 },

  { kriteriaId: "G16", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 0.8 },
  { kriteriaId: "G16", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.7 },
  { kriteriaId: "G16", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: -0.6 },

  { kriteriaId: "G18", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.7 },
  { kriteriaId: "G18", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.6 },

  { kriteriaId: "G20", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.9 },
  { kriteriaId: "G20", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.9 },
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