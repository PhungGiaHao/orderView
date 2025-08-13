import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { UIProvider } from './contexts/UIContext';
import { OrderProvider } from './contexts/OrderContext';
import Navigation from './navigation/Navigation';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <UIProvider>
        <OrderProvider>
          <Navigation />
        </OrderProvider>
      </UIProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
