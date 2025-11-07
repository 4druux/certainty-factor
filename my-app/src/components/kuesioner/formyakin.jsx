"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { KRITERIA } from "../../data/basis-yakin";
import { hitungRekomendasi, validasiJawaban } from "../../lib/logika-yakin";
import HasilRekomendasi from "./HasilRekomendasi.jsx";
import { ClipboardList, Loader2, Sparkle } from "lucide-react";
import { RiErrorWarningFill } from "react-icons/ri";
import CardContent from "../ui/card-content.jsx";

export default function Formyakin() {
  const [dataPengguna, setDataPengguna] = useState({
    nama: "",
    umur: "",
    alamat: "",
  });
  const [jawabanPengguna, setJawabanPengguna] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [hasilRekomendasi, setHasilRekomendasi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDataPenggunaChange = (e) => {
    const { name, value } = e.target;
    setDataPengguna((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (error) setError("");
  };

  const handleJawabanChange = (kriteriaId, jawaban) => {
    setJawabanPengguna((prev) => ({
      ...prev,
      [kriteriaId]: jawaban,
    }));
    if (fieldErrors[kriteriaId]) {
      setFieldErrors((prev) => ({ ...prev, [kriteriaId]: undefined }));
    }
    if (error) setError("");
  };

  const handleHitungRekomendasi = () => {
    setError("");
    setFieldErrors({});
    const newFieldErrors = {};

    if (!dataPengguna.nama) {
      newFieldErrors.nama = "Nama Lengkap wajib diisi.";
    }
    if (!dataPengguna.umur) {
      newFieldErrors.umur = "Umur wajib diisi.";
    } else {
      const umur = parseInt(dataPengguna.umur, 10);
      if (isNaN(umur) || umur <= 0) {
        newFieldErrors.umur = "Umur harus berupa angka yang valid.";
      }
    }
    if (!dataPengguna.alamat) {
      newFieldErrors.alamat = "Alamat wajib diisi.";
    }

    const jawabanUmurOtomatis = {
      G01:
        dataPengguna.umur && parseInt(dataPengguna.umur, 10) < 20
          ? "Sangat Yakin"
          : "Tidak",
      G02:
        dataPengguna.umur && parseInt(dataPengguna.umur, 10) > 35
          ? "Sangat Yakin"
          : "Tidak",
    };

    const jawabanLengkap = {
      ...jawabanPengguna,
      ...jawabanUmurOtomatis,
    };

    const kriteriaUntukValidasi = KRITERIA.filter(
      (k) => k.id !== "G01" && k.id !== "G02"
    );
    const validasi = validasiJawaban(jawabanPengguna, kriteriaUntukValidasi);

    if (!validasi.isValid) {
      validasi.missingQuestions.forEach((q) => {
        newFieldErrors[q.id] = "Jawaban wajib diisi.";
      });
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError("Mohon perbaiki kesalahan pada field yang ditandai.");
      return;
    }

    setIsLoading(true);
    setHasilRekomendasi(null);

    setTimeout(async () => {
      try {
        const hasil = hitungRekomendasi(jawabanLengkap);

        if (hasil && hasil.length >= 0) {
          const response = await fetch("/api/riwayat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dataDiri: dataPengguna,
              jawaban: jawabanLengkap,
              hasil: hasil,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error || "Gagal menyimpan data.";

            toast.error(errorMessage);
            setHasilRekomendasi(null);

            if (errorMessage.toLowerCase().includes("alamat")) {
              setFieldErrors((prev) => ({
                ...prev,
                alamat: errorMessage,
              }));
            } else {
              setError(errorMessage);
            }
            return;
          }

          setHasilRekomendasi(hasil);
        } else {
          setHasilRekomendasi(hasil);
        }
      } catch (err) {
        setHasilRekomendasi(null);
        const networkErrorMessage = err.message || "Terjadi kesalahan koneksi.";
        toast.error("Koneksi gagal: " + networkErrorMessage);
        setError("Koneksi ke server gagal. Periksa jaringan Anda.");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleReset = () => {
    setDataPengguna({ nama: "", umur: "", alamat: "" });
    setJawabanPengguna({});
    setHasilRekomendasi(null);
    setError("");
    setFieldErrors({});
  };

  const handleAutofill = () => {
    setDataPengguna({
      nama: "Nama Tes",
      umur: Math.floor(Math.random() * (50 - 15 + 1)) + 15,
      alamat: "Alamat Tes",
    });

    const autoAnswers = {};
    KRITERIA.filter((k) => k.id !== "G01" && k.id !== "G02").forEach(
      (kriteria) => {
        if (kriteria.pilihan && kriteria.pilihan.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * kriteria.pilihan.length
          );
          autoAnswers[kriteria.id] = kriteria.pilihan[randomIndex];
        }
      }
    );

    setJawabanPengguna(autoAnswers);
    setHasilRekomendasi(null);
    setError("");
    setFieldErrors({});
  };

  const renderPertanyaan = (kriteria) => {
    const nilai = jawabanPengguna[kriteria.id] || "";
    const isError = !!fieldErrors[kriteria.id];

    return (
      <div
        key={kriteria.id}
        className={`p-4 md:p-6 border rounded-xl transition-colors ${
          isError ? "border-red-500/50" : "border-border"
        }`}
      >
        <label className="block text-md md:text-lg font-medium mb-2 md:mb-4">
          {kriteria.pertanyaan}
        </label>
        <select
          value={nilai}
          onChange={(e) => handleJawabanChange(kriteria.id, e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-1 transition-colors text-neutral-700 dark:text-neutral-300 ${
            isError
              ? "border-red-500 focus:ring-red-500"
              : "border-border focus:ring-sky-500"
          }`}
        >
          <option value="">-- Pilih jawaban --</option>
          {kriteria.pilihan.map((pilihan) => (
            <option key={pilihan} value={pilihan}>
              {pilihan}
            </option>
          ))}
        </select>
        {isError && (
          <p className="text-red-500 text-sm mt-2">
            {fieldErrors[kriteria.id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <CardContent>
      <div className="space-y-4 md:space-y-6">
        <div className="rounded-lg border-l-4 border-sky-400 bg-sky-50 p-4 md:p-6 dark:border-sky-600 dark:bg-sky-950/30">
          <div className="flex flex-col items-start">
            <h2 className="text-md md:text-xl font-semibold text-sky-800 dark:text-sky-500">
              Petunjuk Pengisian
            </h2>
            <p className="text-xs md:text-sm text-sky-700 dark:text-sky-400">
              Isi data diri Anda, lalu jawab semua pertanyaan berikut dengan
              jujur.
            </p>
          </div>
        </div>

        <div className="space-y-4 p-4 md:p-6 border border-border rounded-xl">
          <h3 className="text-lg md:text-xl font-semibold">Data Diri</h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="nama"
                className="block text-sm font-medium mb-1 dark:text-neutral-200"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={dataPengguna.nama}
                onChange={handleDataPenggunaChange}
                className={`w-full p-3 border rounded-lg focus:ring-1 transition-colors text-neutral-700 dark:text-neutral-300 ${
                  fieldErrors.nama
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-sky-500"
                }`}
                placeholder="Masukkan nama Anda"
              />
              {fieldErrors.nama && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.nama}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="umur"
                className="block text-sm font-medium mb-1 dark:text-neutral-200"
              >
                Umur
              </label>
              <input
                type="number"
                id="umur"
                name="umur"
                value={dataPengguna.umur}
                onChange={handleDataPenggunaChange}
                className={`w-full p-3 border rounded-lg focus:ring-1 transition-colors text-neutral-700 dark:text-neutral-300 ${
                  fieldErrors.umur
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-sky-500"
                }`}
                placeholder="Contoh: 25"
              />
              {fieldErrors.umur && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.umur}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="alamat"
                className="block text-sm font-medium mb-1 dark:text-neutral-200"
              >
                Alamat
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={dataPengguna.alamat}
                onChange={handleDataPenggunaChange}
                className={`w-full p-3 border rounded-lg focus:ring-1 transition-colors text-neutral-700 dark:text-neutral-300 ${
                  fieldErrors.alamat
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-sky-500"
                }`}
                placeholder="Masukkan alamat Anda"
              />
              {fieldErrors.alamat && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.alamat}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {KRITERIA.filter((k) => k.id !== "G01" && k.id !== "G02").map(
            renderPertanyaan
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg dark:bg-red-950/30 dark:border-red-700 dark:text-red-300">
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
          {(hasilRekomendasi ||
            Object.keys(jawabanPengguna).length > 0 ||
            dataPengguna.nama) && (
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
            className="bg-sky-600 dark:bg-sky-700/50 dark:hover:bg-sky-800 hover:bg-sky-700 disabled:bg-sky-400 text-white text-sm md:text-md w-full font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
