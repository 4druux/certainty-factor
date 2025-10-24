"use client";

import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ToastProvider = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Toaster position="top-center" />;
  }

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: resolvedTheme === "dark" ? "#363636" : "#ffffff",
          color: resolvedTheme === "dark" ? "#ffffff" : "#363636",
          border:
            resolvedTheme === "dark"
              ? "1px solid #4f4f4f"
              : "1px solid #e0e0e0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },

        error: {
          style: {
            background: resolvedTheme === "dark" ? "#ef5350" : "#ef5350",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: resolvedTheme === "dark" ? "#ef5350" : "#ef5350",
          },
        },

        success: {
          style: {
            background: resolvedTheme === "dark" ? "#66bb6a" : "#66bb6a",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: resolvedTheme === "dark" ? "#66bb6a" : "#66bb6a",
          },
        },
      }}
    />
  );
};
