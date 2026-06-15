"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Database, AlertCircle } from "lucide-react";

export default function AdminSetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const seedDatabase = async () => {
    setStatus("loading");
    const supabase = createClient();

    const MOCK_WORKSHEETS = [
      { 
        title: "ชุดใบงานคณิตศาสตร์ ป.1 - การบวกและลบ", 
        subject: "คณิตศาสตร์", 
        grade_level: "ป.1",
        price: 50, 
        sales_count: 340, 
        views: 1250,
        description: "ใบงานคณิตศาสตร์ ป.1 สีสันสดใส สไตล์อนิเมะ ช่วยให้เด็กๆ สนุกกับการเรียนรู้",
        cover_image_url: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=600&auto=format&fit=crop"
      },
      { 
        title: "ใบงานวิทยาศาสตร์ ป.3 - วัฏจักรชีวิต", 
        subject: "วิทยาศาสตร์", 
        grade_level: "ป.3",
        price: 45, 
        sales_count: 150, 
        views: 800,
        description: "เรียนรู้วัฏจักรชีวิตของสัตว์ผ่านภาพประกอบสไตล์อนิเมะที่สวยงามและเข้าใจง่าย",
        cover_image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop"
      },
      { 
        title: "สมุดคัดลายมือภาษาไทย ก-ฮ", 
        subject: "ภาษาไทย", 
        grade_level: "อนุบาล-ป.1",
        price: 35, 
        sales_count: 200, 
        views: 1000,
        description: "ฝึกคัดลายมือภาษาไทย ก-ฮ พร้อมภาพตัวละครอนิเมะน่ารักๆ ประจำตัวอักษร",
        cover_image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
      },
      { 
        title: "แบบฝึกหัด Grammar - Present Simple", 
        subject: "ภาษาอังกฤษ", 
        grade_level: "ป.4-ป.6",
        price: 60, 
        sales_count: 95, 
        views: 500,
        description: "แบบฝึกหัด Grammar พื้นฐาน พร้อมคำอธิบายภาษาไทยและภาพประกอบแบบ Manga",
        cover_image_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop"
      },
    ];

    try {
      const { error } = await (supabase as any).from("worksheets").insert(MOCK_WORKSHEETS);
      if (error) throw error;
      setStatus("success");
      setMessage("เพิ่มข้อมูลตั้งต้นเรียบร้อยแล้ว!");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">ระบบตั้งค่า (Setup)</h1>
        <p className="text-slate-500 mt-2">หน้านี้ใช้สำหรับตั้งค่าระบบในครั้งแรก</p>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm border-2 border-indigo-100">
        <CardHeader className="bg-indigo-50/50 rounded-t-2xl pb-4">
          <CardTitle className="text-xl text-indigo-900 flex items-center gap-2">
            <Database className="w-5 h-5" />
            1. เพิ่มข้อมูลใบงานตั้งต้น (Seed Data)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-slate-600 mb-6">
            กดปุ่มด้านล่างเพื่อเพิ่มข้อมูลใบงานจำลองจำนวน 4 ชุดลงในตาราง <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">worksheets</code> เพื่อให้เว็บไซต์มีสินค้าแสดงในหน้าแรก
          </p>
          
          <Button 
            onClick={seedDatabase} 
            disabled={status === "loading" || status === "success"}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6"
          >
            {status === "loading" ? "กำลังเพิ่มข้อมูล..." : "เพิ่มข้อมูลใบงาน (Seed Data)"}
          </Button>

          {status === "success" && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
              <Check className="w-5 h-5" />
              {message}
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {message}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-slate-200 shadow-sm border-2 border-orange-100">
        <CardHeader className="bg-orange-50/50 rounded-t-2xl pb-4">
          <CardTitle className="text-xl text-orange-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            2. ตั้งค่า Storage Bucket (ต้องทำด้วยตัวเอง)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4 text-slate-700">
          <p>
            เนื่องจากข้อจำกัดด้านความปลอดภัย ระบบไม่สามารถสร้าง Bucket ผ่านโค้ดฝั่งเว็บไซต์ได้ กรุณาทำตามขั้นตอนต่อไปนี้ใน Supabase Dashboard:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>ล็อกอินเข้า <strong>Supabase Dashboard</strong> ของคุณ</li>
            <li>ไปที่เมนู <strong>Storage</strong> (เมนูด้านซ้าย รูปโฟลเดอร์)</li>
            <li>คลิกปุ่ม <strong>New Bucket</strong></li>
            <li>ตั้งชื่อ Bucket ว่า <code className="bg-slate-100 px-1 py-0.5 rounded text-orange-600 font-bold">payment-slips</code></li>
            <li>เปิดสวิตช์ <strong>Public bucket</strong> ให้เป็น ON</li>
            <li>คลิกปุ่ม Save</li>
          </ol>
          <p className="text-sm text-slate-500 mt-4 border-t pt-4">
            *หากไม่สร้าง Bucket นี้ ลูกค้าจะไม่สามารถแนบสลิปโอนเงินตอนสั่งซื้อได้
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
