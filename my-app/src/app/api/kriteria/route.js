import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET() {
  try {
    const kriteria = await db.kriteria.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(kriteria);
  } catch (error) {
    console.error("Error GET /api/kriteria:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kriteria" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { id, pertanyaan, tipe, pilihan } = data;

    if (!id || !pertanyaan || !tipe || !pilihan) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    if (!Array.isArray(pilihan)) {
      return NextResponse.json(
        { error: "Pilihan harus berupa array" },
        { status: 400 }
      );
    }

    const kriteriaBaru = await db.kriteria.create({
      data: {
        id,
        pertanyaan,
        tipe,
        pilihan,
      },
    });
    return NextResponse.json(kriteriaBaru, { status: 201 });
  } catch (error) {
    console.error("Error POST /api/kriteria:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: `Kriteria dengan ID "${data.id}" sudah ada.` },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Gagal membuat kriteria baru" },
      { status: 500 }
    );
  }
}
