"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Image as ImageIcon, FileText, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function NewWorksheetPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    grade_level: "",
    price: "",
    description: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "pdf") => {
    if (e.target.files && e.target.files[0]) {
      if (type === "image") setCoverImage(e.target.files[0]);
      if (type === "pdf") setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      if (!coverImage || !pdfFile) {
        throw new Error("กรุณาอัปโหลดทั้งรูปหน้าปกและไฟล์ใบงาน (PDF)");
      }

      // 1. Upload Cover Image
      const imageExt = coverImage.name.split('.').pop();
      const imageFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${imageExt}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('worksheet-covers')
        .upload(imageFileName, coverImage);

      if (imageError) throw new Error("ไม่สามารถอัปโหลดรูปหน้าปกได้ กรุณาตรวจสอบว่าสร้าง Bucket 'worksheet-covers' แบบ Public แล้วหรือยัง");

      const coverUrl = supabase.storage.from('worksheet-covers').getPublicUrl(imageData.path).data.publicUrl;

      // 2. Upload PDF
      const pdfExt = pdfFile.name.split('.').pop();
      const pdfFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${pdfExt}`;
      const { data: pdfData, error: pdfError } = await supabase.storage
        .from('worksheet-pdfs')
        .upload(pdfFileName, pdfFile);

      if (pdfError) throw new Error("ไม่สามารถอัปโหลดไฟล์ PDF ได้ กรุณาตรวจสอบว่าสร้าง Bucket 'worksheet-pdfs' แบบ Public แล้วหรือยัง");

      const pdfUrl = supabase.storage.from('worksheet-pdfs').getPublicUrl(pdfData.path).data.publicUrl;

      // 3. Insert into Database
      const { error: dbError } = await (supabase as any).from('worksheets').insert({
        title: formData.title,
        subject: formData.subject,
        grade_level: formData.grade_level,
        price: parseInt(formData.price),
        description: formData.description,
        cover_image_url: coverUrl,
        full_pdf_url: pdfUrl,
        views: 0,
        sales_count: 0
      });

      if (dbError) throw dbError;

      alert("เพิ่มใบงานใหม่สำเร็จ!");
      router.push("/admin/worksheets");
      router.refresh();

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/worksheets">
          <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">เพิ่มใบงานใหม่</h1>
          <p className="text-slate-500 mt-1">กรอกข้อมูลรายละเอียดและอัปโหลดไฟล์ใบงาน</p>
        </div>
      </div>

      <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-8">
            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ข้อมูลทั่วไป */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">ชื่อใบงาน</Label>
                  <Input required name="title" value={formData.title} onChange={handleInputChange} placeholder="เช่น ชุดใบงานคณิตศาสตร์ ป.1" className="rounded-xl border-slate-200" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">วิชา/หมวดหมู่</Label>
                    <Input required name="subject" value={formData.subject} onChange={handleInputChange} placeholder="เช่น คณิตศาสตร์" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">ระดับชั้น</Label>
                    <Input required name="grade_level" value={formData.grade_level} onChange={handleInputChange} placeholder="เช่น ป.1" className="rounded-xl border-slate-200" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">ราคา (บาท)</Label>
                  <Input required type="number" min="0" name="price" value={formData.price} onChange={handleInputChange} placeholder="50" className="rounded-xl border-slate-200" />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">รายละเอียด</Label>
                  <Textarea required name="description" value={formData.description} onChange={handleInputChange} placeholder="อธิบายเกี่ยวกับใบงานนี้สั้นๆ..." className="rounded-xl border-slate-200 h-32" />
                </div>
              </div>

              {/* อัปโหลดไฟล์ */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">รูปหน้าปก (Cover Image)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
                    <input type="file" accept="image/*" id="cover" className="hidden" onChange={(e) => handleFileChange(e, "image")} />
                    <Label htmlFor="cover" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {coverImage ? coverImage.name : "คลิกเพื่ออัปโหลดรูปภาพ"}
                      </span>
                      {!coverImage && <span className="text-xs text-slate-500">รองรับ JPG, PNG, WEBP</span>}
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">ไฟล์ใบงานเต็ม (PDF)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
                    <input type="file" accept=".pdf" id="pdf" className="hidden" onChange={(e) => handleFileChange(e, "pdf")} />
                    <Label htmlFor="pdf" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {pdfFile ? pdfFile.name : "คลิกเพื่ออัปโหลดไฟล์ PDF"}
                      </span>
                      {!pdfFile && <span className="text-xs text-slate-500">รองรับเฉพาะไฟล์ PDF เท่านั้น</span>}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-4 rounded-b-3xl">
            <Link href="/admin/worksheets">
              <Button type="button" variant="outline" className="rounded-xl border-slate-200 px-6">ยกเลิก</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-8">
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> กำลังบันทึก...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> บันทึกใบงาน</>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
