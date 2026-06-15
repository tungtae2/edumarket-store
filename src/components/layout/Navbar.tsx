"use client";

import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/store/useCartStore"
import { useEffect, useState } from "react"

export function Navbar() {
  const items = useCartStore((state) => state.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">E</span>
            </div>
            <span className="font-bold text-xl text-slate-800">EduMarket</span>
          </Link>
          
          <div className="hidden md:flex relative w-96">
            <Input 
              type="search" 
              placeholder="ค้นหาใบงาน, วิชา, ระดับชั้น..." 
              className="pl-10 bg-slate-50 border-slate-200 rounded-full focus-visible:ring-indigo-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        <div className="flex items-center gap-4">
        <Link href="/checkout">
          <Button variant="ghost" size="icon" className="relative manga-border border-[1px] hover:bg-primary/10">
            <ShoppingCart className="w-5 h-5 text-black" />
            {mounted && items.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center -mt-1 -mr-1 manga-border border-[1px]">
                {items.length}
              </span>
            )}
          </Button>
        </Link>
        <Link href="/login">
          <Button className="bg-secondary text-black hover:bg-secondary/90 font-bold manga-border shadow-[2px_2px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_#000] transition-all hidden md:flex">
            เข้าสู่ระบบ
          </Button>
        </Link>
      </div>
      </div>
    </nav>
  )
}
