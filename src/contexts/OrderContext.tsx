import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Order, OrderDetail, SearchFilters } from '../types/Order';
import { fetchOrders, fetchAllOrders, fetchOrderById, searchOrders } from '../api/orders';

interface OrderContextType {
  orders: Order[];
  selectedOrder: OrderDetail | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  filters: SearchFilters;
  hasMoreData: boolean;
  currentPage: number;
  fetchAllOrders: () => Promise<void>;
  loadMoreOrders: () => Promise<void>;
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
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchOrdersInitial = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentPage(1);
    setIsFiltering(false);
    try {
      console.log('Starting initial load...');
      const data = await fetchOrders(1, 10);
      console.log('Initial data received:', data.map(o => ({ id: o.id, name: o.customer_name })));
      setOrders(data);
      
      // Also fetch all orders for filtering and total count
      const allData = await fetchAllOrders();
      setAllOrders(allData);
      setTotalCount(allData.length);
      
      // Check if we have more data to load
      setHasMoreData(allData.length > 10);
      
      console.log('Initial load complete:', {
        loadedCount: data.length,
        totalCount: allData.length,
        hasMoreData: allData.length > 10,
        firstPageIds: data.map(o => o.id)
      });
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMoreOrders = useCallback(async () => {
    if (isLoadingMore || !hasMoreData || isFiltering) {
      console.log('Load more blocked:', { isLoadingMore, hasMoreData, isFiltering });
      return;
    }
    
    setIsLoadingMore(true);
    setError(null);
    try {
      const nextPage = currentPage + 1;
      console.log(`About to load page ${nextPage}, current orders:`, orders.map(o => ({ id: o.id, name: o.customer_name })));
      
      // Limit is fixed at 10 to ensure consistent chunk sizes
      const data = await fetchOrders(nextPage, 10);
      
      console.log(`Loading page ${nextPage}:`, {
        newItemsCount: data.length,
        currentItemsCount: orders.length,
        newItems: data.map(o => ({ id: o.id, name: o.customer_name }))
      });
      
      if (data.length === 0) {
        setHasMoreData(false);
        console.log('No more data available');
      } else {
        const newOrders = [...orders, ...data];
        console.log('Combined orders after merge:', newOrders.map(o => ({ id: o.id, name: o.customer_name })));
        
        setOrders(newOrders);
        setCurrentPage(nextPage);
        
        // Properly check if we've loaded all available data
        // Only set hasMoreData to false when we've loaded exactly all items
        const hasMore = newOrders.length < totalCount;
        setHasMoreData(hasMore);
        
        console.log('After load more:', {
          totalLoaded: newOrders.length,
          totalAvailable: totalCount,
          hasMore: hasMore,
          itemsLeft: totalCount - newOrders.length
        });
      }
    } catch (err) {
      setError('Failed to load more orders. Please try again.');
      console.error(err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMoreData, isFiltering, currentPage, orders, totalCount]);

  const fetchAllOrdersForUI = useCallback(async () => {
    await fetchOrdersInitial();
  }, [fetchOrdersInitial]);

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
    setIsFiltering(true);
    try {
      const data = await searchOrders(
        filters.customerId,
        filters.status
      );
      setOrders(data);
      setHasMoreData(false); // No pagination for filtered results
    } catch (err) {
      setError('Failed to search orders. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = (query: string) => {
    setIsFiltering(!!query.trim() || !!filters.status);
    
    if (!query.trim()) {
      // When search is empty, apply current status filter if exists, otherwise show all
      if (filters.status) {
        const statusFiltered = allOrders.filter(order => 
          order.status.toLowerCase() === filters.status?.toLowerCase()
        );
        setOrders(statusFiltered);
        setHasMoreData(false);
      } else {
        // Reset to initial paginated view
        setIsFiltering(false);
        fetchOrdersInitial();
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
    setHasMoreData(false); // No pagination for search results
  };

  const resetFilters = () => {
    setFilters({});
    setIsFiltering(false);
    fetchOrdersInitial(); // Reset to paginated view
  };

  useEffect(() => {
    fetchOrdersInitial();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        selectedOrder,
        isLoading,
        isLoadingMore,
        error,
        filters,
        hasMoreData,
        currentPage,
        fetchAllOrders: fetchAllOrdersForUI,
        loadMoreOrders,
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
