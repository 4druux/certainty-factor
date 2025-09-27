import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/providers/ThemeProvider.jsx";
import Layout from "../components/Layout.jsx";
import Footer from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistem Pakar KB - Klinik Annisa Medika Serpong",
  description:
    "Sistem pakar berbasis web untuk pemilihan jenis KB menggunakan metode Certainty Factor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>
            {children}
            <Footer />
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
