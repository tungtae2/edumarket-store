"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, User } from "lucide-react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result?.success) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white manga-border shadow-[8px_8px_0_0_#000] p-8 rounded-3xl">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 manga-border shadow-[4px_4px_0_0_#000]">
            <User className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">เข้าสู่ระบบ</h1>
          <p className="text-center text-slate-500 mb-8 font-medium">เข้าสู่ระบบเพื่อสั่งซื้อใบงาน</p>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-6 text-sm font-bold manga-border border-[1px] text-center shadow-[2px_2px_0_0_#000]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input 
                type="email" 
                name="email"
                placeholder="อีเมล (Email)..." 
                required
                className="h-14 text-lg rounded-2xl manga-border focus-visible:ring-primary focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <Input 
                type="password" 
                name="password"
                placeholder="รหัสผ่าน (Password)..." 
                required
                className="h-14 text-lg rounded-2xl manga-border focus-visible:ring-primary focus-visible:ring-offset-2"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 text-lg font-bold bg-secondary text-black hover:bg-secondary/90 manga-border shadow-[4px_4px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] transition-all rounded-2xl"
            >
              {isLoading ? "กำลังตรวจสอบ..." : (
                <>เข้าสู่ระบบ <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-slate-500 font-medium">
              ยังไม่มีบัญชีใช่ไหม?{" "}
              <Link href="/register" className="text-primary font-bold hover:underline">
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
