import React from 'react';
import { Image, StyleSheet, StyleProp, ImageStyle } from 'react-native';

interface AvatarProps {
  uri: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export default function Avatar({ uri, size = 50, style }: AvatarProps) {
  return (
    <Image
      source={{ uri }}
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#f0f0f0',
  },
});