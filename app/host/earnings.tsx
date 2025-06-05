import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { DollarSign, TrendingUp } from 'lucide-react-native';

export default function HostEarningsScreen() {
  const { t } = useApp();

  const earningsData = [
    { month: 'January', amount: 1200, bookings: 8 },
    { month: 'February', amount: 1800, bookings: 12 },
    { month: 'March', amount: 2450, bookings: 15 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: t.earnings }} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.earnings}</Text>
        
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <DollarSign size={24} color={colors.primary} />
            <Text style={styles.summaryValue}>$5,450</Text>
            <Text style={styles.summaryLabel}>Total Earnings</Text>
          </View>
          <View style={styles.summaryItem}>
            <TrendingUp size={24} color={colors.success} />
            <Text style={styles.summaryValue}>35</Text>
            <Text style={styles.summaryLabel}>Total Bookings</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Monthly Breakdown</Text>
        
        {earningsData.map((data, index) => (
          <View key={index} style={styles.earningItem}>
            <View style={styles.earningInfo}>
              <Text style={styles.earningMonth}>{data.month}</Text>
              <Text style={styles.earningBookings}>{data.bookings} bookings</Text>
            </View>
            <Text style={styles.earningAmount}>${data.amount}</Text>
          </View>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textGray,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  earningItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  earningInfo: {
    flex: 1,
  },
  earningMonth: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  earningBookings: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 2,
  },
  earningAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});