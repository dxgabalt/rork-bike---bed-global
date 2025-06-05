import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { Home, Calendar, DollarSign, Plus } from 'lucide-react-native';
import Button from '@/components/Button';

export default function HostDashboardScreen() {
  const { t } = useApp();

  const stats = [
    { label: 'Accommodations', value: '3', icon: Home },
    { label: 'Pending Bookings', value: '5', icon: Calendar },
    { label: 'Monthly Earnings', value: '$2,450', icon: DollarSign },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.dashboard}</Text>
        
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <IconComponent size={24} color={colors.primary} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.actionsContainer}>
          <Button
            label={t.accommodations}
            onPress={() => router.push('/host/accommodations')}
            style={styles.actionButton}
          />
          
          <Button
            label="Bookings"
            onPress={() => router.push('/host/bookings')}
            style={styles.actionButton}
            variant="secondary"
          />
          
          <Button
            label={t.earnings}
            onPress={() => router.push('/host/earnings')}
            style={styles.actionButton}
            variant="outline"
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
    marginTop: 4,
  },
  actionsContainer: {
    gap: 16,
  },
  actionButton: {
    marginBottom: 0,
  },
});