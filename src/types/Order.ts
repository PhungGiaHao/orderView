export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: number;
  customer_id: number;
  customer_name: string;
  order_date: string;
  status: OrderStatus;
  total_amount: number;
  avatar: string;
}

export interface ProductLine {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  image: string;
}

export interface OrderDetail extends Order {
  lines: ProductLine[];
}

export interface SearchFilters {
  customerId?: string;
  status?: OrderStatus;
}
