"use client";

import { useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, Copy } from "lucide-react";

// Mock Orders
const MOCK_ORDERS = [
  { id: "1004", name: "คุณสมชาย", email: "somchai@email.com", amount: 85, status: "pending", date: "2026-06-15 11:30", slipUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400&auto=format&fit=crop" },
  { id: "1003", name: "คุณมาลี", email: "malee@email.com", amount: 50, status: "pending", date: "2026-06-15 10:15", slipUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400&auto=format&fit=crop" },
  { id: "1002", name: "คุณก้องเกียรติ", email: "kong@email.com", amount: 130, status: "completed", date: "2026-06-14 15:40", slipUrl: null },
  { id: "1001", name: "คุณวิภา", email: "wipa@email.com", amount: 35, status: "completed", date: "2026-06-14 09:20", slipUrl: null },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSlipModal = (order: typeof MOCK_ORDERS[0]) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleApprove = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: "completed" } : o));
    setIsModalOpen(false);
    alert(`อนุมัติคำสั่งซื้อ #${orderId} เรียบร้อยแล้ว ระบบจะส่งอีเมลพร้อมลิงก์ดาวน์โหลดให้ลูกค้า`);
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert("คัดลอกอีเมลเรียบร้อย");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">จัดการคำสั่งซื้อ (Orders)</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>วันที่-เวลา</TableHead>
              <TableHead>ลูกค้า</TableHead>
              <TableHead>อีเมล</TableHead>
              <TableHead className="text-right">ยอดรวม</TableHead>
              <TableHead className="text-center">สถานะ</TableHead>
              <TableHead className="text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-slate-900">#{order.id}</TableCell>
                <TableCell className="text-slate-500">{order.date}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">{order.email}</span>
                    <button onClick={() => copyEmail(order.email)} className="text-slate-400 hover:text-indigo-600">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-slate-800">฿{order.amount}</TableCell>
                <TableCell className="text-center">
                  {order.status === 'pending' ? (
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none">รอตรวจสอบ</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">สำเร็จแล้ว</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {order.status === 'pending' ? (
                    <Button onClick={() => openSlipModal(order)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                      <Eye className="w-4 h-4 mr-2" /> ตรวจสอบสลิป
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled className="rounded-lg">
                      <Check className="w-4 h-4 mr-2 text-green-500" /> อนุมัติแล้ว
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">ตรวจสอบสลิปโอนเงิน</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-slate-500">Order ID:</p>
                  <p className="font-bold text-slate-800">#{selectedOrder.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500">ยอดที่ต้องโอน:</p>
                  <p className="font-bold text-indigo-600 text-lg">฿{selectedOrder.amount}</p>
                </div>
              </div>

              <div className="relative w-full aspect-[1/2] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                {selectedOrder.slipUrl ? (
                  <Image src={selectedOrder.slipUrl} alt="Slip" fill className="object-contain" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">ไม่มีรูปสลิป</div>
                )}
              </div>

              <Button onClick={() => handleApprove(selectedOrder.id)} className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-6 font-bold text-lg">
                <Check className="w-5 h-5 mr-2" /> อนุมัติและส่งไฟล์ (Approve)
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
