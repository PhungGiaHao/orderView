import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderDetail, OrderStatus, SearchFilters } from '../types/Order';
import { fetchOrders, fetchOrderById, searchOrders } from '../api/orders';

interface OrderContextType {
  orders: Order[];
  selectedOrder: OrderDetail | null;
  isLoading: boolean;
  error: string | null;
  filters: SearchFilters;
  fetchAllOrders: () => Promise<void>;
  getOrderById: (id: number) => Promise<void>;
  selectOrder: (id: number) => Promise<void>;
  clearSelectedOrder: () => void;
  setSearchFilters: (filters: SearchFilters) => void;
  applyFilters: () => Promise<void>;
  filterOrders: (query: string) => void;
  resetFilters: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]); // Keep original data
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});

  const fetchAllOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
      setAllOrders(data); // Store original data
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchOrderById(id);
      setSelectedOrder(data);
    } catch (err) {
      setError(`Failed to fetch order #${id}. Please try again.`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const selectOrder = async (id: number) => {
    await getOrderById(id);
  };

  const clearSelectedOrder = () => {
    setSelectedOrder(null);
  };

  const setSearchFilters = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchOrders(
        filters.customerId,
        filters.status
      );
      setOrders(data);
    } catch (err) {
      setError('Failed to search orders. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = (query: string) => {
    if (!query.trim()) {
      // When search is empty, apply current status filter if exists, otherwise show all
      if (filters.status) {
        const statusFiltered = allOrders.filter(order => 
          order.status.toLowerCase() === filters.status?.toLowerCase()
        );
        setOrders(statusFiltered);
      } else {
        setOrders(allOrders);
      }
      return;
    }

    // Apply search query filter
    let baseOrders = allOrders;
    
    // First apply status filter if exists
    if (filters.status) {
      baseOrders = allOrders.filter(order => 
        order.status.toLowerCase() === filters.status?.toLowerCase()
      );
    }

    // Then apply text search on the filtered results
    const filtered = baseOrders.filter(order => 
      order.customer_id.toString().includes(query) ||
      order.customer_name.toLowerCase().includes(query.toLowerCase()) ||
      order.status.toLowerCase().includes(query.toLowerCase())
    );
    setOrders(filtered);
  };

  const resetFilters = () => {
    setFilters({});
    setOrders(allOrders);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        selectedOrder,
        isLoading,
        error,
        filters,
        fetchAllOrders,
        getOrderById,
        selectOrder,
        clearSelectedOrder,
        setSearchFilters,
        applyFilters,
        filterOrders,
        resetFilters,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
