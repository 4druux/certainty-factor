import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const aturanCf = await db.aturanCf.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(aturanCf);
  } catch (error) {
    console.error("Error GET /api/aturan-cf:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data aturan CF" },
      { status: 500 }
    );
  }
}
