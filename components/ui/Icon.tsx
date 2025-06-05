import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import Colors from '@/constants/colors';

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  style?: ViewStyle;
  background?: boolean;
  backgroundColor?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = Colors.text,
  style,
  background = false,
  backgroundColor = Colors.primary,
}) => {
  const IconComponent = LucideIcons[name] as React.ComponentType<{
    size: number;
    color: string;
  }>;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react-native`);
    return null;
  }
  
  if (background) {
    const containerSize = size * 1.75;
    
    return (
      <View
        style={[
          styles.container,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
            backgroundColor,
          },
          style,
        ]}
      >
        <IconComponent size={size} color={Colors.textLight} />
      </View>
    );
  }
  
  return <IconComponent size={size} color={color} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Icon;