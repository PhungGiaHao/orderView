import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useUI } from '../contexts/UIContext';

const Modal: React.FC = () => {
  const { isModalOpen, modalContent, closeModal } = useUI();

  if (!isModalOpen) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.background} onPress={closeModal} />
      <View style={styles.modalContainer}>
        {modalContent}
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2001,
  },
});

export default Modal;
