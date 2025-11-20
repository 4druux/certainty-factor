"use client";

import SapaanDinamis from "@/components/dashboard/SapaanDinamis";
import KartuRingkasan from "@/components/dashboard/KartuRingkasan";
import GrafikTotalRekomendasi from "@/components/dashboard/GrafikTotalRekomendasi";
import TabelRiwayat from "@/components/dashboard/TabelRiwayat";

export default function DashboardPage() {
  return (
    <div className="bg-background md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 px-4 md:mt-16">
        <SapaanDinamis />
        <KartuRingkasan />
        <GrafikTotalRekomendasi />
        <TabelRiwayat />
      </div>
    </div>
  );
}
