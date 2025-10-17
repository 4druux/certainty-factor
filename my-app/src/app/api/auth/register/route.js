import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const adminCount = await db.admin.count();
    if (adminCount > 0) {
      return NextResponse.json(
        { error: "Registrasi admin hanya diizinkan untuk satu akun." },
        { status: 403 }
      );
    }

    const { username, password } = await request.json();

    if (!username || !password || password.length < 6) {
      return NextResponse.json(
        {
          error: "Username dan password diperlukan (password min 6 karakter).",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await db.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Admin berhasil dibuat." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan internal." },
      { status: 500 }
    );
  }
}
