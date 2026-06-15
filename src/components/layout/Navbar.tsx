import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navbar() {
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
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5 text-slate-600" />
          </Button>
          <Button variant="ghost" className="relative hidden sm:flex text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
            <ShoppingCart className="w-5 h-5 mr-2" />
            ตะกร้าสินค้า
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden relative">
            <ShoppingCart className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
            เข้าสู่ระบบ
          </Button>
        </div>
      </div>
    </nav>
  )
}
