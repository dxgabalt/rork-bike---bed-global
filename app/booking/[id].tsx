import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { Calendar, Users, MapPin } from 'lucide-react-native';
import Button from '@/components/Button';
import { bookings } from '@/mocks/bookings';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useApp();
  
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Booking not found</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed': return colors.success;
      case 'pending': return '#FF9800';
      case 'cancelled': return colors.error;
      case 'completed': return colors.textGray;
      default: return colors.textGray;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: t.bookingDetails }} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{booking.accommodationName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Calendar size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Check-in</Text>
              <Text style={styles.detailValue}>{formatDate(booking.checkIn)}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Calendar size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Check-out</Text>
              <Text style={styles.detailValue}>{formatDate(booking.checkOut)}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Users size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Guests</Text>
              <Text style={styles.detailValue}>{booking.guests} guests</Text>
            </View>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>${booking.totalPrice}</Text>
        </View>

        {booking.status === 'confirmed' && (
          <Button
            label={t.viewAccommodation}
            onPress={() => {}}
            style={styles.actionButton}
          />
        )}

        {booking.status === 'pending' && (
          <Button
            label={t.cancel}
            onPress={() => {}}
            variant="outline"
            style={styles.actionButton}
          />
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailContent: {
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  priceContainer: {
    backgroundColor: colors.lightGray,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  actionButton: {
    marginTop: 20,
  },
});