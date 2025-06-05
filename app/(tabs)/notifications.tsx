import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { Bell, Calendar, MessageCircle, Star, Home, CheckCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';

// Mock notifications data
const notifications = [
  {
    id: '1',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking at Mountain View Cabin has been confirmed.',
    time: '2 hours ago',
    read: false,
    data: {
      bookingId: '123',
    },
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Sarah Johnson sent you a message about your upcoming stay.',
    time: '1 day ago',
    read: true,
    data: {
      conversationId: '456',
    },
  },
  {
    id: '3',
    type: 'review',
    title: 'New Review',
    message: 'Michael Chen left a 5-star review for your recent stay.',
    time: '3 days ago',
    read: true,
    data: {
      accommodationId: '789',
    },
  },
  {
    id: '4',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 15% off your next booking in Portland, Oregon.',
    time: '1 week ago',
    read: true,
    data: {
      promoCode: 'BIKE15',
    },
  },
  {
    id: '5',
    type: 'system',
    title: 'Account Verified',
    message: 'Your account has been successfully verified.',
    time: '2 weeks ago',
    read: true,
    data: {},
  },
];

export default function NotificationsScreen() {
  const { language } = useApp();
  const translations = {
    en: {
      notificationsTitle: "Notifications",
      markAllAsRead: "Mark all as read",
      noNotifications: "No Notifications",
      noNotificationsDescription: "You are all caught up! Check back later for updates.",
    },
    es: {
      notificationsTitle: "Notificaciones",
      markAllAsRead: "Marcar todo como leído",
      noNotifications: "Sin Notificaciones",
      noNotificationsDescription: "¡Estás al día! Vuelve más tarde para ver actualizaciones.",
    }
  };

  const t = translations[language];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar size={24} color={colors.primary} />;
      case 'message':
        return <MessageCircle size={24} color={colors.secondary} />;
      case 'review':
        return <Star size={24} color={colors.primary} />;
      case 'promotion':
        return <Home size={24} color={colors.secondary} />;
      case 'system':
        return <CheckCircle size={24} color={colors.primary} />;
      default:
        return <Bell size={24} color={colors.primary} />;
    }
  };

  const handleNotificationPress = (notification: any) => {
    // In a real app, this would navigate to the relevant screen based on notification type
    switch (notification.type) {
      case 'booking':
        router.push(`/booking/${notification.data.bookingId}`);
        break;
      case 'message':
        // Navigate to messages
        break;
      case 'review':
        router.push(`/accommodation/${notification.data.accommodationId}`);
        break;
      case 'promotion':
        router.push('/(tabs)/explore');
        break;
      default:
        break;
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Bell size={60} color={colors.border} />
      <Text style={styles.emptyTitle}>{t.noNotifications}</Text>
      <Text style={styles.emptyText}>{t.noNotificationsDescription}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.notificationsTitle}</Text>
        {notifications.length > 0 && (
          <TouchableOpacity>
            <Text style={styles.markAllRead}>{t.markAllAsRead}</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationItem, !item.read && styles.unreadItem]}
            onPress={() => handleNotificationPress(item)}
          >
            <View style={styles.iconContainer}>
              {getNotificationIcon(item.type)}
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  markAllRead: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadItem: {
    backgroundColor: `${colors.primary}05`,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.background,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textGray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
  },
});