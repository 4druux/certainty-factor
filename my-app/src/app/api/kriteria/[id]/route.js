import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const kriteria = await db.kriteria.findUnique({
      where: { id },
    });

    if (!kriteria) {
      return NextResponse.json(
        { error: "Kriteria tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(kriteria);
  } catch (error) {
    console.error(`Error GET /api/kriteria/${id}:`, error);
    return NextResponse.json(
      { error: "Gagal mengambil data kriteria" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const { pertanyaan, tipe, pilihan } = data;

    if (!pertanyaan || !tipe || !pilihan) {
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

    const kriteriaUpdated = await db.kriteria.update({
      where: { id },
      data: {
        pertanyaan,
        tipe,
        pilihan,
      },
    });
    return NextResponse.json(kriteriaUpdated);
  } catch (error) {
    console.error(`Error PUT /api/kriteria/${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Kriteria tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Gagal memperbarui kriteria" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await db.kriteria.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Kriteria berhasil dihapus" });
  } catch (error) {
    console.error(`Error DELETE /api/kriteria/${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Kriteria tidak ditemukan" },
        { status: 404 }
      );
    }
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Gagal menghapus: Kriteria ini masih digunakan oleh Aturan CF.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Gagal menghapus kriteria" },
      { status: 500 }
    );
  }
}
