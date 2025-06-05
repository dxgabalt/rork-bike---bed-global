import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';

interface FilterButtonProps {
  title: string;
  isActive?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  isActive = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive ? styles.activeContainer : styles.inactiveContainer,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeContainer: {
    backgroundColor: Colors.primary,
  },
  inactiveContainer: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: Colors.textLight,
  },
  inactiveText: {
    color: Colors.text,
  },
});

export default FilterButton;