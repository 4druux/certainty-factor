"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useRiwayat } from "@/lib/hooks";
import { useTheme } from "next-themes";
import { BarChart, Frown } from "lucide-react";
import CardContent from "@/components/ui/card-content";
import { JENIS_KB } from "@/data/basis-pengetahuan";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const KB_COLORS = {
  "Pil KB": "#F89B78",
  "KB Suntik 1 Bulan": "#B6A6E9",
  "KB Suntik 3 Bulan": "#AFDC8F",
  "IUD (Spiral)": "#9AD8D8",
  "Implan (Susuk KB)": "#92C5F9",
};

const SkeletonLoader = () => (
  <CardContent>
    <div className="h-7 w-64 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-6"></div>
    <div className="flex items-end justify-around h-[350px] gap-4">
      <div className="w-1/6 h-3/5 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
      <div className="w-1/6 h-4/5 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
      <div className="w-1/6 h-2/5 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
      <div className="w-1/6 h-3/4 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
      <div className="w-1/6 h-1/2 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
    </div>
  </CardContent>
);

export default function GrafikTotalRekomendasi() {
  const { riwayat, isLoading } = useRiwayat();
  const { resolvedTheme } = useTheme();

  const { chartData, totalData } = useMemo(() => {
    if (!riwayat || riwayat.length === 0) {
      return { chartData: { options: {}, series: [] }, totalData: 0 };
    }

    const counts = JENIS_KB.reduce((acc, kb) => ({ ...acc, [kb.nama]: 0 }), {});

    let totalRecommendations = 0;
    riwayat.forEach((konsultasi) => {
      if (Array.isArray(konsultasi.hasil)) {
        konsultasi.hasil.forEach((rekomendasi) => {
          if (counts.hasOwnProperty(rekomendasi.nama)) {
            counts[rekomendasi.nama]++;
            totalRecommendations++;
          }
        });
      }
    });

    const sortedData = Object.entries(counts).sort(([, a], [, b]) => b - a);
    const labels = sortedData.map(([label]) => label);
    const dataPoints = sortedData.map(([, data]) => data);
    const chartColors = labels.map((label) => KB_COLORS[label] || "#6b7280");

    const labelColor = resolvedTheme === "dark" ? "#E5E7EB" : "#1F2937";
    const borderColor = resolvedTheme === "dark" ? "#374151" : "#E5E7EB";

    const newChartData = {
      series: [{ name: "Jumlah Direkomendasikan", data: dataPoints }],
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: { show: false },
          background: "transparent",
        },
        plotOptions: {
          bar: {
            distributed: true,
            borderRadius: 10,
            borderRadiusApplication: "end",
            horizontal: false,
            columnWidth: "35%",
          },
        },
        states: {
          hover: { filter: { type: "none" } },
          active: { filter: { type: "none" } },
        },
        dataLabels: { enabled: false },
        colors: chartColors,
        legend: { show: false },
        grid: { borderColor: borderColor, strokeDashArray: 4 },
        xaxis: {
          categories: labels,
          labels: { style: { colors: labelColor } },
        },
        yaxis: {
          labels: { style: { colors: labelColor } },
          title: {
            text: "Jumlah Rekomendasi",
            style: { color: labelColor, fontWeight: 400 },
          },
        },
        tooltip: { theme: resolvedTheme },
      },
    };

    return { chartData: newChartData, totalData: totalRecommendations };
  }, [riwayat, resolvedTheme]);

  if (isLoading && !riwayat) {
    return <SkeletonLoader />;
  }

  if (totalData === 0) {
    return (
      <CardContent>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Statistik Rekomendasi
        </h2>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Frown className="w-16 h-16 mx-auto mb-4 text-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Belum Ada Data Statistik
          </h3>
          <p className="text-sm text-foreground/80">
            Data akan muncul setelah ada riwayat konsultasi.
          </p>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Statistik Rekomendasi Keseluruhan
        </h2>
        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          * Dari semua riwayat
        </div>
      </div>
      <div id="total-chart">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-foreground/80">
          Grafik menunjukkan frekuensi setiap jenis KB direkomendasikan di semua
          sesi konsultasi.
        </p>
      </div>
    </CardContent>
  );
}
