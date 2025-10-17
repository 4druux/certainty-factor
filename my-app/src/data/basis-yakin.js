export const JENIS_KB = [
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
    nama: "KB Suntik 3 Bulan",
    deskripsi:
      "Suntikan hormonal yang diberikan setiap tiga bulan sekali. Sangat praktis untuk yang tidak ingin repot.",
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

export const KRITERIA = [
  {
    id: "G01",
    pertanyaan: "Apakah usia Anda di bawah 20 tahun?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G02",
    pertanyaan: "Apakah Anda sudah memiliki anak?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G03",
    pertanyaan: "Apakah Anda belum memiliki anak?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G04",
    pertanyaan: "Apakah Anda sedang dalam masa menyusui?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G05",
    pertanyaan: "Apakah Anda memiliki tekanan darah tinggi?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G06",
    pertanyaan: "Apakah Anda memiliki riwayat migrain?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G07",
    pertanyaan:
      "Apakah Anda ingin menggunakan KB untuk jangka panjang (lebih dari 2 tahun)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G08",
    pertanyaan:
      "Apakah Anda ingin menggunakan KB untuk jangka pendek (kurang dari 2 tahun)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G09",
    pertanyaan: "Apakah Anda tidak ingin efek samping hormonal?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G10",
    pertanyaan: "Apakah Anda mengalami menstruasi yang tidak teratur?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G11",
    pertanyaan:
      "Apakah Anda takut dengan prosedur medis invasif (pemasangan alat)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G12",
    pertanyaan: "Apakah Anda sering lupa minum obat setiap hari?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G13",
    pertanyaan:
      "Apakah Anda memiliki alergi terhadap logam (khususnya tembaga)?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G14",
    pertanyaan: "Apakah Anda takut dengan jarum suntik?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G16",
    pertanyaan:
      "Apakah Anda ingin bisa hamil lagi dengan cepat setelah berhenti KB?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G18",
    pertanyaan:
      "Apakah Anda sering mengalami siklus haid yang sangat berat atau nyeri?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
  {
    id: "G20",
    pertanyaan: "Apakah Anda memprioritaskan efektivitas yang sangat tinggi?",
    tipe: "radio",
    pilihan: pilihanJawaban,
  },
];

export const ATURAN_CF = [
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
