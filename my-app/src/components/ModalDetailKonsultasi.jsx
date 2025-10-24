"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BarChart3,
  ListChecks,
  CheckCircle2,
  Frown,
  ListCollapse,
  User,
} from "lucide-react";
import { KRITERIA } from "../data/basis-yakin.js";
import {
  getConfidenceProgressColor,
  getConfidenceTextColor,
  getConfidenceBg,
} from "@/lib/utils";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const KB_COLORS = {
  "Pil KB": "#3b82f6",
  "KB Suntik 1 Bulan": "#8b5cf6",
  Kondom: "#ec4899",
  "IUD (Spiral)": "#10b981",
  "Implan (Susuk KB)": "#f59e0b",
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const ModalVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  exit: {
    y: "100%",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

export default function ModalDetailKonsultasi({ isOpen, onClose, konsultasi }) {
  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (konsultasi?.hasil && konsultasi.hasil.length > 0) {
      const hasilKonsultasi = konsultasi.hasil;
      const labels = hasilKonsultasi.map((item) => item.nama);
      const dataPoints = hasilKonsultasi.map((item) => item.persentase);
      const chartColors = labels.map((label) => KB_COLORS[label] || "#6b7280");
      const labelColor = resolvedTheme === "dark" ? "#E5E7EB" : "#1F2937";
      const borderColor = resolvedTheme === "dark" ? "#374151" : "#E5E7EB";

      setChartData({
        series: [{ name: "Keyakinan", data: dataPoints }],
        options: {
          chart: {
            height: 250,
            type: "bar",
            toolbar: { show: false },
            zoom: { enabled: false },
            background: "transparent",
          },
          colors: chartColors,
          plotOptions: {
            bar: {
              distributed: true,
              columnWidth: "35%",
              borderRadius: 4,
              horizontal: false,
            },
          },
          dataLabels: { enabled: false },
          legend: { show: false },
          grid: { borderColor: borderColor, strokeDashArray: 4 },
          xaxis: {
            categories: labels,
            labels: { style: { colors: labelColor, fontSize: "12px" } },
          },
          yaxis: {
            min: 0,
            max: 100,
            title: {
              text: "Keyakinan (%)",
              style: { color: labelColor, fontWeight: 400 },
            },
            labels: { style: { colors: labelColor } },
          },
          tooltip: {
            enabled: true,
            theme: resolvedTheme,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              const item = hasilKonsultasi[dataPointIndex];
              const bgColor = resolvedTheme === "dark" ? "#111827" : "#FFFFFF";
              const textColor =
                resolvedTheme === "dark" ? "#F9FAFB" : "#111827";
              const subTextColor =
                resolvedTheme === "dark"
                  ? "rgba(249, 250, 251, 0.8)"
                  : "rgba(17, 24, 39, 0.8)";
              const tooltipBorderColor =
                resolvedTheme === "dark" ? "#374151" : "#E5E7EB";
              return `<div style="padding: 10px; background-color: ${bgColor}; border: 1px solid ${tooltipBorderColor}; border-radius: 0.5rem; max-width: 250px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"><h4 style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.25rem; color: ${textColor};">${item.nama}</h4><p style="font-size: 0.75rem; color: ${subTextColor}; margin-bottom: 0.5rem; white-space: normal; word-wrap: break-word;">${item.deskripsi}</p><p style="font-size: 1rem; font-weight: 700; color: #6366f1;">Keyakinan: ${item.persentase}%</p></div>`;
            },
          },
        },
      });
    }
  }, [konsultasi, resolvedTheme]);

  const formatTanggal = (isoString) =>
    new Date(isoString).toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!konsultasi) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex ${
            isMobile ? "items-end" : "items-center justify-center p-4"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className={`relative flex flex-col bg-background shadow-2xl border-border ${
              isMobile
                ? "w-full h-[90dvh] rounded-t-2xl border-t"
                : "w-full max-w-4xl max-h-[90vh] rounded-xl border"
            }`}
            variants={ModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.y > 150 || info.velocity.y > 500) {
                onClose();
              }
            }}
          >
            {isMobile && (
              <div className="w-12 h-6 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto my-2 cursor-grab active:cursor-grabbing" />
            )}

            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3 text-foreground">
                <ListCollapse className="w-8 h-8 md:w-10 md:h-10" />
                <div>
                  <h3 className="text-md md:text-xl font-semibold">
                    Detail Konsultasi
                  </h3>
                  <p className="text-xs">{formatTanggal(konsultasi.tanggal)}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 transition-colors rounded-full hover:text-background hover:bg-foreground"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 md:p-6 flex flex-col md:flex-row gap-8">
              <div className="flex flex-col gap-8 md:w-1/2">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-5 h-5 " />
                    <h4 className="text-lg font-semibold text-foreground">
                      Visualisasi Rekomendasi
                    </h4>
                  </div>
                  <div>
                    {konsultasi.hasil?.length > 0 ? (
                      <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={250}
                      />
                    ) : (
                      <div className="text-center py-10 border-2 border-dashed rounded-lg h-[250px] flex flex-col justify-center">
                        <Frown className="w-10 h-10 mx-auto mb-2" />
                        <p>Tidak ada rekomendasi</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <ListChecks className="w-5 h-5 " />
                    <h4 className="text-lg font-semibold text-foreground">
                      Hasil Rekomendasi
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {konsultasi.hasil?.length > 0 ? (
                      konsultasi.hasil.map((item, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border border-border ${getConfidenceBg(
                            item.persentase
                          )}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-foreground">
                              {item.nama}
                            </h5>
                            <span
                              className={`text-sm font-bold ${getConfidenceTextColor(
                                item.persentase
                              )}`}
                            >
                              {item.persentase}%
                            </span>
                          </div>
                          <p className="text-sm mb-3">{item.deskripsi}</p>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full ${getConfidenceProgressColor(
                                item.persentase
                              )}`}
                              style={{ width: `${item.persentase}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <Frown className="w-10 h-10 mx-auto mb-2" />
                        <p>Tidak ada rekomendasi</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8 md:w-1/2 md:pr-2">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 " />
                    <h4 className="text-lg font-semibold text-foreground">
                      Data Pengguna
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border border-border">
                      <h6 className="text-sm font-medium mb-1 text-muted-foreground">
                        Nama Lengkap
                      </h6>
                      <p className="text-sm text-foreground font-semibold">
                        {konsultasi.dataDiri?.nama || "-"}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border border-border">
                      <h6 className="text-sm font-medium mb-1 text-muted-foreground">
                        Umur
                      </h6>
                      <p className="text-sm text-foreground font-semibold">
                        {konsultasi.dataDiri?.umur
                          ? `${konsultasi.dataDiri.umur} tahun`
                          : "-"}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border border-border">
                      <h6 className="text-sm font-medium mb-1 text-muted-foreground">
                        Alamat
                      </h6>
                      <p className="text-sm text-foreground font-semibold break-words">
                        {konsultasi.dataDiri?.alamat || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <ListChecks className="w-5 h-5 " />
                    <h4 className="text-lg font-semibold text-foreground">
                      Jawaban Anda
                    </h4>
                  </div>
                  <div className="space-y-3 md:max-h-[460px] md:overflow-y-auto">
                    {KRITERIA.map((kriteria) => {
                      const jawaban = konsultasi.jawaban?.[kriteria.id];
                      if (
                        !jawaban ||
                        kriteria.id === "G01" ||
                        kriteria.id === "G02"
                      )
                        return null;
                      return (
                        <div
                          key={kriteria.id}
                          className="p-3 bg-muted/50 rounded-lg border border-border"
                        >
                          <h6 className="text-sm font-medium mb-1">
                            {kriteria.pertanyaan}
                          </h6>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <p className="text-sm text-foreground font-semibold">
                              {jawaban}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto p-6 border-t border-border flex justify-end flex-shrink-0">
              <p className="text-xs font-mono text-foreground/50">
                ID: {konsultasi.id}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
