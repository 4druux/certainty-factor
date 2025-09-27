"use client";

import { useState, useEffect } from "react";
import { Eye, Trash2, Plus, FileText, Frown } from "lucide-react";
import { getRiwayatKonsultasi, hapusKonsultasi } from "@/lib/riwayat.js";
import ModalDetailKonsultasi from "../ModalDetailKonsultasi.jsx";
import CardContent from "@/components/ui/card-content.jsx";

export default function TabelRiwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const [konsultasiTerpilih, setKonsultasiTerpilih] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRiwayat();
  }, []);

  const loadRiwayat = () => {
    setIsLoading(true);
    const data = getRiwayatKonsultasi();
    setRiwayat(data);
    setIsLoading(false);
  };

  const handleLihatDetail = (konsultasi) => {
    setKonsultasiTerpilih(konsultasi);
    setModalTerbuka(true);
  };

  const handleHapusKonsultasi = (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus riwayat konsultasi ini? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      hapusKonsultasi(id);
      loadRiwayat();
    }
  };

  const formatTanggal = (isoString) => {
    return new Date(isoString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <CardContent>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Memuat Riwayat Konsultasi...
        </h2>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </CardContent>
    );
  }

  return (
    <>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <FileText className="w-6 h-6 mr-3 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Riwayat Konsultasi
            </h2>
          </div>
          <div className="text-sm font-medium  bg-muted px-3 py-1.5 rounded-md">
            Total: {riwayat.length} konsultasi
          </div>
        </div>

        {riwayat.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
            <Frown className="w-16 h-16 mx-auto mb-4 text-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Belum Ada Riwayat Tersimpan
            </h3>
            <p className=" mb-6 max-w-md mx-auto">
              Sepertinya Anda belum pernah melakukan konsultasi. Mulai sesi
              pertama Anda untuk melihat hasilnya di sini.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-2 bg-foreground text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Mulai Konsultasi Baru
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3.5 px-4 font-semibold ">
                    Tanggal
                  </th>
                  <th className="text-left py-3.5 px-4 font-semibold ">
                    Rekomendasi Teratas
                  </th>
                  <th className="text-left py-3.5 px-4 font-semibold ">
                    Tingkat Keyakinan
                  </th>
                  <th className="text-center py-3.5 px-4 font-semibold ">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {riwayat.map((konsultasi) => (
                  <tr
                    key={konsultasi.id}
                    className="hover:bg-muted/50 transition-colors"
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
                          <div className="text-xs ">
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
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${
                                konsultasi.rekomendasiUtama?.persentase || 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleLihatDetail(konsultasi)}
                          className="flex items-center p-2 text-sm  rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleHapusKonsultasi(konsultasi.id)}
                          className="flex items-center p-2 text-sm  rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          title="Hapus Konsultasi"
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
