"use client";

import { useState } from "react";
import { KRITERIA } from "../../data/basis-pengetahuan.js";
import { hitungRekomendasi, validasiJawaban } from "../../lib/logika-cf.js";
import HasilRekomendasi from "./HasilRekomendasi.jsx";
import { ClipboardList, Loader2, Sparkle } from "lucide-react";
import { RiErrorWarningFill } from "react-icons/ri";
import CardContent from "../ui/card-content.jsx";

export default function FormulirKuesioner() {
  const [jawabanPengguna, setJawabanPengguna] = useState({});
  const [hasilRekomendasi, setHasilRekomendasi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJawabanChange = (kriteriaId, jawaban) => {
    setJawabanPengguna((prev) => ({
      ...prev,
      [kriteriaId]: jawaban,
    }));
    if (error) setError("");
  };

  const handleHitungRekomendasi = () => {
    const validasi = validasiJawaban(jawabanPengguna, KRITERIA);

    if (!validasi.isValid) {
      const pertanyaanKosong = validasi.missingQuestions
        .map((q) => `"${q.pertanyaan}"`)
        .join(", ");
      setError(`Mohon lengkapi jawaban untuk pertanyaan: ${pertanyaanKosong}`);
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(async () => {
      try {
        const hasil = hitungRekomendasi(jawabanPengguna);
        setHasilRekomendasi(hasil);

        if (hasil && hasil.length >= 0) {
          // Kirim meski tidak ada rekomendasi
          await fetch("/api/riwayat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ jawaban: jawabanPengguna, hasil: hasil }),
          });
        }
      } catch (err) {
        setError("Terjadi kesalahan dalam perhitungan atau penyimpanan.");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleReset = () => {
    setJawabanPengguna({});
    setHasilRekomendasi(null);
    setError("");
  };

  const handleAutofill = () => {
    const autoAnswers = {};
    KRITERIA.forEach((kriteria) => {
      if (kriteria.pilihan && kriteria.pilihan.length > 0) {
        const randomIndex = Math.floor(Math.random() * kriteria.pilihan.length);
        autoAnswers[kriteria.id] = kriteria.pilihan[randomIndex];
      }
    });

    setJawabanPengguna(autoAnswers);
    setHasilRekomendasi(null);
    setError("");
  };

  const renderPertanyaan = (kriteria) => {
    const nilai = jawabanPengguna[kriteria.id] || "";
    return (
      <div
        key={kriteria.id}
        className="p-4 md:p-6 border border-border rounded-xl"
      >
        <label className="block text-md md:text-lg font-medium mb-2 md:mb-4">
          {kriteria.pertanyaan}
        </label>
        {kriteria.tipe === "radio" ? (
          <div className="space-y-3">
            {kriteria.pilihan.map((pilihan) => (
              <label
                key={pilihan}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name={kriteria.id}
                  value={pilihan}
                  checked={nilai === pilihan}
                  onChange={(e) =>
                    handleJawabanChange(kriteria.id, e.target.value)
                  }
                  className="w-3 h-3 md:w-4 md:h-4 accent-indigo-600"
                />
                <span className="ml-1 md:ml-3 text-sm md:text-md text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-200 transition-colors">
                  {pilihan}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <select
            value={nilai}
            onChange={(e) => handleJawabanChange(kriteria.id, e.target.value)}
            className="w-full p-3 border border-border rounded-lg focus:ring-1 focus:ring-indigo-500 transition-colors text-neutral-700 dark:text-neutral-300"
          >
            <option value="">-- Pilih jawaban --</option>
            {kriteria.pilihan.map((pilihan) => (
              <option key={pilihan} value={pilihan}>
                {pilihan}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

  return (
    <CardContent>
      <div className="space-y-4 md:space-y-6">
        <div className="rounded-lg border-l-4 border-indigo-400 bg-indigo-50 p-4 md:p-6 dark:border-indigo-600 dark:bg-indigo-950/30">
          <div className="flex flex-col items-start">
            <h2 className="text-md md:text-xl font-semibold text-indigo-800 dark:text-indigo-500">
              Petunjuk Pengisian
            </h2>
            <p className="text-xs md:text-sm text-indigo-700 dark:text-indigo-400">
              Jawab semua pertanyaan berikut dengan jujur dan sesuai kondisi
              Anda saat ini.
            </p>
          </div>
        </div>

        <div className="space-y-6">{KRITERIA.map(renderPertanyaan)}</div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <RiErrorWarningFill className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {process.env.NODE_ENV === "development" && (
          <button
            onClick={handleAutofill}
            className="w-full py-2 text-sm md:text-md border border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors duration-200 flex items-center justify-center"
            title="Hanya untuk development"
          >
            <Sparkle className="w-5 h-5 mr-2" />
            Isi Otomatis
          </button>
        )}

        <div className="flex items-center justify-center gap-2">
          {(hasilRekomendasi || Object.keys(jawabanPengguna).length > 0) && (
            <button
              onClick={handleReset}
              className="py-3 w-1/2 border border-border font-semibold rounded-lg text-sm md:text-md dark:hover:bg-neutral-800 hover:bg-neutral-100 transition-colors duration-200"
            >
              Reset
            </button>
          )}

          <button
            onClick={handleHitungRekomendasi}
            disabled={isLoading}
            className="bg-indigo-600 dark:bg-indigo-700/50 dark:hover:bg-indigo-800 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm md:text-md w-full font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Menganalisis...
              </>
            ) : (
              <>
                <ClipboardList className="w-5 h-5 mr-2" />
                Lihat Rekomendasi
              </>
            )}
          </button>
        </div>

        {hasilRekomendasi && <HasilRekomendasi hasil={hasilRekomendasi} />}
      </div>
    </CardContent>
  );
}
