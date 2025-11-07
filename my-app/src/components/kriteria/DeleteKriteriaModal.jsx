"use client";

import { Loader2, AlertTriangle } from "lucide-react";
import { RiErrorWarningFill } from "react-icons/ri";

export default function DeleteKriteriaModal({
  isOpen,
  onClose,
  onSubmit,
  kriteriaToDelete,
  isLoading,
  error,
}) {
  if (!isOpen || !kriteriaToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Hapus Kriteria?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Anda yakin ingin menghapus kriteria{" "}
            <strong>{kriteriaToDelete.id}</strong>?
            <br />
            Tindakan ini tidak dapat dibatalkan.
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-left">
              <div className="flex items-center">
                <RiErrorWarningFill className="w-5 h-5 mr-2" />
                {error}
              </div>
            </div>
          )}
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 rounded-lg border dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:bg-red-400 flex items-center"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
