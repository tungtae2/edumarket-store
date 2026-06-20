import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t-2 border-on-surface">
      <div className="w-full px-lg py-xl flex flex-col md:flex-row justify-between items-center gap-md max-w-container-max mx-auto">
        <div className="flex flex-col items-center md:items-start gap-xs">
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface italic">EduAnime Market</span>
          <p className="text-on-surface-variant font-label-sm text-label-sm">© 2024 EduAnime Market. Created with creative optimism.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-md">
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">About Us</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Terms of Service</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Privacy Policy</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Support</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Artist Guidelines</Link>
        </div>
        <div className="flex gap-sm">
          <Link className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-on-surface bg-surface hover:scale-105 transition-transform" href="#">
            <span className="material-symbols-outlined text-on-surface">share</span>
          </Link>
          <Link className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-on-surface bg-surface hover:scale-105 transition-transform" href="#">
            <span className="material-symbols-outlined text-on-surface">mail</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
