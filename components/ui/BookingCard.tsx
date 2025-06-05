import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/colors';

interface BookingCardProps {
  id: string;
  accommodationTitle: string;
  accommodationImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'canceled';
  onPress?: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return Colors.success;
    case 'pending':
      return Colors.warning;
    case 'canceled':
      return Colors.error;
    default:
      return Colors.textGray;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const BookingCard: React.FC<BookingCardProps> = ({
  id,
  accommodationTitle,
  accommodationImage,
  location,
  checkIn,
  checkOut,
  guests,
  totalPrice,
  status,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/booking/${id}`);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: accommodationImage }} style={styles.image} />
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
          <Text style={styles.statusText}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{accommodationTitle}</Text>
        <Text style={styles.location} numberOfLines={1}>{location}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{formatDate(checkIn)} - {formatDate(checkOut)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{guests} guest{guests !== 1 ? 's' : ''}</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.price}>${totalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: Colors.textLight,
    fontWeight: '600',
    fontSize: 12,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.textGray,
    marginBottom: 12,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: Colors.textGray,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default BookingCard;