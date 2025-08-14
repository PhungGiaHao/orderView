import { Order, OrderDetail } from '../types/Order';

const API_URL = 'http://localhost:3001';

export const fetchOrders = async (page: number = 1, limit: number = 10): Promise<Order[]> => {
  try {
    // Fetch all orders and implement pagination on client side
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const allData = await response.json();
    
    // Implement pagination manually - make sure we're loading proper chunks
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    // Make sure we only return exactly 'limit' items for consistent pagination
    const data = allData.slice(startIndex, endIndex);
    
    console.log(`Fetching orders page ${page} (${startIndex}-${endIndex}):`, data.map((o: Order) => ({ id: o.id, name: o.customer_name })));
    
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

export const fetchOrderById = async (id: number): Promise<OrderDetail> => {
  try {
    const response = await fetch(`${API_URL}/order_details/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};

export const searchOrders = async (customerId?: string, status?: string): Promise<Order[]> => {
  try {
    let url = `${API_URL}/orders?`;
    
    if (customerId) {
      url += `customer_id=${customerId}&`;
    }
    
    if (status) {
      url += `status=${status}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching orders:', error);
    throw error;
  }
};
