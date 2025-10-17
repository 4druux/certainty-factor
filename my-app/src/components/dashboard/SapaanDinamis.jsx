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
      <div className="flex items-start md:items-center justify-between gap-2">
        <div>
          <h1 className="text-md md:text-xl text-foreground font-semibold mb-1 flex items-center gap-2">
            <waktuInfo.Icon className="w-5 h-5 md:w-8 md:h-8" />
            {waktuInfo.pesan}!
          </h1>
          <p className="text-xs md:text-md text-foreground ">
            Selamat datang di Sistem Pakar Pemilihan KB
          </p>
          <p className="text-xs mt-2 font-medium bg-black/10 dark:bg-white/10 px-2 py-1 md:px-4 md:py-2 backdrop-blur-xl rounded-full inline-block">
            {waktuInfo.waktu}
          </p>
        </div>

        <Stethoscope className="w-14 h-14 md:w-20 md:h-20 text-foreground" />
      </div>
    </CardContent>
  );
}
