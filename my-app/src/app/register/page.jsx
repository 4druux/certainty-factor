"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, LogIn, ArrowLeft } from "lucide-react";
import CardContent from "@/components/ui/card-content";
import { CiUnlock } from "react-icons/ci";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (password.length < 6) {
      setError("Password minimal harus 6 karakter.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mendaftar. Coba lagi.");
      }

      setSuccess("Registrasi berhasil! Anda akan diarahkan ke halaman login.");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-lg mx-auto flex flex-col justify-center gap-4 min-h-screen px-4">
      <Link href="/">
        <div className="flex items-center gap-1 text-foreground opacity-80 hover:opacity-100 hover:underline transition-color">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Kembali ke beranda</span>
        </div>
      </Link>

      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="text-center mb-4">
            <CiUnlock className="mx-auto text-foreground h-16 w-16 mb-2" />
            <div className="inline-flex items-center gap-2">
              <h2 className="prata-regular text-2xl md:text-3xl text-foreground">
                Register{" "}
                <span className="text-foreground opacity-70">Apps</span>
              </h2>
              <hr className="border-none h-[1.5px] w-8 bg-foreground" />
            </div>
            <p className="text-sm md:text-md text-foreground opacity-70">
              Silahkan daftar untuk menggunakan aplikasi ini.
            </p>
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm font-medium text-green-600 text-center">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-2 mb-4">
              <label
                htmlFor="username"
                className="text-sm font-medium leading-none"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  className="flex w-full rounded-lg border border-border pl-10 pr-3 py-2 focus:ring-1 focus:ring-black focus:outline-none placeholder:text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="flex w-full rounded-lg border border-border pl-10 pr-3 py-2 focus:ring-1 focus:ring-black focus:outline-none placeholder:text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label
                htmlFor="konfirmasi_password"
                className="text-sm font-medium leading-none"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="konfirmasi_password"
                  type="konfirmasi_password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Konfirmasi Password"
                  required
                  className="flex w-full rounded-lg border border-border pl-10 pr-3 py-2 focus:ring-1 focus:ring-black focus:outline-none placeholder:text-sm"
                />
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-neutral-800 dark:border-neutral-200 rounded-lg text-sm font-medium text-background bg-foreground hover:bg-background hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Register
                  </>
                )}
              </button>
            </div>
          </form>
          <hr className="my-4 border border-border" />
          <div className="flex items-center justify-center gap-2 text-sm">
            <p className="text-foreground opacity-80">Sudah punya akun? </p>
            <Link
              href="/login"
              className="font-semibold text-foreground hover:underline"
            >
              Login di sini
            </Link>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
