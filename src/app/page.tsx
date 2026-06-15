import Image from "next/image";
import { WorksheetCard } from "@/components/ui/WorksheetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Calculator, Globe, Languages } from "lucide-react";

// Mock Data
const FEATURED_WORKSHEETS = [
  {
    id: "1",
    title: "ชุดใบงานคณิตศาสตร์ ป.1 - การบวกและลบเลขพื้นฐาน",
    subject: "คณิตศาสตร์",
    gradeLevel: "ป.1",
    price: 50,
    coverImageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "ใบงานวิทยาศาสตร์ ป.3 - วัฏจักรชีวิตของสัตว์",
    subject: "วิทยาศาสตร์",
    gradeLevel: "ป.3",
    price: 45,
    coverImageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "สมุดคัดลายมือภาษาไทย พยัญชนะ ก-ฮ สำหรับเด็กอนุบาล",
    subject: "ภาษาไทย",
    gradeLevel: "อนุบาล",
    price: 35,
    coverImageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
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

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-indigo-600 pt-20 pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            ค้นหาใบงานและสื่อการสอน <br className="hidden md:block" />
            <span className="text-orange-400">คุณภาพดีที่สุด</span> สำหรับคุณ
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            ประหยัดเวลาเตรียมการสอน ด้วยคลังใบงานดิจิทัลที่ออกแบบมาเพื่อคุณครูและเด็กไทยโดยเฉพาะ ดาวน์โหลดปุ๊บ ใช้ได้ปั๊บ
          </p>
          
          <div className="bg-white p-2 rounded-2xl shadow-xl flex items-center max-w-2xl mx-auto">
            <Search className="w-6 h-6 text-slate-400 ml-4 mr-2" />
            <Input 
              type="text" 
              placeholder="ค้นหาวิชา, ระดับชั้น, หรือคำที่ต้องการ..." 
              className="border-0 shadow-none focus-visible:ring-0 text-lg py-6"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 py-6 text-lg font-bold">
              ค้นหา
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
          {FEATURED_WORKSHEETS.map((ws) => (
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
          {FEATURED_WORKSHEETS.toReversed().map((ws) => (
            <WorksheetCard key={ws.id} {...ws} />
          ))}
        </div>
      </section>
    </div>
  );
}
