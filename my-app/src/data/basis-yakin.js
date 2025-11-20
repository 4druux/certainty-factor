export const JENIS_KB = [
  {
    id: "KB01", // P001
    nama: "Pil KB",
    deskripsi:
      "Mengandung hormon estrogen dan progestin, efektif untuk KB jangka pendek.",
  },
  {
    id: "KB02", // P002
    nama: "Suntik KB",
    deskripsi: "Mengandung hormon progestin, diberikan setiap 1-3 bulan.",
  },
  {
    id: "KB03", // P003
    nama: "Implan",
    deskripsi:
      "Batang kecil yang dipasang di bawah kulit lengan atas, efektif hingga 3 tahun.",
  },
  {
    id: "KB04", // P004
    nama: "IUD (Intrauterine Device)",
    deskripsi: "Alat kontrasepsi yang dipasang di dalam rahim.",
  },
  {
    id: "KB05", // P005
    nama: "Kondom",
    deskripsi: "Alat kontrasepsi mekanis yang digunakan saat berhubungan.",
  },
];

const pilihanJawaban = [
  "Sangat Yakin", // Nilai 1.0
  "Yakin", // Nilai 0.8
  "Cukup Yakin", // Nilai 0.6
  "Kurang Yakin", // Nilai 0.4
  "Tidak Tahu", // Nilai 0.2
  "Tidak", // Nilai 0.0
];

export const KRITERIA = [
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
export const ATURAN_CF = [
  // P001: Pil KB (KB01)
  { kriteriaId: "G01", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 0.6 },
  { kriteriaId: "G04", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 0.8 },
  { kriteriaId: "G13", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 1.0 },
  { kriteriaId: "G14", jawaban: "Sangat Yakin", kbId: "KB01", cfPakar: 1.0 },

  // P002: Suntik KB (KB02)
  { kriteriaId: "G05", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.6 },
  { kriteriaId: "G06", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.6 },
  { kriteriaId: "G11", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.4 },
  { kriteriaId: "G12", jawaban: "Sangat Yakin", kbId: "KB02", cfPakar: 0.8 },

  // P003: Implan (KB03)
  { kriteriaId: "G03", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.4 },
  { kriteriaId: "G12", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 1.0 },
  { kriteriaId: "G19", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.6 },
  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.4 },
  { kriteriaId: "G17", jawaban: "Sangat Yakin", kbId: "KB03", cfPakar: 0.6 },

  // P004: IUD (KB04)
  { kriteriaId: "G03", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.8 },
  { kriteriaId: "G09", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },
  { kriteriaId: "G07", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },
  { kriteriaId: "G08", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },
  { kriteriaId: "G17", jawaban: "Sangat Yakin", kbId: "KB04", cfPakar: 0.6 },

  // P005: Kondom (KB05)
  { kriteriaId: "G16", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 1.0 },
  { kriteriaId: "G17", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.8 },
  { kriteriaId: "G15", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 1.0 },
  { kriteriaId: "G01", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.6 },
  { kriteriaId: "G20", jawaban: "Sangat Yakin", kbId: "KB05", cfPakar: 0.8 },
];
