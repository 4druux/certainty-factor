"use client";

import KuesionerHeader from "@/components/kuesioner/kuesioner-header";
import Formyakin from "@/components/kuesioner/formyakin";

export default function FormulirPage() {
  return (
    <div className="bg-background md:p-8">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 px-4">
        <KuesionerHeader />
        <Formyakin />
      </div>
    </div>
  );
}
