"use client";

import {
  AlertTriangle,
  BadgeCheck,
  BadgeInfo,
  BadgePercent,
  Info,
  Lightbulb,
} from "lucide-react";

export default function HasilRekomendasi({ hasil }) {
  if (!hasil || hasil.length === 0) {
    return (
      <div className="mt-8 bg-card border border-border text-foreground px-6 py-4 rounded-lg shadow-sm">
        <div className="flex items-center">
          <AlertTriangle className="w-8 h-8 text-destructive mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Tidak Ada Rekomendasi</h3>
            <p className="">
              Berdasarkan jawaban Anda, sistem tidak dapat memberikan
              rekomendasi yang sesuai. Silakan konsultasikan dengan dokter atau
              bidan untuk mendapatkan saran yang lebih personal.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getConfidenceColor = (persentase) => {
    if (persentase >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (persentase >= 60)
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    if (persentase >= 40) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-slate-100 text-slate-800 border-slate-200";
  };

  const getConfidenceProgressColor = (persentase) => {
    if (persentase >= 80) return "bg-green-500";
    if (persentase >= 60) return "bg-indigo-500";
    if (persentase >= 40) return "bg-amber-500";
    return "bg-slate-500";
  };

  const getConfidenceIcon = (persentase) => {
    if (persentase >= 80) {
      return <BadgeCheck className="w-6 h-6 text-green-500" />;
    }
    if (persentase >= 60) {
      return <BadgeInfo className="w-6 h-6 text-indigo-500" />;
    }
    return <BadgePercent className="w-6 h-6 text-amber-500" />;
  };

  const getRankBadge = (index) => {
    return (
      <div className="text-xs w-fit px-3 py-1 bg-background border border-border rounded-full">
        Peringkat {index + 1}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="rounded-xl border-l-4 border-indigo-400 bg-indigo-50 p-6 dark:border-indigo-600 dark:bg-indigo-950/30">
        <div className="flex items-center gap-4 text-indigo-800 dark:text-indigo-500">
          <div className="rounded-xl bg-indigo-100 p-4 dark:bg-indigo-500/10">
            <Lightbulb className="w-8 h-8" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-xl font-semibold">Hasil Rekomendasi KB</h2>
            <p className="text-sm text-indigo-700 dark:text-indigo-400">
              Berdasarkan analisis menggunakan metode Certainty Factor, berikut
              adalah rekomendasi jenis KB yang paling sesuai dengan kondisi
              Anda.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {hasil.map((rekomendasi, index) => (
          <div
            key={rekomendasi.id}
            className="p-6 border border-border rounded-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
              <div className="flex-1 mb-3 sm:mb-0">
                {getRankBadge(index)}
                <h3 className="text-xl font-semibold text-foreground mt-3">
                  {rekomendasi.nama}
                </h3>
              </div>
              <div
                className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap ${getConfidenceColor(
                  rekomendasi.persentase
                )}`}
              >
                {getConfidenceIcon(rekomendasi.persentase)}
                <span className="ml-2">
                  Keyakinan: {rekomendasi.persentase}%
                </span>
              </div>
            </div>

            <p className=" leading-relaxed mb-5">{rekomendasi.deskripsi}</p>

            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getConfidenceProgressColor(
                  rekomendasi.persentase
                )}`}
                style={{ width: `${rekomendasi.persentase}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border rounded-xl border-indigo-400 bg-indigo-50 p-6 dark:border-indigo-600 dark:bg-indigo-950/30">
        <div className="flex items-start text-indigo-800 dark:text-indigo-500">
          <Info className="w-7 h-7 mt-1 mr-4 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-2 text-lg">Catatan Penting</h4>
            <ul className="text-indigo-700 dark:text-indigo-400 text-sm space-y-2 list-disc list-inside">
              <li>
                Hasil ini adalah rekomendasi sistem berdasarkan data yang Anda
                berikan.
              </li>
              <li>
                Selalu konsultasikan dengan dokter atau bidan sebelum memutuskan
                jenis KB.
              </li>
              <li>
                Setiap metode KB memiliki kelebihan, kekurangan, dan potensi
                efek samping.
              </li>
              <li>Pemeriksaan kesehatan lebih lanjut mungkin diperlukan.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
