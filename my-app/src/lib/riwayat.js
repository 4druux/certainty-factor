// lib/riwayat.js
// Fungsi untuk mengelola riwayat konsultasi di Local Storage

/**
 * Menyimpan hasil konsultasi ke Local Storage
 * @param {Array} hasilRekomendasi - Array hasil rekomendasi dari sistem
 * @param {Object} jawabanPengguna - Object jawaban pengguna
 */
export function simpanKonsultasi(hasilRekomendasi, jawabanPengguna) {
  if (typeof window === 'undefined') return; // Check for server-side rendering

  const konsultasiBaru = {
    id: Date.now().toString(),
    tanggal: new Date().toISOString(),
    hasil: hasilRekomendasi,
    jawaban: jawabanPengguna,
    rekomendasiUtama: hasilRekomendasi.length > 0 ? hasilRekomendasi[0] : null,
    timestamp: Date.now()
  };

  try {
    const riwayatLama = getRiwayatKonsultasi();
    const riwayatBaru = [konsultasiBaru, ...riwayatLama];
    
    // Batasi maksimal 50 riwayat untuk menghindari Local Storage penuh
    const riwayatTerbatas = riwayatBaru.slice(0, 50);
    
    localStorage.setItem('riwayat_konsultasi_kb', JSON.stringify(riwayatTerbatas));
    localStorage.setItem('konsultasi_terakhir', JSON.stringify(konsultasiBaru));
    
    return konsultasiBaru;
  } catch (error) {
    console.error('Error menyimpan konsultasi:', error);
    return null;
  }
}

/**
 * Mengambil semua riwayat konsultasi dari Local Storage
 * @returns {Array} Array riwayat konsultasi
 */
export function getRiwayatKonsultasi() {
  if (typeof window === 'undefined') return [];

  try {
    const riwayat = localStorage.getItem('riwayat_konsultasi_kb');
    return riwayat ? JSON.parse(riwayat) : [];
  } catch (error) {
    console.error('Error mengambil riwayat konsultasi:', error);
    return [];
  }
}

/**
 * Mengambil konsultasi terakhir dari Local Storage
 * @returns {Object|null} Object konsultasi terakhir atau null
 */
export function getKonsultasiTerakhir() {
  if (typeof window === 'undefined') return null;

  try {
    const konsultasiTerakhir = localStorage.getItem('konsultasi_terakhir');
    return konsultasiTerakhir ? JSON.parse(konsultasiTerakhir) : null;
  } catch (error) {
    console.error('Error mengambil konsultasi terakhir:', error);
    return null;
  }
}

/**
 * Menghapus konsultasi berdasarkan ID
 * @param {string} id - ID konsultasi yang akan dihapus
 */
export function hapusKonsultasi(id) {
  if (typeof window === 'undefined') return;

  try {
    const riwayat = getRiwayatKonsultasi();
    const riwayatBaru = riwayat.filter(konsultasi => konsultasi.id !== id);
    localStorage.setItem('riwayat_konsultasi_kb', JSON.stringify(riwayatBaru));
    
    // Update konsultasi terakhir jika yang dihapus adalah konsultasi terakhir
    const konsultasiTerakhir = getKonsultasiTerakhir();
    if (konsultasiTerakhir && konsultasiTerakhir.id === id) {
      const konsultasiTerakhirBaru = riwayatBaru.length > 0 ? riwayatBaru[0] : null;
      if (konsultasiTerakhirBaru) {
        localStorage.setItem('konsultasi_terakhir', JSON.stringify(konsultasiTerakhirBaru));
      } else {
        localStorage.removeItem('konsultasi_terakhir');
      }
    }
  } catch (error) {
    console.error('Error menghapus konsultasi:', error);
  }
}

/**
 * Menghapus semua riwayat konsultasi
 */
export function hapusSemuaRiwayat() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('riwayat_konsultasi_kb');
    localStorage.removeItem('konsultasi_terakhir');
  } catch (error) {
    console.error('Error menghapus semua riwayat:', error);
  }
}

/**
 * Mendapatkan statistik konsultasi
 * @returns {Object} Object berisi statistik
 */
export function getStatistikKonsultasi() {
  const riwayat = getRiwayatKonsultasi();
  
  if (riwayat.length === 0) {
    return {
      totalKonsultasi: 0,
      rekomendasiTerpopuler: null,
      rataRataKeyakinan: 0
    };
  }

  // Hitung rekomendasi terpopuler
  const hitungRekomendasi = {};
  let totalKeyakinan = 0;
  let jumlahRekomendasi = 0;

  riwayat.forEach(konsultasi => {
    if (konsultasi.rekomendasiUtama) {
      const nama = konsultasi.rekomendasiUtama.nama;
      hitungRekomendasi[nama] = (hitungRekomendasi[nama] || 0) + 1;
      totalKeyakinan += konsultasi.rekomendasiUtama.persentase;
      jumlahRekomendasi++;
    }
  });

  const rekomendasiTerpopuler = Object.keys(hitungRekomendasi).reduce((a, b) => 
    hitungRekomendasi[a] > hitungRekomendasi[b] ? a : b, null
  );

  return {
    totalKonsultasi: riwayat.length,
    rekomendasiTerpopuler,
    rataRataKeyakinan: jumlahRekomendasi > 0 ? Math.round(totalKeyakinan / jumlahRekomendasi) : 0
  };
}