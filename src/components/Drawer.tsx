import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useUI } from '@/contexts/UIContext';
import IconSvg from './ui/IconSvg';

const Drawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer, activeScreen, setActiveScreen } = useUI();

  if (!isDrawerOpen) {
    return null;
  }

  const handleNavigation = (screen: string) => {
    setActiveScreen(screen);
    closeDrawer();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
            <IconSvg name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.menuItems}>
          <TouchableOpacity 
            style={[styles.menuItem, activeScreen === 'home' && styles.activeMenuItem]}
            onPress={() => handleNavigation('home')}
          >
            <IconSvg name="home" size={20} color={activeScreen === 'home' ? '#1976d2' : '#666'} style={styles.menuIcon} />
            <Text style={[styles.menuText, activeScreen === 'home' && styles.activeMenuText]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, activeScreen === 'orders' && styles.activeMenuItem]}
            onPress={() => handleNavigation('orders')}
          >
            <IconSvg name="shopping-cart" size={20} color={activeScreen === 'orders' ? '#1976d2' : '#666'} style={styles.menuIcon} />
            <Text style={[styles.menuText, activeScreen === 'orders' && styles.activeMenuText]}>Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, activeScreen === 'settings' && styles.activeMenuItem]}
            onPress={() => handleNavigation('settings')}
          >
            <IconSvg name="settings" size={20} color={activeScreen === 'settings' ? '#1976d2' : '#666'} style={styles.menuIcon} />
            <Text style={[styles.menuText, activeScreen === 'settings' && styles.activeMenuText]}>Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.overlayBackground} onPress={closeDrawer} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1000,
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: 280,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 }, // Đảo ngược hướng bóng đổ sang phải
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 10,
  },
  activeMenuItem: {
    backgroundColor: '#f0f0f0',
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  menuText: {
    fontSize: 16,
  },
  activeMenuText: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
});

export default Drawer;
