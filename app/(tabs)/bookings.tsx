import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import BookingCard from '@/components/BookingCard';
import { bookings } from '@/mocks/bookings';

export default function BookingsScreen() {
  const { t } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.bookingsTitle}</Text>
        
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            id={booking.id}
            accommodationName={booking.accommodationName}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            guests={booking.guests}
            totalPrice={booking.totalPrice}
            status={booking.status}
            imageUrl={booking.imageUrl}
            onPress={() => router.push(`/booking/${booking.id}`)}
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