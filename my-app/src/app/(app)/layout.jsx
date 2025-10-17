import { cookies } from "next/headers";
import MainLayout from "@/components/layout/MainLayout";

export default async function AppLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const isAdmin = !!token; 

  return <MainLayout isAdmin={isAdmin}>{children}</MainLayout>;
}