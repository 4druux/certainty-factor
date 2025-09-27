"use client";

import GrafikRekomendasi from "@/components/dashboard/GrafikRekomendasi";
import KartuRingkasan from "@/components/dashboard/KartuRingkasan";
import SapaanDinamis from "@/components/dashboard/SapaanDinamis";
import TabelRiwayat from "@/components/dashboard/TabelRiwayat";

export default function DashboardPage() {
  return (
    <div className="bg-background md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <SapaanDinamis />
        <KartuRingkasan />
        <GrafikRekomendasi />
        <TabelRiwayat />
      </div>
    </div>
  );
}
