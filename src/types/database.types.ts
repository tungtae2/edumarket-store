export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      worksheets: {
        Row: {
          id: string
          title: string
          description: string | null
          subject: string
          grade_level: string
          price: number
          cover_image_url: string | null
          preview_pdf_url: string | null
          full_pdf_url: string | null
          views: number
          sales_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          subject: string
          grade_level: string
          price: number
          cover_image_url?: string | null
          preview_pdf_url?: string | null
          full_pdf_url?: string | null
          views?: number
          sales_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          subject?: string
          grade_level?: string
          price?: number
          cover_image_url?: string | null
          preview_pdf_url?: string | null
          full_pdf_url?: string | null
          views?: number
          sales_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_name: string
          customer_email: string
          total_amount: number
          payment_status: string
          slip_image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          customer_email: string
          total_amount: number
          payment_status?: string
          slip_image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          customer_email?: string
          total_amount?: number
          payment_status?: string
          slip_image_url?: string | null
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          worksheet_id: string
          price: number
        }
        Insert: {
          id?: string
          order_id: string
          worksheet_id: string
          price: number
        }
        Update: {
          id?: string
          order_id?: string
          worksheet_id?: string
          price?: number
        }
      }
      worksheet_views: {
        Row: {
          id: string
          worksheet_id: string
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          worksheet_id: string
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          worksheet_id?: string
          ip_address?: string | null
          created_at?: string
        }
      }
      downloads: {
        Row: {
          id: string
          order_id: string
          worksheet_id: string
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          worksheet_id: string
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          worksheet_id?: string
          created_at?: string
        }
      }
    }
  }
}
