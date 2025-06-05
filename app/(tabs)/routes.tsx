import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { routes } from '@/mocks/routes';
import RouteCard from '@/components/RouteCard';
import FilterButton from '@/components/FilterButton';

const filters = ['all', 'easy', 'moderate', 'hard'];

export default function RoutesScreen() {
  const { language } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const translations = {
    en: {
      exploreTitle: "Explore Routes",
      all: "All",
      easy: "Easy",
      moderate: "Moderate", 
      hard: "Hard",
    },
    es: {
      exploreTitle: "Explorar Rutas",
      all: "Todos",
      easy: "Fácil",
      moderate: "Moderado",
      hard: "Difícil",
    }
  };

  const t = translations[language];

  const filteredRoutes = selectedFilter === 'all' 
    ? routes 
    : routes.filter(route => route.difficulty === selectedFilter);

  const handleRoutePress = (routeId: string) => {
    router.push(`/route/${routeId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.exploreTitle}</Text>
      </View>

      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            label={t[filter as keyof typeof t]}
            isSelected={selectedFilter === filter}
            onPress={() => setSelectedFilter(filter)}
          />
        ))}
      </View>

      <FlatList
        data={filteredRoutes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RouteCard
            route={item}
            onPress={() => handleRoutePress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
});