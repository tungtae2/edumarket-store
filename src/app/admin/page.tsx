import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, FileText, ShoppingBag } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient();
  
  // Fetch Orders
  const { data: orders } = await supabase.from('orders').select('*');
  const { data: worksheets } = await supabase.from('worksheets').select('*').order('sales_count', { ascending: false });

  // Calculate Metrics
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const safeOrders = (orders as any[]) || [];
  const safeWorksheets = (worksheets as any[]) || [];

  const todaySales = safeOrders
    .filter(o => new Date(o.created_at) >= today && o.payment_status === 'completed')
    .reduce((sum, o) => sum + o.total_amount, 0);
    
  const monthSales = safeOrders
    .filter(o => new Date(o.created_at) >= thisMonth && o.payment_status === 'completed')
    .reduce((sum, o) => sum + o.total_amount, 0);

  const totalViews = safeWorksheets.reduce((sum, w) => sum + (w.views || 0), 0);
  const totalItemsSold = safeWorksheets.reduce((sum, w) => sum + (w.sales_count || 0), 0);

  const topSelling = safeWorksheets.slice(0, 3);
  const pendingOrders = safeOrders
    .filter(o => o.payment_status === 'pending')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">ยอดขายวันนี้</CardTitle>
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">฿ {todaySales.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">ยอดขายเดือนนี้</CardTitle>
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">฿ {monthSales.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">จำนวนคนเข้าเว็บทั้งหมด</CardTitle>
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">สินค้าที่ขายได้ทั้งหมด</CardTitle>
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalItemsSold.toLocaleString()}</div>
            <p className="text-xs text-slate-500 font-medium mt-1">ชิ้น</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">สินค้าขายดี (Top Selling)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topSelling.length > 0 ? topSelling.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 max-w-[200px] truncate">{item.title}</p>
                      <p className="text-sm text-slate-500">ขายแล้ว {item.sales_count} ชิ้น</p>
                    </div>
                  </div>
                  <div className="font-bold text-indigo-600">฿{item.price}</div>
                </div>
              )) : <div className="text-slate-500 text-sm">ยังไม่มีข้อมูล</div>}
            </div>
          </CardContent>
        </Card>

        {/* Recent Pending Orders */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              รายการที่รอตรวจสอบ <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{pendingOrders.length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pendingOrders.length > 0 ? pendingOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-slate-800">#{order.id.split('-')[0]} - {order.customer_name}</p>
                    <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString('th-TH')}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 mb-1">฿{order.total_amount}</div>
                    <span className="text-xs font-medium bg-orange-100 text-orange-600 px-2 py-1 rounded-full">รอตรวจสอบ</span>
                  </div>
                </div>
              )) : <div className="text-slate-500 text-sm">ไม่มีรายการรอตรวจสอบ</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
