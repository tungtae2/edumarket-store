"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronLeft, Upload, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import generatePayload from "promptpay-qr";

// Mock Cart Items
const CART_ITEMS = [
  {
    id: "1",
    title: "ชุดใบงานคณิตศาสตร์ ป.1 - การบวกและลบเลขพื้นฐาน",
    price: 50,
  },
  {
    id: "3",
    title: "สมุดคัดลายมือภาษาไทย พยัญชนะ ก-ฮ สำหรับเด็กอนุบาล",
    price: 35,
  }
];

const PROMPTPAY_ID = "0812345678"; // Mock Admin PromptPay
const TOTAL_AMOUNT = CART_ITEMS.reduce((sum, item) => sum + item.price, 0);

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [slipImage, setSlipImage] = useState<string | null>(null);

  // Generate PromptPay QR Payload
  const qrPayload = generatePayload(PROMPTPAY_ID, { amount: TOTAL_AMOUNT });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, upload to Supabase Storage here
      setSlipImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slipImage) {
      alert("กรุณาแนบสลิปโอนเงินก่อนยืนยันการสั่งซื้อ");
      return;
    }
    // Mock API Call here
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center px-4">
        <Card className="max-w-md w-full rounded-3xl p-8 text-center shadow-xl border-slate-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">ส่งข้อมูลสำเร็จ!</h1>
          <p className="text-slate-600 mb-8">
            เราได้รับสลิปของคุณเรียบร้อยแล้ว แอดมินจะทำการตรวจสอบและจัดส่งลิงก์ดาวน์โหลดใบงานไปยังอีเมลของคุณ ภายใน 24 ชั่วโมง
          </p>
          <Link href="/">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-bold">
              กลับสู่หน้าหลัก
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> กลับไปเลือกซื้อต่อ
        </Link>

        <h1 className="text-3xl font-bold text-slate-800 mb-8">ดำเนินการสั่งซื้อ (Checkout)</h1>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Slip */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Details */}
            <Card className="rounded-2xl border-slate-200 overflow-hidden">
              <div className="bg-indigo-600 px-6 py-4">
                <h2 className="text-white font-bold text-lg">1. ข้อมูลสำหรับจัดส่งไฟล์</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อ-นามสกุล *</label>
                  <Input required placeholder="พิมพ์ชื่อของคุณ..." className="rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">อีเมล (สำหรับรับไฟล์ PDF) *</label>
                  <Input required type="email" placeholder="example@email.com" className="rounded-xl" />
                </div>
              </CardContent>
            </Card>

            {/* Slip Upload */}
            <Card className="rounded-2xl border-slate-200 overflow-hidden">
              <div className="bg-indigo-600 px-6 py-4">
                <h2 className="text-white font-bold text-lg">2. อัปโหลดสลิปโอนเงิน</h2>
              </div>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors">
                  {slipImage ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-[200px] aspect-[1/2] mb-4">
                        <Image src={slipImage} alt="Slip" fill className="object-contain rounded-lg" />
                      </div>
                      <label className="cursor-pointer text-indigo-600 font-medium hover:underline">
                        เปลี่ยนรูปภาพสลิป
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-indigo-600" />
                      </div>
                      <span className="text-slate-700 font-medium mb-1">คลิกเพื่ออัปโหลดสลิปโอนเงิน</span>
                      <span className="text-sm text-slate-500">รองรับไฟล์ JPG, PNG</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary & QR Code */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="rounded-2xl border-slate-200 overflow-hidden sticky top-24">
              <div className="bg-slate-800 px-6 py-4">
                <h2 className="text-white font-bold text-lg">สรุปคำสั่งซื้อ</h2>
              </div>
              <CardContent className="p-0">
                <div className="p-6 border-b border-slate-100 space-y-4">
                  {CART_ITEMS.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <span className="text-slate-700 pr-4">{item.title}</span>
                      <span className="font-medium text-slate-900 whitespace-nowrap">฿{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-slate-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-600 font-medium">ยอดรวมทั้งสิ้น</span>
                    <span className="text-3xl font-bold text-indigo-600">฿{TOTAL_AMOUNT}</span>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <QrCode className="w-6 h-6 text-slate-800" />
                      <span className="font-bold text-slate-800">สแกนจ่ายผ่านพร้อมเพย์</span>
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-white border-2 border-indigo-100 rounded-2xl shadow-sm">
                        <QRCodeSVG value={qrPayload} size={200} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">ชื่อบัญชี: <b>บริษัท เอดูมาร์เก็ต จำกัด</b></p>
                    <p className="text-sm text-slate-600">พร้อมเพย์: {PROMPTPAY_ID}</p>
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 text-lg font-bold shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5">
                    ยืนยันการสั่งซื้อและแจ้งโอนเงิน
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
