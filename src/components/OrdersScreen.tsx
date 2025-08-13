import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useOrders } from '../contexts/OrderContext';
import { OrderStatus } from '../types/Order';
import Button from './Button';

const OrdersScreen = () => {
  const { orders, getOrderById, isLoading, error, selectedOrder, filters, setSearchFilters, applyFilters } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');

  const handleStatusFilter = (status: OrderStatus | '') => {
    setSelectedStatus(status);
    setSearchFilters({
      ...filters,
      status: status || undefined
    });
    applyFilters();
  };

  const handleViewDetails = (id: number) => {
    getOrderById(id);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.orderItem}
      onPress={() => handleViewDetails(item.id)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.customerInfo}>
          <Image 
            source={{ uri: item.avatar }}
            style={styles.avatar}
          />
          <View style={styles.customerDetails}>
            <Text style={styles.customerName}>{item.customer_name}</Text>
            <Text style={styles.customerId}>Customer ID: {item.customer_id}</Text>
          </View>
        </View>
        <Text style={[styles.status, 
          item.status === 'delivered' ? styles.delivered : 
          item.status === 'shipped' ? styles.shipped :
          item.status === 'cancelled' ? styles.cancelled : 
          styles.pending
        ]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      
      <View style={styles.orderDetails}>
        <Text>Order ID: {item.id}</Text>
        <Text>Date: {item.order_date}</Text>
        <Text style={styles.total}>Total: ${item.total_amount.toFixed(2)}</Text>
      </View>
      
      <View style={styles.actions}>
        <Button 
          title="View Details" 
          onPress={() => handleViewDetails(item.id)} 
        />
        {item.status === 'pending' && (
          <Button 
            title="Cancel" 
            onPress={() => console.log(`Cancel order ${item.id}`)} 
            color="#FF5252"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderStatusFilters = () => (
    <View style={styles.statusFilters}>
      <TouchableOpacity 
        style={[styles.filterChip, selectedStatus === '' && styles.activeFilter]} 
        onPress={() => handleStatusFilter('')}
      >
        <Text style={[styles.filterText, selectedStatus === '' && styles.activeFilterText]}>All</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.filterChip, selectedStatus === 'pending' && styles.activeFilter]} 
        onPress={() => handleStatusFilter('pending')}
      >
        <Text style={[styles.filterText, selectedStatus === 'pending' && styles.activeFilterText]}>Pending</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.filterChip, selectedStatus === 'shipped' && styles.activeFilter]} 
        onPress={() => handleStatusFilter('shipped')}
      >
        <Text style={[styles.filterText, selectedStatus === 'shipped' && styles.activeFilterText]}>Shipped</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.filterChip, selectedStatus === 'delivered' && styles.activeFilter]} 
        onPress={() => handleStatusFilter('delivered')}
      >
        <Text style={[styles.filterText, selectedStatus === 'delivered' && styles.activeFilterText]}>Delivered</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.filterChip, selectedStatus === 'cancelled' && styles.activeFilter]} 
        onPress={() => handleStatusFilter('cancelled')}
      >
        <Text style={[styles.filterText, selectedStatus === 'cancelled' && styles.activeFilterText]}>Cancelled</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderStatusFilters()}
      
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => applyFilters()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#F44336',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#1976d2',
    padding: 10,
    borderRadius: 4,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  statusFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
  },
  activeFilter: {
    backgroundColor: '#1976d2',
  },
  filterText: {
    fontSize: 14,
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 16,
  },
  orderItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  customerDetails: {
    justifyContent: 'center',
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerId: {
    fontSize: 12,
    color: '#666',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    overflow: 'hidden',
  },
  pending: {
    backgroundColor: '#FFC107',
    color: '#212121',
  },
  shipped: {
    backgroundColor: '#2196F3',
    color: 'white',
  },
  delivered: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  cancelled: {
    backgroundColor: '#F44336',
    color: 'white',
  },
  orderDetails: {
    marginBottom: 16,
  },
  total: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OrdersScreen;
