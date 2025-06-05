import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { Edit, Heart, Bell, LogOut, Star, MapPin } from 'lucide-react-native';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';

export default function ProfileScreen() {
  const { user, logout, t } = useApp();

  const handleLogout = () => {
    logout();
    router.replace('/splash');
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.profileTitle}</Text>
        
        <View style={styles.profileHeader}>
          <Avatar uri={user.avatar || ''} size={80} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.location}>{user.location}</Text>
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.stats?.trips || 0}</Text>
                <Text style={styles.statLabel}>Trips</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.stats?.reviews || 0}</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
              <View style={styles.statItem}>
                <Star size={16} color={colors.primary} fill={colors.primary} />
                <Text style={styles.statNumber}>{user.stats?.rating || 0}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/profile/edit')}
        >
          <Edit size={20} color={colors.textGray} />
          <Text style={styles.menuText}>{t.editProfile}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Heart size={20} color={colors.textGray} />
          <Text style={styles.menuText}>{t.favoritesTitle}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Bell size={20} color={colors.textGray} />
          <Text style={styles.menuText}>{t.notificationsTitle}</Text>
        </TouchableOpacity>

        <View style={styles.logoutContainer}>
          <Button
            label={t.logout}
            onPress={handleLogout}
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    marginTop: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
  },
  statItem: {
    alignItems: 'center',
    marginRight: 20,
    flexDirection: 'row',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textGray,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  logoutContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
});