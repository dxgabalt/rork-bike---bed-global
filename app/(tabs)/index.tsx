import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import SearchBar from '@/components/SearchBar';
import FilterButton from '@/components/FilterButton';
import AccommodationCard from '@/components/AccommodationCard';
import { accommodations } from '@/mocks/accommodations';

export default function HomeScreen() {
  const { t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { key: 'all', label: t.all },
    { key: 'nearby', label: t.nearby },
    { key: 'popular', label: t.popular },
    { key: 'mountain', label: t.mountain },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.homeTitle}</Text>
        
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t.searchPlaceholder}
          style={styles.searchBar}
        />

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <FilterButton
              key={filter.key}
              label={filter.label}
              selected={selectedFilter === filter.key}
              onPress={() => setSelectedFilter(filter.key)}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>{t.recommendedForYou}</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.accommodationsContainer}
        >
          {accommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              id={accommodation.id}
              title={accommodation.title}
              location={accommodation.location}
              price={accommodation.price}
              rating={accommodation.rating}
              imageUrl={accommodation.imageUrl}
              onPress={() => router.push(`/accommodation/${accommodation.id}`)}
            />
          ))}
        </ScrollView>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    marginTop: 10,
  },
  searchBar: {
    marginBottom: 20,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  accommodationsContainer: {
    marginBottom: 20,
  },
});