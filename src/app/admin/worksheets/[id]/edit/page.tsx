"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Image as ImageIcon, FileText, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function EditWorksheetPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();
  
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function fetchWorksheet() {
      const { data, error } = await supabase.from('worksheets').select('*').eq('id', id).single();
      if (data) {
        setFormData({
          title: data.title,
          subject: data.subject,
          grade_level: data.grade_level,
          price: data.price.toString(),
          description: data.description,
        });
      }
      setIsLoading(false);
    }
    fetchWorksheet();
  }, [id, supabase]);

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
      let finalCoverUrl = undefined;
      let finalPdfUrl = undefined;

      // 1. Upload Cover Image if changed
      if (coverImage) {
        const imageExt = coverImage.name.split('.').pop();
        const imageFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${imageExt}`;
        const { data: imageData, error: imageError } = await supabase.storage
          .from('worksheet-covers')
          .upload(imageFileName, coverImage);

        if (imageError) throw new Error("ไม่สามารถอัปโหลดรูปหน้าปกได้");
        finalCoverUrl = supabase.storage.from('worksheet-covers').getPublicUrl(imageData.path).data.publicUrl;
      }

      // 2. Upload PDF if changed
      if (pdfFile) {
        const pdfExt = pdfFile.name.split('.').pop();
        const pdfFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${pdfExt}`;
        const { data: pdfData, error: pdfError } = await supabase.storage
          .from('worksheet-pdfs')
          .upload(pdfFileName, pdfFile);

        if (pdfError) throw new Error("ไม่สามารถอัปโหลดไฟล์ PDF ได้");
        finalPdfUrl = supabase.storage.from('worksheet-pdfs').getPublicUrl(pdfData.path).data.publicUrl;
      }

      // 3. Update Database
      const updateData: any = {
        title: formData.title,
        subject: formData.subject,
        grade_level: formData.grade_level,
        price: parseInt(formData.price),
        description: formData.description,
      };

      if (finalCoverUrl) updateData.cover_image_url = finalCoverUrl;
      if (finalPdfUrl) updateData.full_pdf_url = finalPdfUrl;

      const { error: dbError } = await supabase.from('worksheets').update(updateData).eq('id', id);

      if (dbError) throw dbError;

      alert("แก้ไขใบงานสำเร็จ!");
      router.push("/admin/worksheets");
      router.refresh();

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/worksheets">
          <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">แก้ไขใบงาน</h1>
          <p className="text-slate-500 mt-1">อัปเดตข้อมูลรายละเอียดหรือเปลี่ยนไฟล์ใบงาน</p>
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
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">ชื่อใบงาน</Label>
                  <Input required name="title" value={formData.title} onChange={handleInputChange} className="rounded-xl border-slate-200" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">วิชา/หมวดหมู่</Label>
                    <Input required name="subject" value={formData.subject} onChange={handleInputChange} className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">ระดับชั้น</Label>
                    <Input required name="grade_level" value={formData.grade_level} onChange={handleInputChange} className="rounded-xl border-slate-200" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">ราคา (บาท)</Label>
                  <Input required type="number" min="0" name="price" value={formData.price} onChange={handleInputChange} className="rounded-xl border-slate-200" />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">รายละเอียด</Label>
                  <Textarea required name="description" value={formData.description} onChange={handleInputChange} className="rounded-xl border-slate-200 h-32" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">เปลี่ยนรูปหน้าปก (ตัวเลือก)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
                    <input type="file" accept="image/*" id="cover" className="hidden" onChange={(e) => handleFileChange(e, "image")} />
                    <Label htmlFor="cover" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {coverImage ? coverImage.name : "คลิกเพื่ออัปโหลดรูปภาพใหม่"}
                      </span>
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">เปลี่ยนไฟล์ใบงาน PDF (ตัวเลือก)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
                    <input type="file" accept=".pdf" id="pdf" className="hidden" onChange={(e) => handleFileChange(e, "pdf")} />
                    <Label htmlFor="pdf" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {pdfFile ? pdfFile.name : "คลิกเพื่ออัปโหลดไฟล์ PDF ใหม่"}
                      </span>
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
                <><Save className="w-4 h-4 mr-2" /> บันทึกการแก้ไข</>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
