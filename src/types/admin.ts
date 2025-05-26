
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  tags: string[];
  variants?: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  price_adjustment: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  parent_id?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'stripe' | 'mpesa' | 'paypal';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address: Address;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  variant?: ProductVariant;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface AdminStats {
  total_products: number;
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
}
