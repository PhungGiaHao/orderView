import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Order, OrderDetail } from '@/types/Order';
import { useOrders } from '@/contexts/OrderContext';
import { useUI } from '@/contexts/UIContext';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import IconSvg from '../../components/ui/IconSvg';

interface OrderListItemProps {
  order: Order;
}

export const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  const { selectOrder } = useOrders();
  const { setActiveScreen } = useUI();
  const { isTablet, isDesktop } = useResponsiveLayout();
  
  const handlePress = () => {
    selectOrder(order.id);
    setActiveScreen('orders');
  };
  
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#10b981'; // green
      case 'processing':
      case 'shipped':
        return '#3b82f6'; // blue
      case 'pending':
        return '#f59e0b'; // amber
      case 'cancelled':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.orderHeader}>
        <View style={styles.idContainer}>
          <IconSvg name="receipt" size={16} color="#666" style={styles.icon} />
          <Text style={styles.orderIdText}>#{order.id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      
      <View style={styles.customerInfo}>
        <View style={styles.infoRow}>
          <IconSvg name="person" size={16} color="#666" style={styles.icon} />
          <Text style={styles.customerText}>{order.customer_name}</Text>
        </View>
        <View style={styles.infoRow}>
          <IconSvg name="calendar" size={16} color="#666" style={styles.icon} />
          <Text style={styles.dateText}>{new Date(order.order_date).toLocaleDateString()}</Text>
        </View>
      </View>
      
      {/* Products preview will be shown in OrderDetail component */}

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          <IconSvg name="money" size={16} color="#000" />
          {order.total_amount.toFixed(2)}
        </Text>
        <IconSvg name="chevron-right" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIdText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  customerInfo: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  customerText: {
    fontSize: 14,
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  productPreview: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  productItem: {
    marginRight: 12,
    alignItems: 'center',
    width: 60,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginBottom: 4,
  },
  productName: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
  },
  moreContainer: {
    justifyContent: 'center',
  },
  moreText: {
    fontSize: 10,
    color: '#666',
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
});
