"use client";

import { useEffect } from "react";
import {
  X,
  CalendarDays,
  BarChart3,
  ListChecks,
  CheckCircle2,
  Frown,
} from "lucide-react";
import { KRITERIA } from "../data/basis-pengetahuan.js";

export default function ModalDetailKonsultasi({ isOpen, onClose, konsultasi }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !konsultasi) return null;

  const formatTanggal = (isoString) => {
    return new Date(isoString).toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getConfidenceProgressColor = (persentase) => {
    if (persentase >= 80) return "bg-green-500";
    if (persentase >= 60) return "bg-sky-500";
    if (persentase >= 40) return "bg-amber-500";
    return "bg-slate-500";
  };

  const getConfidenceColor = (persentase) => {
    if (persentase >= 80) return "text-green-600 dark:text-green-400";
    if (persentase >= 60) return "text-sky-600 dark:text-sky-400";
    if (persentase >= 40) return "text-amber-600 dark:text-amber-400";
    return "text-slate-600 dark:text-slate-400";
  };

  const getConfidenceBg = (persentase) => {
    if (persentase >= 80) return "bg-green-500/10";
    if (persentase >= 60) return "bg-sky-500/10";
    if (persentase >= 40) return "bg-amber-500/10";
    return "bg-slate-500/10";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-card shadow-2xl rounded-xl border border-border transition-all">
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Detail Konsultasi
              </h3>
              <p className="text-sm  mt-1">
                {formatTanggal(konsultasi.tanggal)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2  hover:text-foreground transition-colors rounded-full hover:bg-muted"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 " />
              <h4 className="text-lg font-semibold text-foreground">
                Hasil Rekomendasi
              </h4>
            </div>
            <div className="space-y-4">
              {konsultasi.hasil && konsultasi.hasil.length > 0 ? (
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
                        className={`text-sm font-bold ${getConfidenceColor(
                          item.persentase
                        )}`}
                      >
                        {item.persentase}%
                      </span>
                    </div>
                    <p className="text-sm  mb-3">{item.deskripsi}</p>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ease-out ${getConfidenceProgressColor(
                          item.persentase
                        )}`}
                        style={{ width: `${item.persentase}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                  <Frown className="w-10 h-10  mx-auto mb-2" />
                  <p className="">Tidak ada rekomendasi</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <ListChecks className="w-5 h-5 " />
              <h4 className="text-lg font-semibold text-foreground">
                Jawaban Anda
              </h4>
            </div>
            <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
              {KRITERIA.map((kriteria) => {
                const jawaban = konsultasi.jawaban?.[kriteria.id];
                if (!jawaban) return null;

                return (
                  <div
                    key={kriteria.id}
                    className="p-3 bg-muted/50 rounded-lg border border-border"
                  >
                    <h6 className="text-sm font-medium  mb-1">
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

        <div className="mt-auto p-6 border-t border-border flex items-center justify-between flex-shrink-0">
          <div className="text-xs  font-mono">ID: {konsultasi.id}</div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
