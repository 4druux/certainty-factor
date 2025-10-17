"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, LogIn, ArrowLeft } from "lucide-react";
import DotLoader from "@/components/ui/dot-loader";
import CardContent from "@/components/ui/card-content";
import { CiUnlock } from "react-icons/ci";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal login. Silakan coba lagi.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <DotLoader />
        </div>
      )}

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
                  Login <span className="text-foreground opacity-70">Apps</span>
                </h2>
                <hr className="border-none h-[1.5px] w-8 bg-foreground" />
              </div>
              <p className="text-sm md:text-md text-foreground opacity-70">
                Selamat datang kembali! Silakan masuk ke akun Anda.
              </p>
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-950 border border-red-500 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-red-500 dark:text-red-200 text-center">
                  {error}
                </p>
              </div>
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

              <div className="space-y-2 mb-6">
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
                      Login
                    </>
                  )}
                </button>
              </div>
            </form>

            <hr className="my-4 border border-border" />
            <div className="flex items-center justify-center gap-2 text-sm">
              <p className="text-foreground opacity-80">Belum punya akun? </p>
              <Link
                href="/register"
                className="font-semibold text-foreground hover:underline"
              >
                Daftar di sini
              </Link>
            </div>
          </div>
        </CardContent>
      </div>
    </>
  );
}
