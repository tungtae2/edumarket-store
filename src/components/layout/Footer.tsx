import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">E</span>
            </div>
            <span className="font-bold text-xl text-white">EduMarket</span>
          </Link>
          <p className="text-slate-400 mb-4 max-w-sm">
            แหล่งรวมใบงานดิจิทัลคุณภาพสูงสำหรับคุณครู ผู้ปกครอง และติวเตอร์ เพื่อการศึกษาของเด็กไทย
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">หมวดหมู่</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">คณิตศาสตร์</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">วิทยาศาสตร์</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">ภาษาไทย</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">ภาษาอังกฤษ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">ช่วยเหลือ</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">วิธีการสั่งซื้อ</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">วิธีการดาวน์โหลด</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">ติดต่อเรา</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        <p>Copyright © {new Date().getFullYear()} EduMarket. All rights reserved.</p>
      </div>
    </footer>
  )
}
