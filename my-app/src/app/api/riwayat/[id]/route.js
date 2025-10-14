import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await db.konsultasi.delete({ where: { id } });
    return NextResponse.json({ message: "Riwayat berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus riwayat" },
      { status: 500 }
    );
  }
}
