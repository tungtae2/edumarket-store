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
      <Card className="overflow-hidden flex flex-col h-full manga-border shadow-manga shadow-manga-hover transition-all duration-300 bg-white">
        <div className="relative h-48 w-full overflow-hidden bg-primary/10 border-b-2 border-black">
          <Image 
            src={coverImageUrl} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className="bg-white text-black manga-border border-[1px] font-bold shadow-[2px_2px_0_0_#000]">{subject}</Badge>
            <Badge className="bg-secondary text-black manga-border border-[1px] font-bold shadow-[2px_2px_0_0_#000]">{gradeLevel}</Badge>
          </div>
        </div>
        <CardContent className="p-4 flex-grow bg-white">
          <h3 className="font-bold text-lg text-black line-clamp-2 mb-1 group-hover:text-primary transition-colors">{title}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto bg-white">
          <div className="font-bold text-xl text-primary drop-shadow-[1px_1px_0_#000]">฿{price}</div>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold manga-border shadow-manga shadow-manga-hover shadow-manga-active">
            <ShoppingCart className="w-4 h-4 mr-2" />
            เพิ่มลงตะกร้า
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
