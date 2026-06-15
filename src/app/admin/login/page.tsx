"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight } from "lucide-react";
import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
    // If success, the server action handles the redirect
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(black_2px,transparent_0)] bg-[length:15px_15px]"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white manga-border shadow-[8px_8px_0_0_#000] p-8 rounded-3xl">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 manga-border shadow-[4px_4px_0_0_#000]">
            <Lock className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">EduAdmin</h1>
          <p className="text-center text-slate-500 mb-8 font-medium">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบหลังบ้าน</p>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-6 text-sm font-bold manga-border border-[1px] text-center shadow-[2px_2px_0_0_#000]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="mt-8 text-center">
            <a href="/" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors">
              &larr; กลับไปหน้าหลัก
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
