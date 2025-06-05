import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import Button from '@/components/Button';

export default function LanguageScreen() {
  const { setLanguage } = useApp();

  const handleLanguageSelect = (lang: 'en' | 'es') => {
    setLanguage(lang);
    router.replace('/role');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🚴‍♂️</Text>
        <Text style={styles.title}>Bike & Bed Global</Text>
        <Text style={styles.subtitle}>Select your language</Text>
        <Text style={styles.subtitle}>Selecciona tu idioma</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            label="English"
            onPress={() => handleLanguageSelect('en')}
            style={styles.button}
          />
          <Button
            label="Español"
            onPress={() => handleLanguageSelect('es')}
            style={styles.button}
          />
        </View>
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
  },
  button: {
    marginBottom: 16,
  },
});