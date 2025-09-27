// data/basis-pengetahuan.js

// 1. Daftar Jenis KB yang akan direkomendasikan
export const JENIS_KB = [
  { 
    id: 'KB01', 
    nama: 'Pil KB', 
    deskripsi: 'Diminum setiap hari, mengandung hormon untuk mencegah ovulasi. Efektifitas tinggi jika digunakan secara teratur.' 
  },
  { 
    id: 'KB02', 
    nama: 'KB Suntik 1 Bulan', 
    deskripsi: 'Suntikan hormonal yang diberikan setiap satu bulan sekali. Praktis dan efektif untuk kontrasepsi jangka menengah.' 
  },
  { 
    id: 'KB03', 
    nama: 'KB Suntik 3 Bulan', 
    deskripsi: 'Suntikan hormonal yang diberikan setiap tiga bulan sekali. Sangat praktis untuk yang tidak ingin repot.' 
  },
  { 
    id: 'KB04', 
    nama: 'IUD (Spiral)', 
    deskripsi: 'Alat kecil yang dipasang di dalam rahim, efektif untuk jangka panjang (5-10 tahun). Sangat efektif dan ekonomis.' 
  },
  { 
    id: 'KB05', 
    nama: 'Implan (Susuk KB)', 
    deskripsi: 'Batang kecil fleksibel yang dimasukkan di bawah kulit lengan, efektif hingga 3 tahun. Praktis dan reversibel.' 
  },
];

// 2. Daftar Kriteria atau Pertanyaan untuk Pengguna
export const KRITERIA = [
  { 
    id: 'K01', 
    pertanyaan: 'Berapa usia Anda?', 
    tipe: 'select', 
    pilihan: ['< 20 Tahun', '20-35 Tahun', '> 35 Tahun'] 
  },
  { 
    id: 'K02', 
    pertanyaan: 'Apakah Anda sedang menyusui secara eksklusif (bayi < 6 bulan)?', 
    tipe: 'radio', 
    pilihan: ['Ya', 'Tidak'] 
  },
  { 
    id: 'K03', 
    pertanyaan: 'Apakah Anda memiliki riwayat tekanan darah tinggi (hipertensi)?', 
    tipe: 'radio', 
    pilihan: ['Ya', 'Tidak'] 
  },
  { 
    id: 'K04', 
    pertanyaan: 'Apakah Anda ingin menggunakan metode KB untuk jangka panjang (lebih dari 2 tahun)?', 
    tipe: 'radio', 
    pilihan: ['Ya', 'Tidak'] 
  },
  { 
    id: 'K05', 
    pertanyaan: 'Apakah Anda nyaman dengan metode yang memerlukan tindakan medis kecil (pemasangan)?', 
    tipe: 'radio', 
    pilihan: ['Ya', 'Tidak'] 
  },
  { 
    id: 'K06', 
    pertanyaan: 'Apakah Anda seorang perokok aktif?', 
    tipe: 'radio', 
    pilihan: ['Ya', 'Tidak'] 
  },
  { 
    id: 'K07', 
    pertanyaan: 'Apakah Anda memiliki riwayat migrain atau sakit kepala berat?', 
    tipe: 'radio', 
    pilihan: ['Ya', 'Tidak'] 
  },
  { 
    id: 'K08', 
    pertanyaan: 'Seberapa sering Anda bisa mengingat untuk minum obat setiap hari?', 
    tipe: 'select', 
    pilihan: ['Selalu ingat', 'Kadang-kadang lupa', 'Sering lupa'] 
  },
  { 
    id: 'K09', 
    pertanyaan: 'Apakah Anda memiliki riwayat pembekuan darah (trombosis)?', 
    tipe: 'radio', 
    pilihan: ['Ya', 'Tidak'] 
  },
  { 
    id: 'K10', 
    pertanyaan: 'Berapa jumlah anak yang Anda miliki saat ini?', 
    tipe: 'select', 
    pilihan: ['0 (belum memiliki anak)', '1-2 anak', '> 2 anak'] 
  },
];

