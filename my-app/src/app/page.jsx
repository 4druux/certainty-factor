"use client";

import FormulirKuesioner from "@/components/kuesioner/FormulirKuesioner";
import KuesionerHeader from "@/components/kuesioner/kuesioner-header";

export default function Home() {
  return (
    <div className="bg-background md:p-8">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 px-4">
        <KuesionerHeader />
        <FormulirKuesioner />
      </div>
    </div>
  );
}
