import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, FileText, ShoppingBag } from "lucide-react";

export default function AdminDashboardPage() {
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
            <div className="text-2xl font-bold text-slate-800">฿ 2,500</div>
            <p className="text-xs text-green-600 font-medium mt-1">+12% จากเมื่อวาน</p>
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
            <div className="text-2xl font-bold text-slate-800">฿ 34,500</div>
            <p className="text-xs text-indigo-600 font-medium mt-1">+5% จากเดือนที่แล้ว</p>
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
            <div className="text-2xl font-bold text-slate-800">15,420</div>
            <p className="text-xs text-slate-500 font-medium mt-1">อัปเดตล่าสุด 1 ชม. ที่แล้ว</p>
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
            <div className="text-2xl font-bold text-slate-800">420</div>
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
              {[
                { title: "ชุดใบงานคณิตศาสตร์ ป.1 - การบวกและลบ", sales: 340, price: 50 },
                { title: "สมุดคัดลายมือภาษาไทย พยัญชนะ ก-ฮ", sales: 200, price: 35 },
                { title: "ใบงานวิทยาศาสตร์ ป.3 - วัฏจักรชีวิต", sales: 150, price: 45 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-500">ขายแล้ว {item.sales} ชิ้น</p>
                    </div>
                  </div>
                  <div className="font-bold text-indigo-600">฿{item.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Pending Orders */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              รายการที่รอตรวจสอบ <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">3</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { id: "#1004", name: "คุณสมชาย", amount: 85, time: "10 นาทีที่แล้ว" },
                { id: "#1003", name: "คุณมาลี", amount: 50, time: "1 ชั่วโมงที่แล้ว" },
                { id: "#1002", name: "คุณก้องเกียรติ", amount: 130, time: "3 ชั่วโมงที่แล้ว" },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-slate-800">{order.id} - {order.name}</p>
                    <p className="text-sm text-slate-500">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 mb-1">฿{order.amount}</div>
                    <span className="text-xs font-medium bg-orange-100 text-orange-600 px-2 py-1 rounded-full">รอตรวจสอบ</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
