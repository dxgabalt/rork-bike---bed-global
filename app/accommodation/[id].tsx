import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { Star, MapPin, Wifi, Car, Wrench } from 'lucide-react-native';
import Button from '@/components/Button';
import { accommodations } from '@/mocks/accommodations';

export default function AccommodationDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useApp();
  
  const accommodation = accommodations.find(a => a.id === id);

  if (!accommodation) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Accommodation not found</Text>
      </SafeAreaView>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    'Wi-Fi': Wifi,
    'Parking': Car,
    'Tools': Wrench,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: accommodation.title }} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: accommodation.imageUrl }} style={styles.image} />
        
        <View style={styles.details}>
          <Text style={styles.title}>{accommodation.title}</Text>
          
          <View style={styles.locationRow}>
            <MapPin size={16} color={colors.textGray} />
            <Text style={styles.location}>{accommodation.location}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Star size={16} color={colors.primary} fill={colors.primary} />
            <Text style={styles.rating}>{accommodation.rating}</Text>
            <Text style={styles.reviews}>({accommodation.reviews} reviews)</Text>
          </View>

          <Text style={styles.price}>${accommodation.price}/night</Text>

          <Text style={styles.description}>{accommodation.description}</Text>

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {accommodation.amenities.map((amenity, index) => {
              const IconComponent = amenityIcons[amenity] || Wifi;
              return (
                <View key={index} style={styles.amenityItem}>
                  <IconComponent size={16} color={colors.textGray} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Bike Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {accommodation.bikeAmenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Wrench size={16} color={colors.primary} />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>

          <Button
            label={t.bookNow}
            onPress={() => {}}
            style={styles.bookButton}
          />
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
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: colors.textGray,
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: colors.textGray,
    marginLeft: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
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
  amenitiesContainer: {
    marginBottom: 24,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  bookButton: {
    marginTop: 20,
  },
});