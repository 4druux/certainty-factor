"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { hitungRekomendasi, validasiJawaban } from "../../lib/logika-yakin.js";
import HasilRekomendasi from "./HasilRekomendasi.jsx";
import { ClipboardList, Loader2, Sparkle, BookOpenCheck } from "lucide-react";
import { RiErrorWarningFill } from "react-icons/ri";
import CardContent from "../ui/card-content.jsx";
import DotLoader from "../ui/dot-loader.jsx";

export default function FormulirKuesioner() {
  const [dataPengguna, setDataPengguna] = useState({
    nama: "",
    umur: "",
    alamat: "",
  });
  const [jawabanPengguna, setJawabanPengguna] = useState({});
  const [hasilRekomendasi, setHasilRekomendasi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [kriteria, setKriteria] = useState([]);
  const [jenisKb, setJenisKb] = useState([]);
  const [aturanCf, setAturanCf] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsDataLoading(true);
        setError("");

        const [kriteriaRes, jenisKbRes, aturanCfRes] = await Promise.all([
          fetch("/api/kriteria"),
          fetch("/api/jenis-kb"),
          fetch("/api/aturan-cf"),
        ]);

        if (!kriteriaRes.ok) throw new Error("Gagal memuat kriteria");
        if (!jenisKbRes.ok) throw new Error("Gagal memuat jenis KB");
        if (!aturanCfRes.ok) throw new Error("Gagal memuat aturan CF");

        const kriteriaData = await kriteriaRes.json();
        const jenisKbData = await jenisKbRes.json();
        const aturanCfData = await aturanCfRes.json();

        setKriteria(kriteriaData);
        setJenisKb(jenisKbData);
        setAturanCf(aturanCfData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Terjadi kesalahan saat memuat data.");
      } finally {
        setIsDataLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDataPenggunaChange = (e) => {
    const { name, value } = e.target;
    setDataPengguna((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name])
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    if (error) setError("");
  };

  const handleJawabanChange = (kriteriaId, jawaban) => {
    setJawabanPengguna((prev) => ({ ...prev, [kriteriaId]: jawaban }));
    if (fieldErrors[kriteriaId])
      setFieldErrors((prev) => ({ ...prev, [kriteriaId]: undefined }));
    if (error) setError("");
  };

  const handleIsiSesuaiSkripsi = () => {
    setDataPengguna({
      nama: "Pengguna Studi Kasus",
      umur: "19",
      alamat: "Jl. Skripsi No. 1",
    });

    const jawabanSkripsi = {
      G01: "Sangat Yakin", // User: 1.0
      G02: "Tidak", // User: 0.0
      G03: "Tidak", // User: 0.0
      G04: "Sangat Yakin", // User: 1.0
      G05: "Kurang Yakin", // User: 0.4
      G06: "Tidak Tahu", // User: 0.2
      G07: "Kurang Yakin", // User: 0.4
      G08: "Tidak Tahu", // User: 0.2
      G09: "Cukup Yakin", // User: 0.6
      G10: "Cukup Yakin", // User: 0.6
      G11: "Kurang Yakin", // User: 0.4
      G12: "Tidak", // User: 0.0
      G13: "Yakin", // User: 0.8
      G14: "Cukup Yakin", // User: 0.6
      G15: "Yakin", // User: 0.8
      G16: "Yakin", // User: 0.8
      G17: "Sangat Yakin", // User: 1.0
      G18: "Tidak Tahu", // User: 0.2
      G19: "Kurang Yakin", // User: 0.4
      G20: "Yakin", // User: 0.8
    };

    setJawabanPengguna(jawabanSkripsi);
    setHasilRekomendasi(null);
    setError("");
    setFieldErrors({});
    toast.success("Formulir diisi sesuai Data Uji Skripsi");
  };

  const handleHitungRekomendasi = () => {
    setError("");
    setFieldErrors({});
    const newFieldErrors = {};

    if (!dataPengguna.nama) newFieldErrors.nama = "Nama Lengkap wajib diisi.";
    if (!dataPengguna.umur) {
      newFieldErrors.umur = "Umur wajib diisi.";
    } else {
      const umur = parseInt(dataPengguna.umur, 10);
      if (isNaN(umur) || umur <= 0) newFieldErrors.umur = "Umur harus valid.";
    }
    if (!dataPengguna.alamat) newFieldErrors.alamat = "Alamat wajib diisi.";

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

    const kriteriaUntukValidasi = kriteria.filter(
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
      setError("Mohon lengkapi semua pertanyaan.");
      return;
    }

    setIsLoading(true);
    setHasilRekomendasi(null);

    setTimeout(async () => {
      try {
        const hasil = hitungRekomendasi(jawabanLengkap, aturanCf, jenisKb);

        if (hasil && hasil.length >= 0) {
          await fetch("/api/riwayat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              dataDiri: dataPengguna,
              jawaban: jawabanLengkap,
              hasil: hasil,
            }),
          });
          setHasilRekomendasi(hasil);
        } else {
          setHasilRekomendasi([]);
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("Terjadi kesalahan perhitungan.");
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

  const renderPertanyaan = (kriteriaItem) => {
    const nilai = jawabanPengguna[kriteriaItem.id] || "";
    const pilihanList = Array.isArray(kriteriaItem.pilihan)
      ? kriteriaItem.pilihan
      : [];
    const isError = !!fieldErrors[kriteriaItem.id];

    return (
      <div
        key={kriteriaItem.id}
        className={`p-4 md:p-6 border rounded-xl transition-colors ${
          isError ? "border-red-500/50" : "border-border"
        }`}
      >
        <div className="flex justify-between">
          <label className="block text-md md:text-lg font-medium mb-2 md:mb-4">
            <span className="mr-2 font-bold text-sky-600">
              {kriteriaItem.id}
            </span>
            {kriteriaItem.pertanyaan}
          </label>
        </div>

        {kriteriaItem.tipe === "radio" ? (
          <div className="space-y-2">
            {pilihanList.map((pilihan) => (
              <label
                key={pilihan}
                className="flex items-center cursor-pointer group p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <input
                  type="radio"
                  name={kriteriaItem.id}
                  value={pilihan}
                  checked={nilai === pilihan}
                  onChange={(e) =>
                    handleJawabanChange(kriteriaItem.id, e.target.value)
                  }
                  className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                />
                <span className="ml-3 text-sm md:text-md text-neutral-700 dark:text-neutral-300">
                  {pilihan}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <select
            value={nilai}
            onChange={(e) =>
              handleJawabanChange(kriteriaItem.id, e.target.value)
            }
            className="w-full p-3 border rounded-lg"
          >
            <option value="">-- Pilih jawaban --</option>
            {pilihanList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        )}
        {isError && (
          <p className="text-red-500 text-sm mt-2">
            {fieldErrors[kriteriaItem.id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <CardContent>
      <div className="space-y-6">
        <div className="rounded-lg border-l-4 border-sky-400 bg-sky-50 p-4 md:p-6 dark:border-sky-600 dark:bg-sky-950/30">
          <h2 className="text-md md:text-xl font-semibold text-sky-800 dark:text-sky-500">
            Petunjuk Pengisian
          </h2>
          <p className="text-xs md:text-sm text-sky-700 dark:text-sky-400 mt-1">
            Isi data diri Anda, lalu jawab pertanyaan gejala yang muncul. Sistem
            akan menghitung rekomendasi berdasarkan metode Certainty Factor.
          </p>
        </div>

        {isDataLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <DotLoader text="Memuat Pertanyaan..." />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <RiErrorWarningFill className="w-5 h-5 mr-2" />
            {error}
          </div>
        ) : (
          <>
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleIsiSesuaiSkripsi}
                className="flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                title="Isi otomatis sesuai studi kasus Skripsi"
              >
                <BookOpenCheck className="w-4 h-4 mr-2" />
                Isi Data Uji Skripsi
              </button>

              {process.env.NODE_ENV === "development" && (
                <button
                  onClick={() => {
                    setDataPengguna({
                      nama: "Test Random",
                      umur: "25",
                      alamat: "Test",
                    });
                  }}
                  className="flex items-center px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors"
                >
                  <Sparkle className="w-4 h-4 mr-2" />
                  Isi Random
                </button>
              )}
            </div>

            <div className="space-y-4 p-4 md:p-6 border border-border rounded-xl bg-neutral-50/50 dark:bg-neutral-900/50">
              <h3 className="text-lg font-semibold">Data Diri</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={dataPengguna.nama}
                    onChange={handleDataPenggunaChange}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                    placeholder="Nama Anda"
                  />
                  {fieldErrors.nama && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.nama}
                    </p>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Umur (Tahun)
                  </label>
                  <input
                    type="number"
                    name="umur"
                    value={dataPengguna.umur}
                    onChange={handleDataPenggunaChange}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                    placeholder="Contoh: 25"
                  />
                  {fieldErrors.umur && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.umur}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Alamat
                  </label>
                  <input
                    type="text"
                    name="alamat"
                    value={dataPengguna.alamat}
                    onChange={handleDataPenggunaChange}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                    placeholder="Alamat Lengkap"
                  />
                  {fieldErrors.alamat && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.alamat}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {kriteria
                .filter((k) => k.id !== "G01" && k.id !== "G02")
                .map(renderPertanyaan)}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              {(hasilRekomendasi ||
                Object.keys(jawabanPengguna).length > 0) && (
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 border border-neutral-300 dark:border-neutral-700 font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Reset
                </button>
              )}

              <button
                onClick={handleHitungRekomendasi}
                disabled={isLoading}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <ClipboardList className="w-5 h-5 mr-2" />
                    Lihat Hasil Rekomendasi
                  </>
                )}
              </button>
            </div>

            {/* Hasil */}
            {hasilRekomendasi && <HasilRekomendasi hasil={hasilRekomendasi} />}
          </>
        )}
      </div>
    </CardContent>
  );
}
