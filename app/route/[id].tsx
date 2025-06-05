import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { MapPin, Clock, TrendingUp } from 'lucide-react-native';
import { routes } from '@/mocks/routes';

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams();
  const { language } = useApp();
  
  const route = routes.find(r => r.id === id);

  if (!route) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Route not found</Text>
      </SafeAreaView>
    );
  }

  const getDifficultyColor = () => {
    switch (route.difficulty) {
      case 'easy': return '#4CAF50';
      case 'moderate': return '#FF9800';
      case 'hard': return '#F44336';
      default: return colors.textGray;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: route.name }} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: route.imageUrl }} style={styles.image} />
        
        <View style={styles.details}>
          <Text style={styles.title}>{route.name}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MapPin size={16} color={colors.textGray} />
              <Text style={styles.statText}>{route.distance} km</Text>
            </View>
            
            {route.estimatedTime && (
              <View style={styles.statItem}>
                <Clock size={16} color={colors.textGray} />
                <Text style={styles.statText}>{route.estimatedTime} min</Text>
              </View>
            )}
            
            {route.elevationGain && (
              <View style={styles.statItem}>
                <TrendingUp size={16} color={colors.textGray} />
                <Text style={styles.statText}>{route.elevationGain}m elevation</Text>
              </View>
            )}
          </View>

          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
            <Text style={styles.difficultyText}>{route.difficulty.toUpperCase()}</Text>
          </View>

          <Text style={styles.description}>{route.description}</Text>

          <View style={styles.locationInfo}>
            <Text style={styles.sectionTitle}>Route Details</Text>
            <Text style={styles.locationText}>Start: {route.startLocation}</Text>
            <Text style={styles.locationText}>End: {route.endLocation}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  statText: {
    fontSize: 14,
    color: colors.textGray,
    marginLeft: 4,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  locationInfo: {
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
});