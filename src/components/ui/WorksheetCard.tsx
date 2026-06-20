"use client"

import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/store/useCartStore"

interface WorksheetCardProps {
  id: string
  title: string
  subject: string
  gradeLevel: string
  price: number
  coverImageUrl: string
}

export function WorksheetCard({ id, title, subject, gradeLevel, price, coverImageUrl }: WorksheetCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id,
      title,
      price,
      coverImageUrl
    })
  }

  return (
    <Link href={`/worksheets/${id}`} className="block">
      <article className="bg-surface-container-lowest border-2 border-on-surface rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(28,27,27,1)] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(28,27,27,1)] h-full flex flex-col">
        <div className="h-4 w-full bg-secondary-container border-b-2 border-on-surface flex-shrink-0"></div>
        <div className="aspect-video relative border-b-2 border-on-surface flex-shrink-0">
          <Image 
            src={coverImageUrl} 
            alt={title}
            fill
            className="object-cover"
          />
          <span className="absolute top-2 right-2 bg-surface px-2 py-1 rounded border-2 border-on-surface text-xs font-bold">PDF</span>
        </div>
        <div className="p-md space-y-sm flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-on-surface leading-tight line-clamp-2">{title}</h3>
            <div className="flex items-center text-secondary ml-2 flex-shrink-0">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-xs font-bold ml-1">4.9</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant line-clamp-1">{subject} • {gradeLevel}</p>
          <div className="flex justify-between items-center pt-md mt-auto">
            <span className="font-headline-lg-mobile text-primary">{price} THB</span>
            <button 
              onClick={handleAddToCart}
              className="bg-primary text-on-primary p-2 rounded-lg border-2 border-on-surface shadow-[2px_2px_0px_0px_rgba(28,27,27,1)] hover:bg-primary-container hover:text-on-primary-container transition-all"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}
