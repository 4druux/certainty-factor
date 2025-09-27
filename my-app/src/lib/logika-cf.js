// lib/logika-cf.js
import { ATURAN_CF, JENIS_KB } from '../data/basis-pengetahuan.js';

/**
 * Fungsi untuk menghitung kombinasi Certainty Factor
 * CF(A,B) = CF(A) + CF(B) * (1 - CF(A))
 */
function combineCF(cf1, cf2) {
  if (cf1 >= 0 && cf2 >= 0) {
    return cf1 + cf2 * (1 - cf1);
  } else if (cf1 < 0 && cf2 < 0) {
    return cf1 + cf2 * (1 + cf1);
  } else {
    return (cf1 + cf2) / (1 - Math.min(Math.abs(cf1), Math.abs(cf2)));
  }
}

/**
 * Fungsi utama untuk menghitung rekomendasi KB berdasarkan jawaban pengguna
 * @param {Object} jawabanPengguna - Object berisi jawaban pengguna dengan key kriteriaId
 * @returns {Array} Array hasil rekomendasi dengan format: [{nama, deskripsi, persentase, cfValue}]
 */
export function hitungRekomendasi(jawabanPengguna) {
  // Inisialisasi nilai CF kombinasi untuk setiap jenis KB
  const cfKombinasi = {};
  JENIS_KB.forEach(kb => {
    cfKombinasi[kb.id] = 0;
  });

  // Iterasi melalui setiap jawaban pengguna
  Object.entries(jawabanPengguna).forEach(([kriteriaId, jawaban]) => {
    if (!jawaban || jawaban.trim() === '') return; // Skip jika jawaban kosong

    // Cari aturan yang cocok dengan kriteria dan jawaban
    const aturanCocok = ATURAN_CF.filter(aturan => 
      aturan.kriteriaId === kriteriaId && aturan.jawaban === jawaban
    );

    // Terapkan setiap aturan yang cocok
    aturanCocok.forEach(aturan => {
      const cfUser = 1.0; // Diasumsikan pengguna yakin 100% dengan jawabannya
      const cfGejala = aturan.cfPakar * cfUser;

      // Kombinasikan CF gejala dengan CF yang sudah ada
      if (cfKombinasi[aturan.kbId] === 0) {
        cfKombinasi[aturan.kbId] = cfGejala;
      } else {
        cfKombinasi[aturan.kbId] = combineCF(cfKombinasi[aturan.kbId], cfGejala);
      }
    });
  });

  // Format hasil akhir
  const hasilAkhir = JENIS_KB.map(kb => {
    const cfValue = cfKombinasi[kb.id];
    const persentase = Math.round(Math.abs(cfValue) * 100);
    
    return {
      nama: kb.nama,
      deskripsi: kb.deskripsi,
      persentase: persentase,
      cfValue: cfValue,
      id: kb.id
    };
  });

  // Filter hanya yang memiliki keyakinan positif dan signifikan (> 10%)
  const hasilPositif = hasilAkhir.filter(hasil => hasil.cfValue > 0 && hasil.persentase >= 10);

  // Urutkan dari yang tertinggi ke terendah
  hasilPositif.sort((a, b) => b.persentase - a.persentase);

  return hasilPositif;
}

/**
 * Fungsi untuk memvalidasi kelengkapan jawaban
 * @param {Object} jawabanPengguna - Object jawaban pengguna
 * @param {Array} kriteria - Array kriteria dari basis pengetahuan
 * @returns {Object} {isValid, missingQuestions}
 */
export function validasiJawaban(jawabanPengguna, kriteria) {
  const pertanyaanKosong = kriteria.filter(k => 
    !jawabanPengguna[k.id] || jawabanPengguna[k.id].trim() === ''
  );

  return {
    isValid: pertanyaanKosong.length === 0,
    missingQuestions: pertanyaanKosong
  };
}