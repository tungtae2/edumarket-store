import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, FileText, ChevronRight, Eye } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { AddToCartButton } from "@/components/storefront/AddToCartButton"

export const dynamic = "force-dynamic";


export default async function WorksheetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();
  
  let worksheet = null;
  
  // Try to fetch from DB
  try {
    const { data: rawData, error } = await supabase.from('worksheets').select('*').eq('id', id).single();
    const data = rawData as any;
    if (data) {
      worksheet = {
        id: data.id,
        title: data.title,
        description: data.description || "ไม่มีคำอธิบาย",
        subject: data.subject,
        gradeLevel: data.grade_level,
        price: data.price,
        coverImageUrl: data.cover_image_url || "/anime_math_cover.png",
        preview_pdf_url: data.preview_pdf_url || null,
        views: data.views || 0,
        sales_count: data.sales_count || 0
      };
    }
  } catch (e) {
    console.error("DB Fetch Error", e);
  }

  if (!worksheet) {
    notFound();
  }

  return (
    <div className="bg-[#FFFDF9] min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b-2 border-black py-4 manga-border rounded-none shadow-[0_4px_0_0_rgba(0,0,0,0.1)] mb-8">
        <div className="container mx-auto px-4 flex items-center text-sm font-bold text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="#" className="hover:text-primary transition-colors">{worksheet.subject}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-black truncate max-w-[200px] md:max-w-none">
            {worksheet.title}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Cover Image */}
          <div className="relative aspect-[3/4] w-full bg-primary/10 manga-border shadow-manga">
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
              <Badge className="bg-white text-black manga-border border-[1px] font-bold shadow-[2px_2px_0_0_#000] px-3 py-1">{worksheet.subject}</Badge>
              <Badge className="bg-secondary text-black manga-border border-[1px] font-bold shadow-[2px_2px_0_0_#000] px-3 py-1">{worksheet.gradeLevel}</Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
              {worksheet.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm font-bold text-slate-500 mb-6">
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> เข้าชม {worksheet.views.toLocaleString()} ครั้ง</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShoppingCart className="w-4 h-4" /> ขายแล้ว {worksheet.sales_count} ชุด</span>
            </div>

            <div className="text-4xl font-bold text-primary mb-8 drop-shadow-[1px_1px_0_#000]">
              ฿{worksheet.price}
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <AddToCartButton worksheet={{ id: worksheet.id, title: worksheet.title, price: worksheet.price }} />
              {worksheet.preview_pdf_url && (
                <a href={worksheet.preview_pdf_url} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button className="bg-white text-black hover:bg-slate-100 rounded-2xl py-6 text-lg font-bold manga-border shadow-[3px_3px_0_0_#000] w-full">
                    <FileText className="w-5 h-5 mr-2" />
                    ดูตัวอย่าง PDF
                  </Button>
                </a>
              )}
            </div>

            <div className="bg-white p-6 manga-border shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]">
              <h3 className="font-bold text-lg text-black mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                รายละเอียดใบงาน
              </h3>
              <div className="prose prose-slate prose-sm text-slate-700 whitespace-pre-line font-medium leading-relaxed">
                {worksheet.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
