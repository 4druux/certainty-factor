import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    cookies().set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return NextResponse.json({ message: "Logout berhasil." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat logout." },
      { status: 500 }
    );
  }
}
