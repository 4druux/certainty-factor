"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Stethoscope,
  LogOut,
  Home,
  FileText,
  LogIn,
} from "lucide-react";
import DotLoader from "./dot-loader";

export default function Sidebar({ isOpen, toggleSidebar, isAdmin }) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoggingOut) {
      setIsLoggingOut(false);
    }
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
    },
    {
      href: "/kuesioner",
      label: "Kuesioner",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      href: "/dashboard",
      label: "Dashboard & Riwayat",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
  ];

  const filteredNavItems = navigationItems.filter((item) => {
    if (item.href === "/dashboard") {
      return isAdmin;
    }
    return true;
  });
  const router = useRouter();

  const isActive = (href) => pathname.startsWith(href) && href !== "/";

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <DotLoader />
        </div>
      )}

      <div
        onClick={toggleSidebar}
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
      ></div>

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 border-r rounded-r-3xl lg:rounded-none border-border flex flex-col z-50",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-3 pb-2">
          <div className="flex items-center justify-between py-3 lg:py-4">
            <Link href="/" className="flex items-center gap-3">
              <Stethoscope className="w-8 h-8" />
              <h1 className="text-base font-semibold text-foreground">
                Sistem Pakar KB
              </h1>
            </Link>
          </div>

          <hr className="dark:border-neutral-800" />

          <nav className="mt-4 flex-1 space-y-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive(item.href)
                    ? "bg-foreground text-background shadow-sm"
                    : "hover:bg-background"
                )}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex-shrink-0">
            <hr className="dark:border-neutral-800 mb-2" />

            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="w-full block hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 dark:hover:text-red-300 hover:border hover:border-red-500 rounded-lg px-3 py-2.5 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-destructive group-hover:text-destructive-foreground">
                  <LogOut className="w-5 h-5 rotate-180" />
                  <span>Logout</span>
                </div>
              </button>
            ) : (
              <Link
                href="/login"
                className="w-full block hover:bg-foreground hover:text-background rounded-lg px-3 py-2.5 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-sm font-medium">
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
