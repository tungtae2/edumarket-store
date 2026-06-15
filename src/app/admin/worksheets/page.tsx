import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminWorksheetsPage() {
  const supabase = createServerSupabaseClient();
  const { data: dbWorksheets } = await supabase.from('worksheets').select('*').order('created_at', { ascending: false });
  const worksheets = (dbWorksheets as any[]) || [];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">จัดการใบงาน (Worksheets)</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> เพิ่มใบงานใหม่
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ชื่อใบงาน</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead className="text-right">ราคา</TableHead>
              <TableHead className="text-right">ยอดขาย (ชิ้น)</TableHead>
              <TableHead className="text-right">ยอดวิว</TableHead>
              <TableHead className="text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {worksheets.length > 0 ? worksheets.map((ws) => (
              <TableRow key={ws.id}>
                <TableCell className="font-medium text-slate-500 text-xs">{ws.id.split('-')[0]}</TableCell>
                <TableCell className="font-bold text-slate-800">{ws.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-slate-600 bg-slate-50">{ws.subject}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-indigo-600">฿{ws.price}</TableCell>
                <TableCell className="text-right text-slate-600">{ws.sales_count}</TableCell>
                <TableCell className="text-right text-slate-600">{ws.views}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" className="text-slate-500 hover:text-indigo-600">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-slate-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                  ไม่มีข้อมูลใบงาน
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
