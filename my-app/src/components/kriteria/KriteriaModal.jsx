"use client";

import { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";

const DEFAULT_PILIHAN_JAWABAN = [
  "Sangat Yakin",
  "Yakin",
  "Cukup Yakin",
  "Kurang Yakin",
  "Tidak Tahu",
  "Tidak",
];

export default function KriteriaModal({
  isOpen,
  onClose,
  onSubmit,
  kriteria,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    id: "",
    pertanyaan: "",
    tipe: "radio",
    pilihan: DEFAULT_PILIHAN_JAWABAN,
  });
  const [pilihanString, setPilihanString] = useState(
    DEFAULT_PILIHAN_JAWABAN.join(", ")
  );

  const isEditMode = !!kriteria;

  useEffect(() => {
    if (isEditMode && kriteria) {
      setFormData({
        id: kriteria.id,
        pertanyaan: kriteria.pertanyaan,
        tipe: kriteria.tipe,
        pilihan: Array.isArray(kriteria.pilihan) ? kriteria.pilihan : [],
      });
      setPilihanString(
        Array.isArray(kriteria.pilihan) ? kriteria.pilihan.join(", ") : ""
      );
    } else {
      setFormData({
        id: "",
        pertanyaan: "",
        tipe: "radio",
        pilihan: DEFAULT_PILIHAN_JAWABAN,
      });
      setPilihanString(DEFAULT_PILIHAN_JAWABAN.join(", "));
    }
  }, [isOpen, kriteria, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePilihanChange = (e) => {
    const { value } = e.target;
    setPilihanString(value);
    const pilihanArray = value
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p);
    setFormData((prev) => ({ ...prev, pilihan: pilihanArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, isEditMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Edit Kriteria" : "Tambah Kriteria"}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium mb-1">
              ID Kriteria (e.g., G01, G21)
            </label>
            <input
              type="text"
              name="id"
              id="id"
              value={formData.id}
              onChange={handleChange}
              disabled={isEditMode}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50"
              placeholder="G21"
            />
          </div>
          <div>
            <label
              htmlFor="pertanyaan"
              className="block text-sm font-medium mb-1"
            >
              Pertanyaan
            </label>
            <textarea
              name="pertanyaan"
              id="pertanyaan"
              rows="3"
              value={formData.pertanyaan}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Apakah Anda..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="tipe" className="block text-sm font-medium mb-1">
              Tipe Jawaban
            </label>
            <select
              name="tipe"
              id="tipe"
              value={formData.tipe}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="radio">Radio Button</option>
            </select>
          </div>
          <div>
            <label htmlFor="pilihan" className="block text-sm font-medium mb-1">
              Pilihan Jawaban (dipisah koma)
            </label>
            <textarea
              name="pilihan"
              id="pilihan"
              rows="3"
              value={pilihanString}
              onChange={handlePilihanChange}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Sangat Yakin, Yakin, Cukup Yakin, ..."
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors disabled:bg-sky-400 flex items-center"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
              {isEditMode ? "Simpan Perubahan" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
