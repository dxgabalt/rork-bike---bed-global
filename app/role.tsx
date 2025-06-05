import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import Button from '@/components/Button';

export default function RoleScreen() {
  const { login, t } = useApp();

  const handleRoleSelect = (role: 'user' | 'host' | 'admin') => {
    login(role);
    router.replace('/splash');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🚴‍♂️</Text>
        <Text style={styles.title}>Bike & Bed Global</Text>
        <Text style={styles.subtitle}>{t.roleSelect}</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            label={t.user}
            onPress={() => handleRoleSelect('user')}
            style={styles.button}
          />
          <Button
            label={t.host}
            onPress={() => handleRoleSelect('host')}
            style={styles.button}
            variant="secondary"
          />
          <Button
            label={t.admin}
            onPress={() => handleRoleSelect('admin')}
            style={styles.button}
            variant="outline"
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
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 16,
  },
});