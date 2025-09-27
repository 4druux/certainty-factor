"use client";

import { useState, useEffect } from "react";
import { Sunrise, Sun, Sunset, Moon, Stethoscope } from "lucide-react";
import CardContent from "../ui/card-content";

export default function SapaanDinamis() {
  const [waktuInfo, setWaktuInfo] = useState({
    pesan: "Selamat Datang",
    waktu: "Memuat waktu...",
    Icon: Sun,
  });

  useEffect(() => {
    const updateSapaan = () => {
      const sekarang = new Date();
      const jam = sekarang.getHours();

      let pesanSapaan = "";
      let IconWaktu = Sun;

      if (jam >= 5 && jam < 11) {
        pesanSapaan = "Selamat Pagi";
        IconWaktu = Sunrise;
      } else if (jam >= 11 && jam < 15) {
        pesanSapaan = "Selamat Siang";
        IconWaktu = Sun;
      } else if (jam >= 15 && jam < 18) {
        pesanSapaan = "Selamat Sore";
        IconWaktu = Sunset;
      } else {
        pesanSapaan = "Selamat Malam";
        IconWaktu = Moon;
      }

      setWaktuInfo({
        pesan: pesanSapaan,
        Icon: IconWaktu,
        waktu: sekarang.toLocaleString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    };

    updateSapaan();
    const interval = setInterval(updateSapaan, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CardContent>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl text-foreground font-medium mb-1 flex items-center gap-2">
            <waktuInfo.Icon className="w-8 h-8" />
            {waktuInfo.pesan}!
          </h1>
          <p className="text-foreground">
            Selamat datang di Sistem Pakar Pemilihan KB
          </p>
          <p className="text-sm mt-2 font-medium bg-black/10 dark:bg-white/10 px-3 py-2 backdrop-blur-xl rounded-full inline-block">
            {waktuInfo.waktu}
          </p>
        </div>

        <div className="hidden md:block">
          <Stethoscope className="w-20 h-20 text-foreground" />
        </div>
      </div>
    </CardContent>
  );
}
