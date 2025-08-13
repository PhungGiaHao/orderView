import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUI } from '../contexts/UIContext';

const NewOrderModal: React.FC = () => {
  const { closeModal } = useUI();

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>Create New Order</Text>
      <Text style={styles.message}>
        This is a placeholder for the "Create New Order" form.
        In a real application, this would contain a form to create a new order.
      </Text>
      <TouchableOpacity style={styles.button} onPress={closeModal}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    width: '80%',
    maxWidth: 500,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NewOrderModal;
