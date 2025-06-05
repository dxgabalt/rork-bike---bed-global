import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';

export default function SplashScreen() {
  const { user, isLoading, language, t } = useApp();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (!language) {
        router.replace('/language');
      } else if (!user?.role) {
        router.replace('/role');
      } else if (user.role === 'admin') {
        router.replace('/admin/dashboard');
      } else if (user.role === 'host') {
        router.replace('/host/dashboard');
      } else {
        router.replace('/(tabs)/index');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading, user, language]);

  const translations = language ? t[language] : t.en;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🚴‍♂️</Text>
        <Text style={styles.title}>Bike & Bed Global</Text>
        <Text style={styles.tagline}>{translations.splashTagline}</Text>
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});