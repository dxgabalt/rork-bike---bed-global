import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function FilterButton({ label, isSelected, onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selected]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    marginRight: 12,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedText: {
    color: colors.textLight,
  },
});