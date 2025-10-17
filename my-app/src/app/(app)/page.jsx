"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, BarChart, Users, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const featureCards = [
    {
      icon: <CheckCircle className="w-8 h-8 text-sky-500" />,
      title: "Rekomendasi Personal",
      description:
        "Dapatkan saran KB yang disesuaikan dengan kondisi dan kebutuhan unik Anda.",
    },
    {
      icon: <BarChart className="w-8 h-8 text-sky-500" />,
      title: "Berbasis Certainty Factor",
      description:
        "Analisis akurat menggunakan metode sistem pakar untuk hasil yang dapat diandalkan.",
    },
    {
      icon: <Users className="w-8 h-8 text-sky-500" />,
      title: "Mudah Digunakan",
      description:
        "Antarmuka yang intuitif memandu Anda menjawab pertanyaan dengan cepat dan mudah.",
    },
    {
      icon: <Shield className="w-8 h-8 text-sky-500" />,
      title: "Privasi Terjaga",
      description:
        "Jawaban Anda dijamin kerahasiaannya dan hanya digunakan untuk perhitungan rekomendasi.",
    },
  ];

  return (
    <div className="bg-background min-h-screen md:p-8">
      <motion.main
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-10 w-full">
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Temukan Pilihan KB <br />
              <span className="text-sky-600 dark:text-sky-400">
                Terbaik
              </span>{" "}
              Untuk Anda
            </motion.h1>

            <motion.p
              className="text-md text-foreground mt-2 md:mt-4 max-w-2xl mx-auto mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Jawab beberapa pertanyaan singkat tentang kondisi Anda dan biarkan
              sistem pakar kami menganalisis dan memberikan rekomendasi metode
              kontrasepsi yang paling sesuai.
            </motion.p>

            <motion.div>
              <Link href="/kuesioner">
                <button className="font-semibold py-2.5 px-8 rounded-lg bg-sky-600 dark:bg-sky-700/50 dark:hover:bg-sky-800 hover:bg-sky-700 text-white transition-all duration-300 flex items-center gap-2">
                  <span>Mulai Kuesioner</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Image
              src="/kb.png"
              alt="Ilustrasi Keluarga Berencana"
              width={400}
              height={400}
              className="rounded-xl object-cover"
              priority
            />
          </motion.div>
        </section>

        <section className="pt-24 md:pt-40">
          <motion.div
            variants={itemVariants}
            className="text-center mb-6 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold opacity-90 dark:opacity-100">
              Mengapa{" "}
              <span className="text-sky-600 dark:text-sky-400"> Sistem </span>{" "}
              Pakar KB?
            </h2>
            <p className="text-md text-foreground mt-2 max-w-2xl mx-auto">
              Sistem kami dirancang untuk memberikan panduan awal yang cerdas
              dan personal dalam perencanaan keluarga Anda.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            variants={containerVariants}
          >
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border p-6 rounded-xl text-center flex flex-col items-center"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="bg-sky-100 dark:bg-sky-900/30 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold opacity-80 dark:opacity-100">
                  {feature.title}
                </h3>
                <p className="text-foreground opacity-80 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="pt-24 md:pt-40">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold opacity-90 dark:opacity-100">
              Bagaimana{" "}
              <span className="text-sky-600 dark:text-sky-400"> Cara </span>
              Kerjanya?
            </h2>
            <p className="text-md text-foreground mt-2 max-w-2xl mx-auto">
              Hanya dalam 3 langkah mudah, Anda bisa mendapatkan rekomendasi KB.
            </p>
          </motion.div>

          <div className="mt-6 md:mt-12 grid md:grid-cols-3 gap-4 lg:gap-6 text-left">
            <motion.div
              variants={itemVariants}
              className="relative p-6 border border-border rounded-xl"
            >
              <div className="absolute -top-3 -left-3 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-white w-10 h-10 rounded-full flex items-center justify-center text-md md:text-lg">
                1
              </div>
              <h3 className="mt-2 text-lg font-semibold opacity-80 dark:opacity-100">
                Isi Kuesioner
              </h3>
              <p className="text-foreground opacity-80 text-sm mr-8">
                Jawab pertanyaan yang kami sediakan sesuai dengan kondisi
                kesehatan Anda.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative p-6 border border-border rounded-xl"
            >
              <div className="absolute -top-3 -left-3 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-white w-10 h-10 rounded-full flex items-center justify-center text-md md:text-lg">
                2
              </div>
              <h3 className="mt-2 text-lg font-semibold opacity-80 dark:opacity-100">
                Analisis Sistem
              </h3>
              <p className="text-foreground opacity-80 text-sm mr-8">
                Sistem pakar kami akan memproses jawaban Anda menggunakan metode
                Certainty Factor.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative p-6 border border-border rounded-xl"
            >
              <div className="absolute -top-3 -left-3 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-white w-10 h-10 rounded-full flex items-center justify-center text-md md:text-lg">
                3
              </div>
              <h3 className="mt-2 text-lg font-semibold opacity-80 dark:opacity-100">
                Lihat Hasil
              </h3>
              <p className="text-foreground opacity-80 text-sm mr-8">
                Dapatkan hasil rekomendasi beserta tingkat keyakinan sistem
                dalam hitungan detik.
              </p>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
