import { Stethoscope } from "lucide-react";
import CardContent from "@/components/ui/card-content";

export default function KuesionerHeader() {
  return (
    <CardContent>
      <div className="flex items-start md:items-center justify-between gap-2">
        <div>
          <h1 className="text-md md:text-xl text-foreground font-semibold mb-1">
            Sistem Pakar Pemilihan Jenis KB
          </h1>

          <p className="text-xs md:text-sm md:leading-relaxed max-w-2xl mx-auto">
            Sistem ini akan membantu Anda menemukan jenis KB (Keluarga
            Berencana) yang paling sesuai dengan kondisi kesehatan dan kebutuhan
            Anda menggunakan metode{" "}
            <span className="font-semibold text-sky-600">
              Certainty Factor.
            </span>
          </p>
          <p className="bg-sky-200 dark:bg-sky-600/20 text-xs font-semibold text-sky-800 dark:text-sky-300 px-2 py-1 md:px-4 md:py-2 rounded-full inline-block mt-2">
            Klinik Annisa Medika Serpong
          </p>
        </div>

        <div className="hidden md:block">
          <Stethoscope className="w-20 h-20 text-foreground" />
        </div>
      </div>
    </CardContent>
  );
}
