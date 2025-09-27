"use client";

import { useState, useEffect } from "react";
import { Target, GaugeCircle, History } from "lucide-react";
import {
  getKonsultasiTerakhir,
  getStatistikKonsultasi,
} from "@/lib/riwayat.js";
import CardContent from "@/components/ui/card-content.jsx";

export default function KartuRingkasan() {
  const [konsultasiTerakhir, setKonsultasiTerakhir] = useState(null);
  const [statistik, setStatistik] = useState(null);

  useEffect(() => {
    setKonsultasiTerakhir(getKonsultasiTerakhir());
    setStatistik(getStatistikKonsultasi());
  }, []);

  const formatTanggal = (isoString) => {
    if (!isoString) return "Belum ada riwayat";
    return new Date(isoString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const kartuData = [
    {
      judul: "Rekomendasi Utama",
      nilai: konsultasiTerakhir?.rekomendasiUtama?.nama || "Belum ada",
      deskripsi: konsultasiTerakhir
        ? "Dari konsultasi terakhir"
        : "Lakukan konsultasi",
      icon: <Target className="w-8 h-8" />,
      warna: "text-green-600 dark:text-green-400",
      latar: "bg-green-50 dark:bg-green-900/20",
    },
    {
      judul: "Tingkat Keyakinan",
      nilai: konsultasiTerakhir?.rekomendasiUtama?.persentase
        ? `${konsultasiTerakhir.rekomendasiUtama.persentase}%`
        : "N/A",
      deskripsi: "Akurasi rekomendasi",
      icon: <GaugeCircle className="w-8 h-8" />,
      warna: "text-blue-600 dark:text-blue-400",
      latar: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      judul: "Total Konsultasi",
      nilai: statistik?.totalKonsultasi || 0,
      deskripsi: formatTanggal(konsultasiTerakhir?.tanggal),
      icon: <History className="w-8 h-8" />,
      warna: "text-purple-600 dark:text-purple-400",
      latar: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kartuData.map((kartu, index) => (
        <CardContent key={index}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium mb-1">{kartu.judul}</h3>
              <p className="text-2xl font-bold">{kartu.nilai}</p>
            </div>
            <div className={`p-3 rounded-lg ${kartu.latar}`}>
              <div className={kartu.warna}>{kartu.icon}</div>
            </div>
          </div>
          <p className="text-sm mt-4">{kartu.deskripsi}</p>
        </CardContent>
      ))}
    </div>
  );
}
