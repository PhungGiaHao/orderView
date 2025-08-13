import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUI } from '@/contexts/UIContext';
import IconSvg from '../components/ui/IconSvg';

const Home: React.FC = () => {
  const { setActiveScreen } = useUI();

  const navigateToOrders = () => {
    setActiveScreen('orders');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Order Viewer</Text>
      <Text style={styles.subtitle}>A responsive order management application</Text>
      
      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Key Features:</Text>
        <Text style={styles.featureItem}>• View and manage orders</Text>
        <Text style={styles.featureItem}>• Search by customer ID or status</Text>
        <Text style={styles.featureItem}>• View detailed order information</Text>
        <Text style={styles.featureItem}>• Responsive mobile-first design</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={navigateToOrders}>
        <IconSvg name="shopping-cart" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Go to Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  features: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export const HomeScreen = React.memo(Home);
export default Home;
