"use client";

import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import {
  getConfidenceBg,
  getConfidenceProgressColor,
  getConfidenceIcon,
} from "@/lib/utils";

export default function HasilRekomendasi({ hasil }) {
  if (!hasil || hasil.length === 0) {
    return (
      <div className="mt-8 bg-card border border-border text-foreground px-4 md:px-6 py-4 rounded-lg shadow-sm">
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

  const getRankBadge = (index) => {
    return (
      <div className="text-xs w-fit px-3 py-1 bg-background border border-border rounded-full">
        Peringkat {index + 1}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="rounded-xl border-l-4 border-sky-400 bg-sky-50 p-4 md:p-6 dark:border-sky-600 dark:bg-sky-950/30">
        <div className="flex items-center gap-4 text-sky-800 dark:text-sky-500">
          <div className="hidden md:block">
            <div className="rounded-xl bg-sky-100 p-4 dark:bg-sky-500/10">
              <Lightbulb className="w-8 h-8" />
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h2 className="text-md md:text-xl font-semibold">
              Hasil Rekomendasi KB
            </h2>
            <p className="text-xs md:text-sm text-sky-700 dark:text-sky-400">
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
            className="p-4 md:p-6 border border-border rounded-xl"
          >
            <div>{getRankBadge(index)}</div>

            <div className="flex items-center justify-between mb-4 gap-2">
              <h3 className="text-md md:text-xl font-semibold text-foreground mt-3">
                {rekomendasi.nama}
              </h3>

              <div
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap ${getConfidenceBg(
                  rekomendasi.persentase
                )}`}
              >
                {getConfidenceIcon(rekomendasi.persentase)}
                <span className="text-xs md:text-sm">
                  Keyakinan: {rekomendasi.persentase}%
                </span>
              </div>
            </div>

            <p className="leading-relaxed mb-5">{rekomendasi.deskripsi}</p>

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

      <div className="mt-6 border rounded-xl border-sky-400 bg-sky-50 p-4 md:p-6 dark:border-sky-600 dark:bg-sky-950/30">
        <div className="flex items-start text-sky-800 dark:text-sky-500">
          <div className="hidden md:block">
            <Info className="w-7 h-7 mt-1 mr-4 flex-shrink-0" />
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-lg">Catatan Penting</h4>
            <ul className="text-sky-700 dark:text-sky-400 space-y-2 text-xs md:text-sm list-disc list-inside">
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
