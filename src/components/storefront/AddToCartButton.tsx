"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface AddToCartButtonProps {
  user?: SupabaseUser | null;
  worksheet: {
    id: string;
    title: string;
    price: number;
  };
}

export function AddToCartButton({ user, worksheet }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const isAlreadyInCart = items.some((item) => item.id === worksheet.id);

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!isAlreadyInCart) {
      addItem({
        id: worksheet.id,
        title: worksheet.title,
        price: worksheet.price,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <Button 
      onClick={handleAddToCart}
      disabled={isAlreadyInCart}
      className={`rounded-2xl py-6 text-lg font-bold manga-border shadow-manga transition-all w-full
        ${isAlreadyInCart 
          ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
          : "bg-primary hover:bg-primary/90 text-white hover:shadow-manga-hover hover:translate-x-[-2px] hover:translate-y-[-2px]"
        }`}
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      {added ? "เพิ่มลงตะกร้าแล้ว!" : isAlreadyInCart ? "มีในตะกร้าแล้ว" : "เพิ่มลงตะกร้า"}
    </Button>
  );
}
