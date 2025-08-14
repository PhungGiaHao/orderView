import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { OrderListItem } from '@/components/order/OrderListItem';
import { FAB } from '@/components/ui/FAB';
import { useOrders } from '@/contexts/OrderContext';
import { useUI } from '@/contexts/UIContext';
import { Order } from '@/types/Order';
import IconSvg from '@/components/ui/IconSvg';

export const OrdersScreen: React.FC = () => {
  const { 
    orders, 
    fetchAllOrders, 
    loadMoreOrders, 
    isLoading, 
    isLoadingMore, 
    hasMoreData, 
    error 
  } = useOrders();
  const { openModal, closeModal } = useUI();
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isLoadingDebounce, setIsLoadingDebounce] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);
  
  const handleAddNewOrder = () => {
    openModal(
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Create New Order</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <IconSvg name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.modalBody}>
          <Text style={styles.modalText}>
            Fill in the details below to create a new order:
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Customer Name</Text>
            <View style={styles.inputContainer}>
              <IconSvg name="person" size={16} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter customer name"
                value={customerName}
                onChangeText={setCustomerName}
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Product Name</Text>
            <View style={styles.inputContainer}>
              <IconSvg name="shopping-cart" size={16} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter product name"
                value={productName}
                onChangeText={setProductName}
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quantity</Text>
            <View style={styles.inputContainer}>
              <IconSvg name="basket" size={16} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>
          </View>
          
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.cancelButton]} 
              onPress={closeModal}
            >
              <IconSvg name="cancel" size={16} color="#666" />
              <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.createButton]} 
              onPress={() => {
                // This is a dummy action - just close the modal
                alert('Order created successfully! (This is a dummy action)');
                setCustomerName('');
                setProductName('');
                setQuantity('');
                closeModal();
              }}
            >
              <IconSvg name="check-circle" size={16} color="#fff" />
              <Text style={[styles.actionButtonText, styles.createButtonText]}>Create Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Order }) => {
    return <OrderListItem order={item} />;
  };

  const handleLoadMore = () => {
    console.log('HandleLoadMore called:', {
      hasMoreData,
      isLoadingMore,
      isLoading,
      isLoadingDebounce,
      ordersCount: orders.length
    });
    
    if (hasMoreData && !isLoadingMore && !isLoading && !isLoadingDebounce) {
      console.log('Initiating load more...');
      // Set debounce flag to prevent multiple rapid calls
      setIsLoadingDebounce(true);
      
      // Add small delay before starting load to ensure UI responsiveness
      setTimeout(() => {
        loadMoreOrders().finally(() => {
          // Add a reasonable delay after loading to prevent rapid successive calls
          // This ensures the user can see each batch loaded before requesting more
          setTimeout(() => {
            setIsLoadingDebounce(false);
          }, 1500); // Increased debounce time for better user experience
        });
      }, 100);
    } else {
      console.log('Load more blocked by conditions');
    }
  };

  const renderFooter = () => {
    if (!hasMoreData && orders.length > 0) {
      return (
        <View style={styles.footerLoader}>
          <Text style={styles.footerText}>No more orders to load</Text>
        </View>
      );
    }
    
    if (!isLoadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#2563eb" />
        <Text style={styles.footerText}>Loading more orders...</Text>
      </View>
    );
  };

  if (isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />
      <FAB 
        onPress={() => handleAddNewOrder()} 
        icon="add"
        label=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Extra padding for FAB
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    padding: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 0.48,
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  createButton: {
    backgroundColor: '#2563eb',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  cancelButtonText: {
    color: '#666',
  },
  createButtonText: {
    color: '#fff',
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});
