"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronLeft, Upload, QrCode, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import generatePayload from "promptpay-qr";
import { createClient } from "@/lib/supabase/client";

// Mock Cart Items
const CART_ITEMS: any[] = [];
const PROMPTPAY_ID = "0812345678"; // Required for QR generation logic, will be replaced with real admin ID later
const TOTAL_AMOUNT = CART_ITEMS.reduce((sum, item) => sum + item.price, 0);

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [slipImage, setSlipImage] = useState<string | null>(null);
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate PromptPay QR Payload
  const qrPayload = generatePayload(PROMPTPAY_ID, { amount: TOTAL_AMOUNT });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSlipFile(e.target.files[0]);
      setSlipImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slipFile) {
      alert("กรุณาแนบสลิปโอนเงินก่อนยืนยันการสั่งซื้อ");
      return;
    }
    
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const customerName = formData.get("customerName") as string;
    const customerEmail = formData.get("customerEmail") as string;

    const supabase = createClient() as any;
    let slipUrl = "";

    try {
      // 1. Upload Slip
      const fileExt = slipFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-slips')
        .upload(fileName, slipFile);

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabase.storage.from('payment-slips').getPublicUrl(fileName);
        slipUrl = publicUrlData.publicUrl;
      }

      // 2. Insert Order
      const { data: orderData, error: orderError } = await supabase.from('orders').insert([
        {
          customer_name: customerName,
          customer_email: customerEmail,
          total_amount: TOTAL_AMOUNT,
          slip_image_url: slipUrl
        }
      ]).select().single();

      if (orderError) throw orderError;

      // 3. Insert Order Items
      if (orderData) {
        const orderItems = CART_ITEMS.map(item => ({
          order_id: orderData.id,
          worksheet_id: item.id, // Assuming worksheet ID exists in Supabase. For mock safety, we could bypass this if foreign key fails.
          price: item.price
        }));
        // Note: This might fail if mock worksheet IDs don't exist in the real DB.
        await supabase.from('order_items').insert(orderItems);
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#FFFDF9] min-h-screen py-20 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(black_2px,transparent_0)] bg-[length:15px_15px]"></div>
        <Card className="max-w-md w-full rounded-3xl p-8 text-center manga-border shadow-[8px_8px_0_0_#000] relative z-10 bg-white">
          <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6 manga-border shadow-[4px_4px_0_0_#000]">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">ส่งข้อมูลสำเร็จ!</h1>
          <p className="text-slate-600 mb-8 font-medium">
            เราได้รับสลิปของคุณเรียบร้อยแล้ว แอดมินจะทำการตรวจสอบและจัดส่งลิงก์ดาวน์โหลดใบงานไปยังอีเมลของคุณ ภายใน 24 ชั่วโมง
          </p>
          <Link href="/">
            <Button className="w-full bg-secondary text-black hover:bg-secondary/90 rounded-2xl py-6 font-bold text-lg manga-border shadow-[4px_4px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] transition-all">
              กลับสู่หน้าหลัก
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF9] min-h-screen pb-20 relative">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(black_2px,transparent_0)] bg-[length:15px_15px]"></div>
      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        <Link href="/" className="inline-flex items-center font-bold text-slate-500 hover:text-primary mb-6 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> กลับไปเลือกซื้อต่อ
        </Link>

        <h1 className="text-4xl font-bold text-black mb-8 drop-shadow-[2px_2px_0_#fff]">ดำเนินการสั่งซื้อ (Checkout)</h1>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Slip */}
          <div className="lg:col-span-7 space-y-8">
            {/* Customer Details */}
            <Card className="rounded-3xl manga-border shadow-[6px_6px_0_0_#000] overflow-hidden bg-white">
              <div className="bg-primary px-6 py-4 border-b-2 border-black">
                <h2 className="text-white font-bold text-xl drop-shadow-[1px_1px_0_#000]">1. ข้อมูลสำหรับจัดส่งไฟล์</h2>
              </div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="block text-base font-bold text-black mb-2">ชื่อ-นามสกุล *</label>
                  <Input name="customerName" required placeholder="พิมพ์ชื่อของคุณ..." className="rounded-2xl h-14 manga-border focus-visible:ring-primary" />
                </div>
                <div>
                  <label className="block text-base font-bold text-black mb-2">อีเมล (สำหรับรับไฟล์ PDF) *</label>
                  <Input name="customerEmail" required type="email" placeholder="example@email.com" className="rounded-2xl h-14 manga-border focus-visible:ring-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Slip Upload */}
            <Card className="rounded-3xl manga-border shadow-[6px_6px_0_0_#000] overflow-hidden bg-white">
              <div className="bg-primary px-6 py-4 border-b-2 border-black">
                <h2 className="text-white font-bold text-xl drop-shadow-[1px_1px_0_#000]">2. อัปโหลดสลิปโอนเงิน</h2>
              </div>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-black rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors bg-[#FFFDF9]">
                  {slipImage ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-[200px] aspect-[1/2] mb-4">
                        <Image src={slipImage} alt="Slip" fill className="object-contain rounded-xl manga-border" />
                      </div>
                      <label className="cursor-pointer text-primary font-bold hover:underline">
                        เปลี่ยนรูปภาพสลิป
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 manga-border shadow-[2px_2px_0_0_#000]">
                        <Upload className="w-8 h-8 text-black" />
                      </div>
                      <span className="text-black font-bold text-lg mb-1">คลิกเพื่ออัปโหลดสลิปโอนเงิน</span>
                      <span className="text-sm font-medium text-slate-500">รองรับไฟล์ JPG, PNG</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary & QR Code */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="rounded-3xl manga-border shadow-[6px_6px_0_0_#000] overflow-hidden sticky top-24 bg-white">
              <div className="bg-slate-900 px-6 py-4 border-b-2 border-black">
                <h2 className="text-white font-bold text-xl drop-shadow-[1px_1px_0_#000]">สรุปคำสั่งซื้อ</h2>
              </div>
              <CardContent className="p-0">
                <div className="p-6 border-b-2 border-black space-y-4">
                  {CART_ITEMS.length > 0 ? CART_ITEMS.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0">
                      <span className="text-black font-medium pr-4">{item.title}</span>
                      <span className="font-bold text-black whitespace-nowrap">฿{item.price}</span>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-slate-500">
                      ยังไม่มีสินค้าในตะกร้า
                    </div>
                  )}
                </div>
                
                <div className="p-6 bg-[#FFFDF9]">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-black font-bold text-lg">ยอดรวมทั้งสิ้น</span>
                    <span className="text-4xl font-bold text-primary drop-shadow-[1px_1px_0_#000]">฿{TOTAL_AMOUNT}</span>
                  </div>

                  <div className="bg-white rounded-2xl p-6 manga-border text-center mb-6 shadow-[2px_2px_0_0_#000]">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <QrCode className="w-6 h-6 text-black" />
                      <span className="font-bold text-lg text-black">สแกนจ่ายผ่านพร้อมเพย์</span>
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-white manga-border rounded-2xl shadow-[4px_4px_0_0_#000]">
                        <QRCodeSVG value={qrPayload} size={200} />
                      </div>
                    </div>
                    <p className="text-base font-medium text-slate-600 mb-1">ชื่อบัญชี: <b>บริษัท เอดูมาร์เก็ต จำกัด</b></p>
                    <p className="text-base font-medium text-slate-600">พร้อมเพย์: <span className="font-bold">{PROMPTPAY_ID}</span></p>
                  </div>

                  <Button type="submit" disabled={isLoading || CART_ITEMS.length === 0} className="w-full bg-secondary text-black hover:bg-secondary/90 rounded-2xl py-7 text-xl font-bold manga-border shadow-[4px_4px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_#000]">
                    {isLoading ? "กำลังประมวลผล..." : (
                      <>ยืนยันและแจ้งโอนเงิน <ArrowRight className="ml-2 w-6 h-6" /></>
                    )}
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
