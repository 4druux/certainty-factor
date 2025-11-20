"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ClipboardList, Frown } from "lucide-react";
import { RiErrorWarningFill } from "react-icons/ri";
import CardContent from "@/components/ui/card-content";
import KriteriaModal from "./KriteriaModal";
import DeleteKriteriaModal from "./DeleteKriteriaModal";
import KriteriaSkeletonLoader from "./KriteriaSkeletonLoader";

export default function KriteriaTable() {
  const [kriteriaList, setKriteriaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKriteria, setModalKriteria] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [kriteriaToDelete, setKriteriaToDelete] = useState(null);

  const fetchKriteria = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/kriteria");
      if (!res.ok) throw new Error("Gagal mengambil data kriteria.");
      const data = await res.json();
      setKriteriaList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKriteria();
  }, []);

  const handleOpenModal = (kriteria = null) => {
    setModalKriteria(kriteria);
    setIsModalOpen(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalKriteria(null);
  };

  const handleSubmitKriteria = async (formData, isEditMode) => {
    setIsSubmitting(true);
    setError(null);

    const url = isEditMode ? `/api/kriteria/${formData.id}` : "/api/kriteria";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(
          result.error ||
            `Gagal ${isEditMode ? "memperbarui" : "menyimpan"} kriteria.`
        );
      }

      await fetchKriteria();
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowDelete = (kriteria) => {
    setKriteriaToDelete(kriteria);
    setShowDeleteConfirm(true);
    setError(null);
  };

  const handleHideDelete = () => {
    setKriteriaToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleDeleteKriteria = async () => {
    if (!kriteriaToDelete) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/kriteria/${kriteriaToDelete.id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Gagal menghapus kriteria.");
      }

      await fetchKriteria();
      handleHideDelete();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && kriteriaList.length === 0) {
    return <KriteriaSkeletonLoader />;
  }

  return (
    <>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <ClipboardList className="w-5 h-5 md:w-6 md:h-6" />
            <h2 className="text-md md:text-xl font-semibold text-foreground">
              Manajemen Kriteria
            </h2>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="inline-flex items-center px-4 py-2 bg-foreground text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm text-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tambah Kriteria
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <div className="flex items-center">
              <RiErrorWarningFill className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {kriteriaList.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
            <Frown className="w-16 h-16 mx-auto mb-4 text-foreground" />
            <h3 className="text-md md:text-lg font-semibold text-foreground mb-2">
              Belum Ada Kriteria
            </h3>
            <p className="text-xs md:text-sm mb-6 max-w-md mx-auto">
              Data kriteria masih kosong. Mulai tambahkan data pertama Anda.
            </p>
            <button
              onClick={() => handleOpenModal(null)}
              className="text-sm md:text-md inline-flex items-center px-6 py-2 bg-foreground text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Tambah Kriteria
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-2 md:hidden">
              {kriteriaList.map((kriteria) => (
                <div
                  key={kriteria.id}
                  className="p-4 border border-border rounded-xl bg-background"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-mono text-sm text-foreground font-medium">
                        {kriteria.id}
                      </p>
                      <h3 className="font-semibold text-foreground">
                        {kriteria.pertanyaan}
                      </h3>
                      <p className="text-xs">
                        <span className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 px-2 py-0.5 rounded-full font-medium">
                          {kriteria.tipe}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 -mr-2">
                      <button
                        onClick={() => handleOpenModal(kriteria)}
                        className="p-2 text-muted-foreground hover:text-primary"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShowDelete(kriteria)}
                        className="p-2 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3.5 px-4 font-semibold w-20">
                      ID
                    </th>
                    <th className="text-left py-3.5 px-4 font-semibold">
                      Pertanyaan
                    </th>
                    <th className="text-left py-3.5 px-4 font-semibold w-32">
                      Tipe
                    </th>
                    <th className="text-right py-3.5 px-4 font-semibold w-28">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {kriteriaList.map((kriteria) => (
                    <tr
                      key={kriteria.id}
                      className="hover:bg-background transition-colors"
                    >
                      <td className="py-4 px-4 text-foreground whitespace-nowrap font-mono">
                        {kriteria.id}
                      </td>
                      <td className="py-4 px-4 text-foreground max-w-md">
                        {kriteria.pertanyaan}
                      </td>
                      <td className="py-4 px-4 text-foreground whitespace-nowrap">
                        <span className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 px-2 py-0.5 rounded-full text-xs font-medium">
                          {kriteria.tipe}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2 text-muted-foreground">
                          <button
                            onClick={() => handleOpenModal(kriteria)}
                            title="Edit"
                            className="p-2 hover:text-primary"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleShowDelete(kriteria)}
                            title="Hapus"
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

      <KriteriaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitKriteria}
        kriteria={modalKriteria}
        isLoading={isSubmitting}
      />

      <DeleteKriteriaModal
        isOpen={showDeleteConfirm}
        onClose={handleHideDelete}
        onSubmit={handleDeleteKriteria}
        kriteriaToDelete={kriteriaToDelete}
        isLoading={isSubmitting}
        error={error}
      />
    </>
  );
}
