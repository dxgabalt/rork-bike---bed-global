import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import RouteCard from '@/components/RouteCard';
import { routes } from '@/mocks/routes';

export default function ExploreScreen() {
  const { t } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.exploreTitle}</Text>
        
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            id={route.id}
            name={route.name}
            distance={route.distance}
            difficulty={route.difficulty}
            imageUrl={route.imageUrl}
            estimatedTime={route.estimatedTime}
            onPress={() => router.push(`/route/${route.id}`)}
          />
        ))}
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
});