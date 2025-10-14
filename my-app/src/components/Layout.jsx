"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilePlus2,
  LayoutDashboard,
  Stethoscope,
  Sun,
  Moon,
} from "lucide-react";

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigationItems = [
    {
      href: "/",
      label: "Kuesioner Baru",
      icon: <FilePlus2 className="w-5 h-5" />,
    },
    {
      href: "/dashboard",
      label: "Dashboard & Riwayat",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-border">
          <div className="flex flex-1 flex-col overflow-y-auto pt-6 px-3 pb-4">
            <div className="flex flex-shrink-0 items-center pb-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-foreground">
                    Sistem Pakar KB
                  </h1>
                  <p className="text-xs ">Klinik Annisa Medika</p>
                </div>
              </Link>
            </div>
            <hr className="dark:border-neutral-800" />

            <nav className="mt-4 flex-1 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-foreground text-background shadow-sm"
                      : "hover:bg-background hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="flex-shrink-0">
              <hr className="dark:border-neutral-800 mb-2" />
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center w-full px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
                <span className="ml-3">
                  {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <header className="lg:hidden sticky top-0 p-4 z-40">
        <div className="flex items-center justify-between border-b border-border rounded-full bg-white/10 backdrop-blur-lg dark:bg-black/10 px-4 py-2">
          <Link href="/" className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6" />
            <h1 className="text-base font-bold text-foreground">
              Sistem Pakar KB
            </h1>
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      <div className="lg:pl-64">
        <main className="flex-1">{children}</main>
      </div>

      <footer
        className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border rounded-t-3xl bg-white/10 backdrop-blur-lg dark:bg-black/10 z-40"
        style={{ boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.08)" }}
      >
        <nav className="flex justify-around">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-2.5 px-1 text-xs font-medium transition-colors ${
                isActive(item.href) ? "text-foreground" : "text-neutral-500"
              }`}
            >
              {item.icon}
              <span className="mt-1.5">{item.label.split(" ")[0]}</span>
            </Link>
          ))}
        </nav>
      </footer>
      <div className="lg:hidden h-16"></div>
    </div>
  );
}
