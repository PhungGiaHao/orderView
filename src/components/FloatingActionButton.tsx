import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useUI } from '../contexts/UIContext';
import NewOrderModal from './NewOrderModal';
const FloatingActionButton: React.FC = () => {
  const { openModal } = useUI();

  const handlePress = () => {
    openModal(<NewOrderModal />);
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={handlePress}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#1976d2',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 100,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
});

export default FloatingActionButton;
