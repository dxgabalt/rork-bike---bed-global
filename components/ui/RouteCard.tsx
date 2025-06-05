import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MapPin, Mountain, ArrowUp, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/colors';

interface RouteCardProps {
  id: string;
  title: string;
  location: string;
  distance: number;
  elevation: number;
  duration: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  image: string;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return '#4CAF50';
    case 'moderate':
      return '#FFC107';
    case 'hard':
      return '#FF9800';
    case 'extreme':
      return '#F44336';
    default:
      return Colors.primary;
  }
};

const RouteCard: React.FC<RouteCardProps> = ({
  id,
  title,
  location,
  distance,
  elevation,
  duration,
  difficulty,
  image,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/route/${id}`);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(difficulty) }]}>
          <Text style={styles.difficultyText}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color={Colors.textGray} />
          <Text style={styles.location} numberOfLines={1}>{location}</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Mountain size={16} color={Colors.primary} />
            <Text style={styles.statText}>{distance} km</Text>
          </View>
          
          <View style={styles.statItem}>
            <ArrowUp size={16} color={Colors.primary} />
            <Text style={styles.statText}>{elevation} m</Text>
          </View>
          
          <View style={styles.statItem}>
            <Clock size={16} color={Colors.primary} />
            <Text style={styles.statText}>{formatDuration(duration)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  difficultyText: {
    color: Colors.textLight,
    fontWeight: '600',
    fontSize: 12,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: Colors.textGray,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default RouteCard;