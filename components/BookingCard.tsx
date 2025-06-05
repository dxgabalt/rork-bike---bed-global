import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, Users } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface BookingCardProps {
  id: string;
  accommodationName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: string;
  imageUrl?: string;
  onPress: () => void;
}

export default function BookingCard({
  accommodationName,
  checkIn,
  checkOut,
  guests,
  totalPrice,
  status,
  imageUrl,
  onPress,
}: BookingCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'pending': return '#FF9800';
      case 'cancelled': return colors.error;
      case 'completed': return colors.textGray;
      default: return colors.textGray;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{accommodationName}</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Calendar size={14} color={colors.textGray} />
            <Text style={styles.detailText}>
              {formatDate(checkIn)} - {formatDate(checkOut)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Users size={14} color={colors.textGray} />
            <Text style={styles.detailText}>{guests} guests</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${totalPrice}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    margin: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  details: {
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.textGray,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textLight,
  },
});