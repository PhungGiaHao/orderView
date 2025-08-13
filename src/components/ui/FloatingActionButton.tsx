import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import IconSvg from './IconSvg';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: 'add' | 'edit' | 'delete'; // Icon types
  color?: string;
  size?: number;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = 'add',
  color = '#fff',
  size = 24
}) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      {/* {icon === 'add' && <IconSvg name="add" size={size} color={color} />}
      {icon === 'edit' && <IconSvg name="edit" size={size} color={color} />}
      {icon === 'delete' && <IconSvg name="delete" size={size} color={color} />}
      {!icon && <IconSvg name="add" size={size} color={color} />} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb', // blue-600
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
});
