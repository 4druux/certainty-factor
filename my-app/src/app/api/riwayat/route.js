import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const riwayat = await db.konsultasi.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formattedRiwayat = riwayat.map((item) => ({
      id: item.id,
      createdAt: item.createdAt,
      jawaban: item.jawaban,
      hasil: item.hasil,
      dataDiri: {
        nama: item.nama,
        umur: item.umur,
        alamat: item.alamat,
      },
    }));

    return NextResponse.json(formattedRiwayat);
  } catch (error) {
    console.error("Error GET /api/riwayat:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data riwayat" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { dataDiri, jawaban, hasil } = data;

    if (!dataDiri || !dataDiri.nama || !dataDiri.umur || !dataDiri.alamat) {
      return NextResponse.json(
        { error: "Data diri (nama, umur, alamat) tidak lengkap" },
        { status: 400 }
      );
    }

    const { nama, umur, alamat } = dataDiri;

    const MAX_ALAMAT_LENGTH = 191;

    if (alamat.length > MAX_ALAMAT_LENGTH) {
      return NextResponse.json(
        { error: `Alamat terlalu panjang ${MAX_ALAMAT_LENGTH} karakter.` },
        { status: 400 }
      );
    }

    const konsultasiBaru = await db.konsultasi.create({
      data: {
        nama: nama,
        umur: parseInt(umur, 10),
        alamat: alamat,
        jawaban: jawaban,
        hasil: hasil,
      },
    });
    return NextResponse.json(konsultasiBaru, { status: 201 });
  } catch (error) {
    if (error.code === "P2000") {
      return NextResponse.json(
        {
          error: `Data terlalu panjang untuk kolom di database. Pastikan alamat tidak lebih dari 191 karakter.`,
        },
        { status: 400 }
      );
    }

    console.error("Error POST /api/riwayat:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan konsultasi" },
      { status: 500 }
    );
  }
}
