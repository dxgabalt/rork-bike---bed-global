import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import BookingCard from '@/components/BookingCard';
import Button from '@/components/Button';
import { bookings } from '@/mocks/bookings';

export default function HostBookingsScreen() {
  const { t } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Host Bookings' }} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Booking Requests</Text>
        
        {bookings.map((booking) => (
          <View key={booking.id} style={styles.bookingItem}>
            <BookingCard
              id={booking.id}
              accommodationName={booking.accommodationName}
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              guests={booking.guests}
              totalPrice={booking.totalPrice}
              status={booking.status}
              imageUrl={booking.imageUrl}
              onPress={() => {}}
            />
            {booking.status === 'pending' && (
              <View style={styles.actionButtons}>
                <Button
                  label={t.accept}
                  onPress={() => {}}
                  style={styles.actionButton}
                />
                <Button
                  label={t.decline}
                  onPress={() => {}}
                  variant="outline"
                  style={styles.actionButton}
                />
              </View>
            )}
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
    marginBottom: 20,
  },
  bookingItem: {
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    marginBottom: 0,
  },
});