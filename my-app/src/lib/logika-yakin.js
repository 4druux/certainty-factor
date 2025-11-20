const userCfMap = {
  "Sangat Yakin": 1.0,
  Yakin: 0.8,
  "Cukup Yakin": 0.6,
  "Kurang Yakin": 0.4,
  "Tidak Tahu": 0.2,
  Tidak: 0.0,
};

function combineCF(cf1, cf2) {
  if (cf1 >= 0 && cf2 >= 0) {
    return cf1 + cf2 * (1 - cf1);
  } else if (cf1 < 0 && cf2 < 0) {
    return cf1 + cf2 * (1 + cf1);
  } else {
    return (cf1 + cf2) / (1 - Math.min(Math.abs(cf1), Math.abs(cf2)));
  }
}

export function hitungRekomendasi(jawabanPengguna, ATURAN_CF, JENIS_KB) {
  if (!jawabanPengguna || !ATURAN_CF || !JENIS_KB) {
    console.error("Data (aturan, jenisKb) tidak lengkap untuk perhitungan.");
    return [];
  }

  const cfKombinasi = {};
  JENIS_KB.forEach((kb) => {
    cfKombinasi[kb.id] = 0;
  });

  Object.entries(jawabanPengguna).forEach(([kriteriaId, jawaban]) => {
    if (!jawaban || jawaban.trim() === "") return;

    const aturanUntukKriteria = ATURAN_CF.filter(
      (aturan) => aturan.kriteriaId === kriteriaId
    );

    const cfUser = userCfMap[jawaban] || 0;
    const aturanCocok =
      jawaban === "Tidak"
        ? aturanUntukKriteria.filter((aturan) => aturan.jawaban === "Tidak")
        : aturanUntukKriteria.filter((aturan) => aturan.jawaban !== "Tidak");

    aturanCocok.forEach((aturan) => {
      const cfGejala =
        jawaban === "Tidak" ? aturan.cfPakar * 1.0 : aturan.cfPakar * cfUser;

      if (cfKombinasi[aturan.kbId] === 0) {
        cfKombinasi[aturan.kbId] = cfGejala;
      } else {
        cfKombinasi[aturan.kbId] = combineCF(
          cfKombinasi[aturan.kbId],
          cfGejala
        );
      }
    });
  });

  const hasilAkhir = JENIS_KB.map((kb) => {
    const cfValue = cfKombinasi[kb.id];
    const persentase = parseFloat((Math.abs(cfValue) * 100).toFixed(2));

    return {
      nama: kb.nama,
      deskripsi: kb.deskripsi,
      persentase: persentase,
      cfValue: cfValue,
      id: kb.id,
    };
  });

  const hasilPositif = hasilAkhir.filter((hasil) => hasil.cfValue > 0);

  hasilPositif.sort((a, b) => b.persentase - a.persentase);

  return hasilPositif;
}

export function validasiJawaban(jawabanPengguna, kriteria) {
  const pertanyaanKosong = kriteria.filter(
    (k) => !jawabanPengguna[k.id] || jawabanPengguna[k.id].trim() === ""
  );

  return {
    isValid: pertanyaanKosong.length === 0,
    missingQuestions: pertanyaanKosong,
  };
}
