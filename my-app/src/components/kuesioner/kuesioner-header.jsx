import { Stethoscope } from "lucide-react";
import CardContent from "@/components/ui/card-content";

export default function KuesionerHeader() {
  return (
    <CardContent>
      <div className="flex items-center justify-between">
          <div>
        <h1 className="text-2xl md:text-3xl text-foreground font-medium mb-1">
          Sistem Pakar Pemilihan Jenis KB
        </h1>

        <p className="text-sm leading-relaxed max-w-2xl mx-auto">
          Sistem ini akan membantu Anda menemukan jenis KB (Keluarga Berencana)
          yang paling sesuai dengan kondisi kesehatan dan kebutuhan Anda
          menggunakan metode{" "}
          <span className="font-semibold text-indigo-600">
            Certainty Factor.
          </span>
        </p>
        <div className="bg-indigo-200 dark:bg-indigo-600/20 text-white px-4 py-2 rounded-full inline-block mt-2">
          <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">
            Klinik Annisa Medika Serpong
          </span>
        </div>
        </div>

        <div className="hidden md:block">
          <Stethoscope className="w-20 h-20 text-foreground" />
        </div>
      </div>
    </CardContent>
  );
}
