import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "./card"
import { Badge } from "./badge"
import { Button } from "./button"
import { ShoppingCart } from "lucide-react"

interface WorksheetCardProps {
  id: string
  title: string
  subject: string
  gradeLevel: string
  price: number
  coverImageUrl: string
}

export function WorksheetCard({ id, title, subject, gradeLevel, price, coverImageUrl }: WorksheetCardProps) {
  return (
    <Link href={`/worksheets/${id}`} className="block group">
      <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 rounded-2xl border-slate-200">
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image 
            src={coverImageUrl} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className="bg-white/90 text-indigo-600 hover:bg-white">{subject}</Badge>
            <Badge className="bg-orange-500 text-white hover:bg-orange-600">{gradeLevel}</Badge>
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-bold text-lg text-slate-800 line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">{title}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
          <div className="font-bold text-lg text-indigo-600">฿{price}</div>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
            <ShoppingCart className="w-4 h-4 mr-2" />
            เพิ่มลงตะกร้า
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
