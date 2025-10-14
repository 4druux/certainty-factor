import { ATURAN_CF, JENIS_KB } from "../data/basis-pengetahuan.js";

function combineCF(cf1, cf2) {
  if (cf1 >= 0 && cf2 >= 0) {
    return cf1 + cf2 * (1 - cf1);
  } else if (cf1 < 0 && cf2 < 0) {
    return cf1 + cf2 * (1 + cf1);
  } else {
    return (cf1 + cf2) / (1 - Math.min(Math.abs(cf1), Math.abs(cf2)));
  }
}

export function hitungRekomendasi(jawabanPengguna) {
  const cfKombinasi = {};
  JENIS_KB.forEach((kb) => {
    cfKombinasi[kb.id] = 0;
  });

  Object.entries(jawabanPengguna).forEach(([kriteriaId, jawaban]) => {
    if (!jawaban || jawaban.trim() === "") return;

    const aturanCocok = ATURAN_CF.filter(
      (aturan) => aturan.kriteriaId === kriteriaId && aturan.jawaban === jawaban
    );

    aturanCocok.forEach((aturan) => {
      const cfUser = 1.0;
      const cfGejala = aturan.cfPakar * cfUser;

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
    const persentase = Math.round(Math.abs(cfValue) * 100);

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
