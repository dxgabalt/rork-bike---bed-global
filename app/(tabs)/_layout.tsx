import React, { useEffect } from 'react';
import { Tabs, router } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { Home, Map, Calendar, User } from 'lucide-react-native';

export default function TabsLayout() {
  const { user, isLoading, language, t } = useApp();

  useEffect(() => {
    if (!isLoading && user?.role !== 'user') {
      router.replace('/splash');
    }
  }, [isLoading, user]);

  if (isLoading || user?.role !== 'user') {
    return null;
  }

  const translations = t[language];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textGray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.background,
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: translations.homeTitle,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: translations.exploreTitle,
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: translations.bookingsTitle,
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: translations.profileTitle,
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}