"use client";

import { Menu, Moon, Stethoscope, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import clsx from "clsx";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={clsx(
        "fixed w-full z-30 bg-white dark:bg-neutral-900 shadow-sm border-b border-border rounded-b-xl lg:rounded-none transition-all duration-300",
        {
          "lg:ml-64 lg:w-[calc(100%-16rem)]": isSidebarOpen,
        }
      )}
    >
      <div className="flex items-center justify-between h-14 lg:h-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 lg:hidden">
          <Stethoscope className="w-8 h-8" />
          <h1 className="text-base font-semibold text-foreground">
            Sistem Pakar KB
          </h1>
        </Link>

        <div className="flex flex-row-reverse lg:flex-row lg:justify-between lg:w-full">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-background rounded-full"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-background rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
