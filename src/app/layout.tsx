import type { Metadata } from "next";
import { Mali } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const mali = Mali({
  weight: ['400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-mali",
});

export const metadata: Metadata = {
  title: "EduMarket - คลังใบงานสำหรับคุณครู",
  description: "แหล่งรวมใบงาน แบบฝึกหัด คุณภาพสูงสำหรับคุณครูและผู้ปกครอง",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="th" className="scroll-smooth">
      <body
        className={`${mali.variable} font-sans antialiased bg-slate-50 flex flex-col min-h-screen`}
      >
        <Navbar user={user} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
