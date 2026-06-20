"use client";

import Link from "next/link"
import { useCartStore } from "@/store/useCartStore"
import { useEffect, useState } from "react"
import { logout } from "@/app/actions/auth"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function Navbar({ user }: { user?: SupabaseUser | null }) {
  const items = useCartStore((state) => state.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-surface border-b-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(28,27,27,1)] sticky top-0 z-50">
      <nav className="flex justify-between items-center px-lg py-md w-full max-w-container-max mx-auto">
        <div className="flex items-center gap-xl">
          <Link className="font-headline-lg text-headline-lg text-primary italic" href="/">
            EduAnime Market
          </Link>
          <div className="hidden lg:flex gap-md">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 font-label-sm text-label-sm" href="/">Browse</Link>
            <Link className="text-on-surface-variant font-medium hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform duration-200 font-label-sm text-label-sm" href="/">Bundles</Link>
            <Link className="text-on-surface-variant font-medium hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform duration-200 font-label-sm text-label-sm" href="/">Artists</Link>
            <Link className="text-on-surface-variant font-medium hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform duration-200 font-label-sm text-label-sm" href="/">Events</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-md">
          <Link href="/checkout" className="relative p-2 hover:bg-surface-container-high rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface">shopping_cart</span>
            {mounted && items.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center -mt-1 -mr-1 border-2 border-on-surface">
                {items.length}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-sm font-bold text-on-surface-variant hidden md:inline-block">
                {user.user_metadata?.full_name || user.email}
              </span>
              <button 
                onClick={() => logout()}
                className="px-md py-sm font-bold text-error hover:text-on-error hover:bg-error rounded transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="px-md py-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
                Log In
              </Link>
              <Link href="/register" className="bg-primary-container text-on-primary-container px-lg py-sm rounded-lg border-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(28,27,27,1)] font-bold hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all active:translate-y-0 active:translate-x-0 btn-hover">
                Join Now
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