// 3. Basis Aturan (Rules) Certainty Factor
export const ATURAN_CF = [
  // Aturan untuk Pil KB (KB01)
  { kriteriaId: 'K01', jawaban: '20-35 Tahun', kbId: 'KB01', cfPakar: 0.8 },
  { kriteriaId: 'K01', jawaban: '< 20 Tahun', kbId: 'KB01', cfPakar: 0.6 },
  { kriteriaId: 'K01', jawaban: '> 35 Tahun', kbId: 'KB01', cfPakar: 0.3 },
  { kriteriaId: 'K02', jawaban: 'Ya', kbId: 'KB01', cfPakar: -0.8 },
  { kriteriaId: 'K03', jawaban: 'Ya', kbId: 'KB01', cfPakar: -0.7 },
  { kriteriaId: 'K06', jawaban: 'Ya', kbId: 'KB01', cfPakar: -0.6 },
  { kriteriaId: 'K07', jawaban: 'Ya', kbId: 'KB01', cfPakar: -0.5 },
  { kriteriaId: 'K08', jawaban: 'Selalu ingat', kbId: 'KB01', cfPakar: 0.9 },
  { kriteriaId: 'K08', jawaban: 'Kadang-kadang lupa', kbId: 'KB01', cfPakar: 0.4 },
  { kriteriaId: 'K08', jawaban: 'Sering lupa', kbId: 'KB01', cfPakar: -0.7 },
  { kriteriaId: 'K09', jawaban: 'Ya', kbId: 'KB01', cfPakar: -0.9 },

  // Aturan untuk KB Suntik 1 Bulan (KB02)
  { kriteriaId: 'K01', jawaban: '20-35 Tahun', kbId: 'KB02', cfPakar: 0.7 },
  { kriteriaId: 'K01', jawaban: '< 20 Tahun', kbId: 'KB02', cfPakar: 0.5 },
  { kriteriaId: 'K01', jawaban: '> 35 Tahun', kbId: 'KB02', cfPakar: 0.4 },
  { kriteriaId: 'K02', jawaban: 'Ya', kbId: 'KB02', cfPakar: -0.6 },
  { kriteriaId: 'K03', jawaban: 'Ya', kbId: 'KB02', cfPakar: -0.5 },
  { kriteriaId: 'K04', jawaban: 'Tidak', kbId: 'KB02', cfPakar: 0.6 },
  { kriteriaId: 'K06', jawaban: 'Ya', kbId: 'KB02', cfPakar: -0.4 },
  { kriteriaId: 'K08', jawaban: 'Sering lupa', kbId: 'KB02', cfPakar: 0.8 },
  { kriteriaId: 'K09', jawaban: 'Ya', kbId: 'KB02', cfPakar: -0.7 },

  // Aturan untuk KB Suntik 3 Bulan (KB03)
  { kriteriaId: 'K01', jawaban: '20-35 Tahun', kbId: 'KB03', cfPakar: 0.8 },
  { kriteriaId: 'K01', jawaban: '< 20 Tahun', kbId: 'KB03', cfPakar: 0.6 },
  { kriteriaId: 'K01', jawaban: '> 35 Tahun', kbId: 'KB03', cfPakar: 0.5 },
  { kriteriaId: 'K02', jawaban: 'Tidak', kbId: 'KB03', cfPakar: 0.7 },
  { kriteriaId: 'K04', jawaban: 'Ya', kbId: 'KB03', cfPakar: 0.6 },
  { kriteriaId: 'K08', jawaban: 'Sering lupa', kbId: 'KB03', cfPakar: 0.9 },
  { kriteriaId: 'K09', jawaban: 'Ya', kbId: 'KB03', cfPakar: -0.6 },
  { kriteriaId: 'K10', jawaban: '> 2 anak', kbId: 'KB03', cfPakar: 0.7 },

  // Aturan untuk IUD (KB04)
  { kriteriaId: 'K01', jawaban: '20-35 Tahun', kbId: 'KB04', cfPakar: 0.9 },
  { kriteriaId: 'K01', jawaban: '> 35 Tahun', kbId: 'KB04', cfPakar: 0.8 },
  { kriteriaId: 'K01', jawaban: '< 20 Tahun', kbId: 'KB04', cfPakar: 0.3 },
  { kriteriaId: 'K02', jawaban: 'Tidak', kbId: 'KB04', cfPakar: 0.8 },
  { kriteriaId: 'K04', jawaban: 'Ya', kbId: 'KB04', cfPakar: 0.9 },
  { kriteriaId: 'K05', jawaban: 'Ya', kbId: 'KB04', cfPakar: 0.8 },
  { kriteriaId: 'K05', jawaban: 'Tidak', kbId: 'KB04', cfPakar: -0.7 },
  { kriteriaId: 'K08', jawaban: 'Sering lupa', kbId: 'KB04', cfPakar: 0.8 },
  { kriteriaId: 'K10', jawaban: '1-2 anak', kbId: 'KB04', cfPakar: 0.7 },
  { kriteriaId: 'K10', jawaban: '> 2 anak', kbId: 'KB04', cfPakar: 0.8 },

  // Aturan untuk Implan (KB05)
  { kriteriaId: 'K01', jawaban: '20-35 Tahun', kbId: 'KB05', cfPakar: 0.8 },
  { kriteriaId: 'K01', jawaban: '< 20 Tahun', kbId: 'KB05', cfPakar: 0.7 },
  { kriteriaId: 'K01', jawaban: '> 35 Tahun', kbId: 'KB05', cfPakar: 0.6 },
  { kriteriaId: 'K02', jawaban: 'Ya', kbId: 'KB05', cfPakar: 0.8 },
  { kriteriaId: 'K04', jawaban: 'Ya', kbId: 'KB05', cfPakar: 0.7 },
  { kriteriaId: 'K05', jawaban: 'Ya', kbId: 'KB05', cfPakar: 0.6 },
  { kriteriaId: 'K05', jawaban: 'Tidak', kbId: 'KB05', cfPakar: -0.5 },
  { kriteriaId: 'K06', jawaban: 'Tidak', kbId: 'KB05', cfPakar: 0.5 },
  { kriteriaId: 'K08', jawaban: 'Sering lupa', kbId: 'KB05', cfPakar: 0.7 },
  { kriteriaId: 'K10', jawaban: '0 (belum memiliki anak)', kbId: 'KB05', cfPakar: 0.6 },
  { kriteriaId: 'K10', jawaban: '1-2 anak', kbId: 'KB05', cfPakar: 0.8 },
];