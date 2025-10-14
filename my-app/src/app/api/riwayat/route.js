import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const riwayat = await db.konsultasi.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(riwayat);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data riwayat" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { jawaban, hasil } = data;

    const konsultasiBaru = await db.konsultasi.create({
      data: { jawaban, hasil },
    });
    return NextResponse.json(konsultasiBaru, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menyimpan konsultasi" },
      { status: 500 }
    );
  }
}
