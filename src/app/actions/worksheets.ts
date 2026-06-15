"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteWorksheet(id: string) {
  const supabase = createServerSupabaseClient();
  
  try {
    const { error } = await supabase.from('worksheets').delete().eq('id', id);
    if (error) throw error;
    
    revalidatePath("/admin/worksheets");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting worksheet:", error);
    return { success: false, error: error.message };
  }
}
