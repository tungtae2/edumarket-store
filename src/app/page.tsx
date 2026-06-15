import Image from "next/image";
import { WorksheetCard } from "@/components/ui/WorksheetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Calculator, Globe, Languages, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Mock Data
// Mock Data
const MOCK_WORKSHEETS = [
  {
    id: "1",
    title: "ชุดใบงานคณิตศาสตร์ ป.1 - การบวกและลบเลขพื้นฐาน (ฉบับการ์ตูน)",
    subject: "คณิตศาสตร์",
    gradeLevel: "ป.1",
    price: 50,
    coverImageUrl: "/anime_math_cover.png"
  },
  {
    id: "2",
    title: "สมุดคัดลายมือภาษาไทย พยัญชนะ ก-ฮ สำหรับเด็กอนุบาล",
    subject: "ภาษาไทย",
    gradeLevel: "อนุบาล",
    price: 35,
    coverImageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "แบบฝึกหัด Grammar - Present Simple Tense",
    subject: "ภาษาอังกฤษ",
    gradeLevel: "ป.6",
    price: 60,
    coverImageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
  }
];

export default async function Home() {
  const supabase = createServerSupabaseClient();
  const { data: dbWorksheets } = await supabase.from('worksheets').select('*').order('created_at', { ascending: false });

  // Use real DB data, or fallback to Mock Data if DB is empty (e.g. just initialized)
  const worksheets = dbWorksheets && dbWorksheets.length > 0 ? (dbWorksheets as any[]).map((w: any) => ({
    id: w.id,
    title: w.title,
    subject: w.subject,
    gradeLevel: w.grade_level,
    price: w.price,
    coverImageUrl: w.cover_image_url || "/anime_math_cover.png"
  })) : MOCK_WORKSHEETS;

  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden manga-border border-b-4 border-l-0 border-r-0 border-t-0 rounded-none mb-12">
        {/* Halftone Pattern (Simulated with CSS dots) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(black_2px,transparent_0)] bg-[length:15px_15px]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-secondary text-black hover:bg-secondary/90 mb-6 px-4 py-2 text-sm font-bold manga-border shadow-[2px_2px_0_0_#000]">
            🎉 แหล่งรวมใบงานที่ดีที่สุด
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-[2px_2px_0_#000]">
            คลังใบงานดิจิทัล <br className="hidden md:block" />สำหรับคุณครูยุคใหม่
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-[1px_1px_0_#000]">
            ดาวน์โหลดใบงานคุณภาพสูงพร้อมใช้ ประหยัดเวลาเตรียมการสอน สนับสนุนโดยเพื่อนครูทั่วประเทศ
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 font-bold text-lg rounded-full px-8 h-14 manga-border shadow-[3px_3px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] transition-all">
              ดูใบงานทั้งหมด <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" className="bg-white text-black hover:bg-slate-100 font-bold text-lg rounded-full px-8 h-14 manga-border shadow-[3px_3px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] transition-all">
              หมวดหมู่ยอดฮิต
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 -mt-10 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "คณิตศาสตร์", icon: Calculator, color: "bg-blue-100 text-blue-600" },
            { name: "วิทยาศาสตร์", icon: Globe, color: "bg-green-100 text-green-600" },
            { name: "ภาษาไทย", icon: BookOpen, color: "bg-red-100 text-red-600" },
            { name: "ภาษาอังกฤษ", icon: Languages, color: "bg-yellow-100 text-yellow-600" },
          ].map((cat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${cat.color}`}>
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-800">ใบงานแนะนำ 🌟</h2>
          <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">ดูทั้งหมด</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_WORKSHEETS.map((ws) => (
            <WorksheetCard key={ws.id} {...ws} />
          ))}
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-800">ขายดีที่สุด 🔥</h2>
          <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">ดูทั้งหมด</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {worksheets.slice(0, 8).map((ws) => (
            <WorksheetCard key={ws.id} {...ws} />
          ))}
        </div>
      </section>
    </div>
  );
}
