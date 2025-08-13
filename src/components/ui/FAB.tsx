import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import IconSvg from './IconSvg';

interface FABProps {
  onPress: () => void;
  icon?: any; // Icon name
  label?: string;
  color?: string;
  position?: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft' | 'center';
  disabled?: boolean;
}

export const FAB: React.FC<FABProps> = ({
  onPress,
  icon = 'add',
  label,
  color = '#2563eb', // blue-600
  position = 'bottomRight',
  disabled = false,
}) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'bottomLeft':
        return { bottom: 16, left: 16 };
      case 'topRight':
        return { top: 16, right: 16 };
      case 'topLeft':
        return { top: 16, left: 16 };
      case 'center':
        return { bottom: 16, alignSelf: 'center' as const };
      default:
        return { bottom: 16, right: 16 };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.fab,
        { backgroundColor: color },
        getPositionStyles(),
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon === 'add' && <IconSvg name="add" size={24} color="#fff" />}
      {icon === 'edit' && <IconSvg name="edit" size={24} color="#fff" />}
      {icon === 'delete' && <IconSvg name="delete" size={24} color="#fff" />}
      {icon === 'check' && <IconSvg name="check-circle" size={24} color="#fff" />}
      {!['add', 'edit', 'delete', 'check'].includes(icon) && <IconSvg name="add" size={24} color="#fff" />}
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
    flexDirection: 'row',
  },
  disabled: {
    backgroundColor: '#9ca3af', // gray-400
    opacity: 0.7,
  },
  label: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
});
