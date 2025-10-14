"use client";

import { useState, useMemo } from "react";
import { useRiwayat } from "@/lib/hooks";
import { Eye, Trash2, Plus, FileText, Frown, Calendar } from "lucide-react";
import ModalDetailKonsultasi from "../ModalDetailKonsultasi.jsx";
import CardContent from "@/components/ui/card-content.jsx";
import { getConfidenceProgressColor } from "@/lib/utils";

const SkeletonLoader = () => (
  <CardContent>
    <div className="flex items-center justify-between mb-4">
      <div className="h-7 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
      <div className="h-7 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
    </div>
    <div className="space-y-2 md:hidden">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="p-4 border border-border rounded-xl animate-pulse"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="h-4 w-48 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            </div>
            <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          </div>
          <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
        </div>
      ))}
    </div>
    <div className="overflow-x-auto hidden md:block">
      <div className="w-full text-sm">
        <div className="flex border-b border-border">
          <div className="py-3.5 px-4 flex-1">
            <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          </div>
          <div className="py-3.5 px-4 flex-[2]">
            <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          </div>
          <div className="py-3.5 px-4 flex-[2]">
            <div className="h-5 w-36 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          </div>
          <div className="py-3.5 px-4 w-28 text-center">
            <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
        <div className="divide-y divide-border">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="py-4 px-4 flex-1">
                <div className="h-5 w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>
              <div className="py-4 px-4 flex-[2]">
                <div className="h-5 w-4/5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>
              <div className="py-4 px-4 flex-[2]">
                <div className="h-5 w-4/5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>
              <div className="py-4 px-4 w-28 text-center">
                <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </CardContent>
);

export default function TabelRiwayat() {
  const { riwayat: dataRiwayat, isLoading, mutate } = useRiwayat();
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const [konsultasiTerpilih, setKonsultasiTerpilih] = useState(null);

  const riwayat = useMemo(() => {
    if (!dataRiwayat) return [];
    return dataRiwayat.map((item) => ({
      ...item,
      tanggal: item.createdAt,
      rekomendasiUtama:
        Array.isArray(item.hasil) && item.hasil.length > 0
          ? item.hasil[0]
          : null,
    }));
  }, [dataRiwayat]);

  const handleLihatDetail = (konsultasi) => {
    setKonsultasiTerpilih(konsultasi);
    setModalTerbuka(true);
  };

  const handleHapusKonsultasi = async (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus riwayat konsultasi ini?"
      )
    ) {
      try {
        const response = await fetch(`/api/riwayat/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Gagal menghapus data");
        mutate();
      } catch (error) {
        console.error("Gagal menghapus riwayat:", error);
      }
    }
  };

  const formatTanggal = (isoString) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading && !dataRiwayat) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <CardContent>
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
            <h2 className="text-md md:text-2xl font-semibold text-foreground">
              Riwayat Konsultasi
            </h2>
          </div>
          <div className="text-xs font-medium bg-black/10 dark:bg-white/10 px-2 py-1 md:px-4 md:py-2 backdrop-blur-xl rounded-full inline-block">
            {riwayat.length} konsultasi
          </div>
        </div>

        {riwayat.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
            <Frown className="w-16 h-16 mx-auto mb-4 text-foreground" />
            <h3 className="text-md md:text-lg font-semibold text-foreground mb-2">
              Belum Ada Riwayat Tersimpan
            </h3>
            <p className="text-xs md:text-sm mb-6 max-w-md mx-auto">
              Mulai sesi konsultasi pertama Anda untuk melihat hasilnya di sini.
            </p>
            <a
              href="/"
              className="text-sm md:text-md inline-flex items-center px-6 py-2 bg-foreground text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Mulai Konsultasi Baru
            </a>
          </div>
        ) : (
          <div>
            <div className="space-y-2 md:hidden">
              {riwayat.map((konsultasi) => (
                <div
                  key={konsultasi.id}
                  onClick={() => handleLihatDetail(konsultasi)}
                  className="p-4 border border-border rounded-xl bg-background transition-colors active:bg-neutral-200 dark:bg-neutral-700/50 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {konsultasi.rekomendasiUtama?.nama ||
                          "Tidak ada rekomendasi"}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatTanggal(konsultasi.tanggal)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHapusKonsultasi(konsultasi.id);
                      }}
                      className="p-2 -m-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Keyakinan</span>
                      <span className="font-semibold text-foreground">
                        {konsultasi.rekomendasiUtama?.persentase || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${getConfidenceProgressColor(
                          konsultasi.rekomendasiUtama?.persentase || 0
                        )}`}
                        style={{
                          width: `${
                            konsultasi.rekomendasiUtama?.persentase || 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3.5 px-4 font-semibold">
                      Tanggal
                    </th>
                    <th className="text-left py-3.5 px-4 font-semibold">
                      Rekomendasi Teratas
                    </th>
                    <th className="text-left py-3.5 px-4 font-semibold">
                      Tingkat Keyakinan
                    </th>
                    <th className="text-center py-3.5 px-4 font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {riwayat.map((konsultasi) => (
                    <tr
                      key={konsultasi.id}
                      onClick={() => handleLihatDetail(konsultasi)}
                      className="hover:bg-neutral-200 dark:bg-neutral-700/50 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-4 text-foreground whitespace-nowrap">
                        {formatTanggal(konsultasi.tanggal)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">
                              {konsultasi.rekomendasiUtama?.nama ||
                                "Tidak ada rekomendasi"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {konsultasi.hasil?.length || 0} opsi ditemukan
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-foreground w-10 text-right">
                            {konsultasi.rekomendasiUtama?.persentase || 0}%
                          </div>
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full ${getConfidenceProgressColor(
                                konsultasi.rekomendasiUtama?.persentase || 0
                              )}`}
                              style={{
                                width: `${
                                  konsultasi.rekomendasiUtama?.persentase || 0
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLihatDetail(konsultasi);
                            }}
                            title="Lihat Detail"
                            className="p-2 hover:text-primary"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHapusKonsultasi(konsultasi.id);
                            }}
                            title="Hapus Konsultasi"
                            className="p-2 hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>

      <ModalDetailKonsultasi
        isOpen={modalTerbuka}
        onClose={() => setModalTerbuka(false)}
        konsultasi={konsultasiTerpilih}
      />
    </>
  );
}
