import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, FileText, ChevronRight, Eye } from "lucide-react"

// Mock Data for Phase 2
const MOCK_WORKSHEET = {
  id: "1",
  title: "ชุดใบงานคณิตศาสตร์ ป.1 - การบวกและลบเลขพื้นฐาน",
  description: `ใบงานคณิตศาสตร์ชุดนี้ถูกออกแบบมาเพื่อพัฒนาทักษะพื้นฐานทางคณิตศาสตร์สำหรับเด็กประถมศึกษาปีที่ 1
  
เนื้อหาประกอบด้วย:
- การบวกเลขไม่เกิน 20
- การลบเลขไม่เกิน 20
- โจทย์ปัญหาในชีวิตประจำวัน
- เกมคณิตศาสตร์แสนสนุก

เหมาะสำหรับคุณครูนำไปใช้สอนในชั้นเรียน หรือผู้ปกครองนำไปให้เด็กๆ ฝึกทบทวนที่บ้าน พิมพ์สีสันสดใส ดึงดูดความสนใจเด็กๆ ได้ดีเยี่ยม`,
  subject: "คณิตศาสตร์",
  gradeLevel: "ป.1",
  price: 50,
  coverImageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=800&auto=format&fit=crop",
  views: 1250,
  sales_count: 340
}

export default async function WorksheetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const worksheet = MOCK_WORKSHEET; // In the future, fetch from Supabase using id

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4 flex items-center text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">หน้าแรก</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="#" className="hover:text-indigo-600 transition-colors">{worksheet.subject}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-800 font-medium truncate max-w-[200px] md:max-w-none">
            {worksheet.title}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Cover Image */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
            <Image 
              src={worksheet.coverImageUrl} 
              alt={worksheet.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Details & Actions */}
          <div className="flex flex-col">
            <div className="flex gap-2 mb-4">
              <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none text-sm px-3 py-1">{worksheet.subject}</Badge>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none text-sm px-3 py-1">{worksheet.gradeLevel}</Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">
              {worksheet.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> เข้าชม {worksheet.views.toLocaleString()} ครั้ง</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShoppingCart className="w-4 h-4" /> ขายแล้ว {worksheet.sales_count} ชุด</span>
            </div>

            <div className="text-4xl font-bold text-indigo-600 mb-8">
              ฿{worksheet.price}
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 text-lg font-bold shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 w-full">
                <ShoppingCart className="w-5 h-5 mr-2" />
                เพิ่มลงตะกร้า
              </Button>
              <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-xl py-6 text-lg font-bold w-full">
                <FileText className="w-5 h-5 mr-2" />
                ดูตัวอย่าง PDF
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                รายละเอียดใบงาน
              </h3>
              <div className="prose prose-slate prose-sm text-slate-600 whitespace-pre-line">
                {worksheet.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
