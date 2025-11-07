import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const jenisKb = await db.jenisKb.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(jenisKb);
  } catch (error) {
    console.error("Error GET /api/jenis-kb:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data jenis KB" },
      { status: 500 }
    );
  }
}
