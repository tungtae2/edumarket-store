import Image from "next/image";
import Link from "next/link";
import { WorksheetCard } from "@/components/ui/WorksheetCard";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const { data: dbWorksheets } = await supabase.from('worksheets').select('*').order('created_at', { ascending: false });

  // Use real DB data
  const worksheets = dbWorksheets && dbWorksheets.length > 0 ? (dbWorksheets as any[]).map((w: any) => ({
    id: w.id,
    title: w.title,
    subject: w.subject,
    gradeLevel: w.grade_level,
    price: w.price,
    coverImageUrl: w.cover_image_url || "/hero_illustration.png"
  })) : [];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative bg-primary-fixed py-xl md:py-32 overflow-hidden border-b-2 border-on-surface">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#00677d 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>
        <div className="max-w-container-max mx-auto px-lg relative z-10 flex flex-col md:flex-row items-center gap-xl">
          <div className="w-full md:w-1/2 space-y-md">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container px-md py-1 rounded-full text-label-sm font-label-sm border-2 border-on-surface">New Arrivals!</span>
            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
              เรียนรู้สนุกกับ<br/><span className="text-primary underline decoration-secondary-container decoration-8">ใบงานสไตล์อนิเมะ!</span>
            </h1>
            <p className="text-body-md text-on-surface-variant max-w-md">
              เปลี่ยนการเรียนให้เป็นเรื่องน่าตื่นเต้นด้วยใบงานคุณภาพสูงที่ออกแบบโดยศิลปินสายอนิเมะ ครอบคลุมวิชาหลักและทักษะพิเศษ
            </p>
            <div className="flex flex-wrap gap-md pt-md">
              <button className="bg-secondary-container text-on-secondary-container px-xl py-md rounded-xl border-2 border-on-surface shadow-[6px_6px_0px_0px_rgba(28,27,27,1)] font-headline-lg text-headline-lg-mobile hover:-translate-y-1 hover:-translate-x-1 transition-all">
                Browse Now
              </button>
              <button className="bg-surface text-on-surface px-xl py-md rounded-xl border-2 border-on-surface hover:bg-surface-container-low transition-colors font-bold">
                Free Samples
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="bg-surface-container-lowest border-2 border-on-surface rounded-2xl shadow-[12px_12px_0px_0px_#fdd404] overflow-hidden aspect-[4/3] relative">
              <Image 
                src="/hero_illustration.png"
                alt="Anime student learning"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 bg-tertiary text-on-tertiary p-md rounded-full border-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(28,27,27,1)] animate-bounce">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-container-max mx-auto px-lg flex flex-col md:flex-row py-xl gap-xl">
        {/* SideNavBar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-28 bg-surface-container-lowest border-2 border-on-surface rounded-xl p-md">
            <div className="flex items-center gap-sm mb-md pb-md border-b-2 border-on-surface">
              <div className="w-10 h-10 rounded-full border-2 border-on-surface bg-primary-fixed overflow-hidden relative">
                <Image 
                  src="/hero_illustration.png"
                  alt="Mascot avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-headline-lg-mobile text-on-surface text-lg">Library</h3>
                <p className="text-label-sm text-on-surface-variant">Find your path</p>
              </div>
            </div>
            <ul className="space-y-sm">
              <li>
                <Link className="flex items-center gap-sm text-on-secondary-container font-bold border-l-4 border-secondary-container pl-2 py-2 hover:bg-surface-container-highest transition-colors" href="#">
                  <span className="material-symbols-outlined">grid_view</span>
                  <span>All Subjects</span>
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-sm text-on-surface-variant hover:text-primary pl-2 py-2 hover:bg-surface-container-highest transition-colors transition-transform hover:translate-x-1" href="#">
                  <span className="material-symbols-outlined">calculate</span>
                  <span>Mathematics</span>
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-sm text-on-surface-variant hover:text-primary pl-2 py-2 hover:bg-surface-container-highest transition-colors transition-transform hover:translate-x-1" href="#">
                  <span className="material-symbols-outlined">biotech</span>
                  <span>Science & Tech</span>
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-sm text-on-surface-variant hover:text-primary pl-2 py-2 hover:bg-surface-container-highest transition-colors transition-transform hover:translate-x-1" href="#">
                  <span className="material-symbols-outlined">palette</span>
                  <span>Arts & Crafts</span>
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-sm text-on-surface-variant hover:text-primary pl-2 py-2 hover:bg-surface-container-highest transition-colors transition-transform hover:translate-x-1" href="#">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  <span>Japanese Culture</span>
                </Link>
              </li>
            </ul>
            <div className="mt-xl p-md bg-secondary-container rounded-lg border-2 border-on-surface">
              <p className="font-bold text-on-secondary-container mb-sm">Get All Access</p>
              <button className="w-full bg-on-surface text-surface py-2 rounded font-bold text-label-sm">Premium Pass</button>
            </div>
          </div>
        </aside>

        {/* Worksheet Grid */}
        <section className="flex-grow">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h2 className="font-headline-lg text-on-surface">ใบงานยอดนิยม</h2>
              <p className="text-on-surface-variant">เริ่มการเรียนรู้ที่สนุกที่สุดได้ที่นี่</p>
            </div>
            <div className="flex gap-sm">
              <button className="p-sm border-2 border-on-surface bg-surface rounded hover:bg-surface-container-high">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
          
          {worksheets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
              {worksheets.map((ws) => (
                <WorksheetCard key={ws.id} {...ws} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border-2 border-on-surface">
              <h3 className="text-2xl font-bold text-on-surface-variant mb-2">ยังไม่มีใบงานในระบบ</h3>
              <p className="text-on-surface-variant">รอติดตามผลงานใหม่ๆ ได้เร็วๆ นี้ครับ</p>
            </div>
          )}

          {/* Load More Button */}
          {worksheets.length > 0 && (
            <div className="mt-xl text-center">
              <button className="bg-surface-container-high text-on-surface px-xl py-md rounded-xl border-2 border-on-surface font-bold hover:bg-surface-dim transition-colors">
                ดูใบงานทั้งหมด
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-lg right-lg bg-secondary-container text-on-secondary-container p-md rounded-full border-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(28,27,27,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all z-40 group">
        <span className="material-symbols-outlined text-2xl">help_center</span>
        <span className="absolute right-full mr-md top-1/2 -translate-y-1/2 bg-on-surface text-surface px-md py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">ติดต่อสอบถาม</span>
      </button>
    </main>
  );
}
