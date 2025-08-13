import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useUI } from '@/contexts/UIContext';
import { useOrders } from '@/contexts/OrderContext';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

// Screens
import { HomeScreen } from '@/screens/HomeScreen';
import { OrdersScreen } from '@/screens/OrdersScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import OrderDetailScreen from '@/screens/OrderDetailScreen';

// Components
import Header from '@/components/Header';
import Drawer from '@/components/Drawer';
import Modal from '@/components/Modal';
import { FAB } from '@/components/ui/FAB';

const Navigation: React.FC = () => {
  const { activeScreen, setActiveScreen } = useUI();
  const { selectedOrder } = useOrders();
  const { isDesktop } = useResponsiveLayout();

  // Render the active screen based on navigation state
  const renderScreen = () => {
    if (selectedOrder && activeScreen === 'orders') {
      return <OrderDetailScreen />;
    }

    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'orders':
      default:
        return <OrdersScreen />;
    }
  };

  // Title for the header based on active screen
  const getHeaderTitle = () => {
    if (selectedOrder && activeScreen === 'orders') {
      return `Order #${selectedOrder.id}`;
    }

    switch (activeScreen) {
      case 'home':
        return 'Home';
      case 'settings':
        return 'Settings';
      case 'orders':
      default:
        return 'Orders';
    }
  };

  // Desktop sidebar menu
  const SidebarMenu = () => (
    <View style={styles.sidebarMenu}>
      <View style={styles.sidebarHeader}>
        <Text style={styles.sidebarTitle}>Menu</Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.sidebarMenuItem, activeScreen === 'home' && styles.activeMenuItem]}
        onPress={() => setActiveScreen('home')}
      >
        <Text style={[styles.sidebarMenuText, activeScreen === 'home' && styles.activeMenuText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.sidebarMenuItem, activeScreen === 'orders' && styles.activeMenuItem]}
        onPress={() => setActiveScreen('orders')}
      >
        <Text style={[styles.sidebarMenuText, activeScreen === 'orders' && styles.activeMenuText]}>Orders</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.sidebarMenuItem, activeScreen === 'settings' && styles.activeMenuItem]}
        onPress={() => setActiveScreen('settings')}
      >
        <Text style={[styles.sidebarMenuText, activeScreen === 'settings' && styles.activeMenuText]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={getHeaderTitle()} />
      <View style={styles.contentWrapper}>
        {isDesktop && <SidebarMenu />}
        <View style={styles.content}>
          {renderScreen()}
        </View>
      </View>
      {/* FAB is now handled in the OrdersScreen component */}
      {!isDesktop && <Drawer />}
      <Modal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  // Desktop sidebar styles
  sidebarMenu: {
    width: 240,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  sidebarHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sidebarMenuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activeMenuItem: {
    backgroundColor: '#f0f0f0',
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  sidebarMenuText: {
    fontSize: 16,
  },
  activeMenuText: {
    fontWeight: 'bold',
    color: '#2563eb',
  },
});

export default Navigation;
