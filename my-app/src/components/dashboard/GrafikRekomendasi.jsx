"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import CardContent from "@/components/ui/card-content";
import { Frown } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function GrafikRekomendasi() {
  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const konsultasiDummy = {
      tanggal: new Date().toISOString(),
      // hasil: [
      //   {
      //     id: "KB04",
      //     nama: "IUD (Spiral)",
      //     deskripsi:
      //       "Alat kecil yang dipasang di dalam rahim, efektif untuk jangka panjang (5-10 tahun).",
      //     persentase: 92.5,
      //   },
      //   {
      //     id: "KB05",
      //     nama: "Implan (Susuk KB)",
      //     deskripsi:
      //       "Batang kecil fleksibel yang dimasukkan di bawah kulit lengan, efektif hingga 3 tahun.",
      //     persentase: 85.0,
      //   },
      //   {
      //     id: "KB03",
      //     nama: "KB Suntik 3 Bulan",
      //     deskripsi:
      //       "Suntikan hormonal yang diberikan setiap tiga bulan sekali, aman untuk ibu menyusui.",
      //     persentase: 78.8,
      //   },
      //   {
      //     id: "KB02",
      //     nama: "KB Suntik 1 Bulan",
      //     deskripsi:
      //       "Suntikan hormonal yang diberikan setiap satu bulan sekali.",
      //     persentase: 60.2,
      //   },
      //   {
      //     id: "KB01",
      //     nama: "Pil KB",
      //     deskripsi:
      //       "Diminum setiap hari, mengandung hormon untuk mencegah ovulasi.",
      //     persentase: 45.5,
      //   },
      // ],
    };

    if (
      konsultasiDummy &&
      konsultasiDummy.hasil &&
      konsultasiDummy.hasil.length > 0
    ) {
      setOriginalData(konsultasiDummy.hasil);

      const labels = konsultasiDummy.hasil.map((item) => item.nama);
      const dataPoints = konsultasiDummy.hasil.map((item) => item.persentase);

      setChartData({
        series: [
          {
            name: "Keyakinan",
            data: dataPoints,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "line",
            toolbar: { show: false },
            zoom: { enabled: false },
            background: "transparent",
          },
          colors: ["#3B82F6"],
          dataLabels: { enabled: false },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          grid: {
            borderColor: "hsl(var(--border))",
            strokeDashArray: 4,
          },
          xaxis: {
            categories: labels,
            labels: {
              style: {
                colors: "hsl(var(--muted-foreground))",
                fontSize: "12px",
              },
            },
          },
          yaxis: {
            min: 0,
            max: 100,
            title: {
              text: "Keyakinan (%)",
              style: {
                color: "hsl(var(--muted-foreground))",
                fontWeight: 400,
              },
            },
            labels: {
              style: {
                colors: "hsl(var(--muted-foreground))",
              },
            },
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              const item = konsultasiDummy.hasil[dataPointIndex];
              return `
                <div class="rounded-lg p-3 shadow-lg max-w-xs text-foreground">
                  <h4 class="font-semibold text-sm mb-1">${item.nama}</h4>
                  <p class="text-xs  mb-2">${item.deskripsi}</p>
                  <p class="text-base font-bold text-primary">
                    Keyakinan: ${item.persentase}%
                  </p>
                </div>
              `;
            },
          },
        },
      });
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <CardContent>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Visualisasi Rekomendasi
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CardContent>
    );
  }

  if (originalData.length === 0) {
    return (
      <CardContent>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Visualisasi Rekomendasi
        </h2>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Frown className="w-16 h-16 mx-auto mb-4 text-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Belum Ada Data
          </h3>
          <p>Lakukan konsultasi terlebih dahulu untuk melihat visualisasi.</p>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Visualisasi Rekomendasi
        </h2>
        <div className="text-sm ">Berdasarkan konsultasi terakhir</div>
      </div>
      <div id="chart">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm ">
          Grafik menunjukkan tingkat keyakinan sistem untuk setiap jenis KB yang
          direkomendasikan.
        </p>
      </div>
    </CardContent>
  );
}
