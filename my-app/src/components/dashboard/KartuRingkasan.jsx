"use client";

import { Target, GaugeCircle, History } from "lucide-react";
import CardContent from "@/components/ui/card-content.jsx";
import { useRiwayat } from "@/lib/hooks";

export default function KartuRingkasan() {
  const { riwayat, isLoading } = useRiwayat();

  const totalKonsultasi = riwayat?.length || 0;
  const konsultasiTerakhir = riwayat?.[0];
  const rekomendasiUtama = konsultasiTerakhir?.hasil?.[0] || null;

  const formatTanggal = (isoString) => {
    if (!isoString) return "Belum ada riwayat";
    return new Date(isoString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading && !riwayat) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {[...Array(3)].map((_, i) => (
          <CardContent key={i} className="animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-2"></div>
                <div className="h-7 bg-neutral-200 dark:bg-neutral-700 rounded w-16 mb-2"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-700">
                <div className="w-8 h-8"></div>
              </div>
            </div>
          </CardContent>
        ))}
      </div>
    );
  }

  const kartuData = [
    {
      judul: "Rekomendasi Utama",
      nilai: rekomendasiUtama?.nama || "Belum ada",
      deskripsi: konsultasiTerakhir
        ? "Dari konsultasi terakhir"
        : "Lakukan konsultasi",
      icon: <Target className="w-8 h-8" />,
      warna: "text-green-600 dark:text-green-400",
      latar: "bg-green-50 dark:bg-green-900/20",
    },
    {
      judul: "Tingkat Keyakinan",
      nilai: rekomendasiUtama?.persentase
        ? `${rekomendasiUtama.persentase}%`
        : "N/A",
      deskripsi: "Akurasi rekomendasi",
      icon: <GaugeCircle className="w-8 h-8" />,
      warna: "text-blue-600 dark:text-blue-400",
      latar: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      judul: "Total Konsultasi",
      nilai: totalKonsultasi,
      deskripsi: formatTanggal(konsultasiTerakhir?.createdAt),
      icon: <History className="w-8 h-8" />,
      warna: "text-purple-600 dark:text-purple-400",
      latar: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {kartuData.map((kartu, index) => (
        <CardContent key={index}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium mb-1">{kartu.judul}</h3>
              <p className="text-md md:text-xl font-medium mb-1">
                {kartu.nilai}
              </p>
              <p className="text-xs md:text-sm text-foreground/80">
                {kartu.deskripsi}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${kartu.latar}`}>
              <div className={kartu.warna}>{kartu.icon}</div>
            </div>
          </div>
        </CardContent>
      ))}
    </div>
  );
}
