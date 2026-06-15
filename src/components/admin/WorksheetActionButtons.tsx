"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteWorksheet } from "@/app/actions/worksheets";
import { useRouter } from "next/navigation";

interface Props {
  worksheetId: string;
}

export function WorksheetActionButtons({ worksheetId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("คุณต้องการลบใบงานนี้ใช่หรือไม่? ข้อมูลจะถูกลบอย่างถาวร")) {
      setIsDeleting(true);
      const res = await deleteWorksheet(worksheetId);
      setIsDeleting(false);
      
      if (res.success) {
        alert("ลบข้อมูลสำเร็จ");
      } else {
        alert("เกิดข้อผิดพลาดในการลบ: " + res.error);
      }
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/worksheets/${worksheetId}`} target="_blank">
        <Button variant="outline" size="icon" className="text-slate-500 hover:text-green-600 bg-white" title="ดูหน้าร้าน">
          <Eye className="w-4 h-4" />
        </Button>
      </Link>
      
      <Link href={`/admin/worksheets/${worksheetId}/edit`}>
        <Button variant="outline" size="icon" className="text-slate-500 hover:text-indigo-600 bg-white" title="แก้ไข">
          <Edit className="w-4 h-4" />
        </Button>
      </Link>

      <Button 
        variant="outline" 
        size="icon" 
        className="text-slate-500 hover:text-red-600 bg-white" 
        onClick={handleDelete}
        disabled={isDeleting}
        title="ลบ"
      >
        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </Button>
    </div>
  );
}
