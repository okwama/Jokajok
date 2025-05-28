export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image: string | null
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          description: string | null
          id: string
          mpesa_transaction_id: string | null
          order_id: string | null
          payment_method: string | null
          stripe_payment_intent_id: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          mpesa_transaction_id?: string | null
          order_id?: string | null
          payment_method?: string | null
          stripe_payment_intent_id?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          mpesa_transaction_id?: string | null
          order_id?: string | null
          payment_method?: string | null
          stripe_payment_intent_id?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          movement_type: string
          product_id: string | null
          quantity: number
          reason: string | null
          reference_id: string | null
          reference_type: string | null
          variant_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          movement_type: string
          product_id?: string | null
          quantity: number
          reason?: string | null
          reference_id?: string | null
          reference_type?: string | null
          variant_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          movement_type?: string
          product_id?: string | null
          quantity?: number
          reason?: string | null
          reference_id?: string | null
          reference_type?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          price: number
          product_id: string | null
          product_name: string
          quantity: number
          variant_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          price: number
          product_id?: string | null
          product_name: string
          quantity: number
          variant_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          created_at: string
          delivered_at: string | null
          id: string
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_status: string | null
          shipped_at: string | null
          shipping_address: Json | null
          status: string | null
          total: number
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          delivered_at?: string | null
          id?: string
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_status?: string | null
          shipped_at?: string | null
          shipping_address?: Json | null
          status?: string | null
          total: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          delivered_at?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_status?: string | null
          shipped_at?: string | null
          shipping_address?: Json | null
          status?: string | null
          total?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          color: string | null
          created_at: string
          id: string
          price_adjustment: number | null
          product_id: string | null
          size: string | null
          sku: string | null
          stock: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          price_adjustment?: number | null
          product_id?: string | null
          size?: string | null
          sku?: string | null
          stock?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          price_adjustment?: number | null
          product_id?: string | null
          size?: string | null
          sku?: string | null
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          images: string[] | null
          name: string
          price: number
          rating: number | null
          reviews_count: number | null
          sku: string | null
          stock: number | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          name: string
          price: number
          rating?: number | null
          reviews_count?: number | null
          sku?: string | null
          stock?: number | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          name?: string
          price?: number
          rating?: number | null
          reviews_count?: number | null
          sku?: string | null
          stock?: number | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          id: string
          name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
