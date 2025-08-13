import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
};

const Button = ({ title, onPress, color = '#2196F3' }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
