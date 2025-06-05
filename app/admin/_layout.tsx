import React, { useEffect } from 'react';
import { Slot, router } from 'expo-router';
import { useApp } from '@/contexts/Context';

export default function AdminLayout() {
  const { user, isLoading } = useApp();

  useEffect(() => {
    if (!isLoading && user?.role !== 'admin') {
      router.replace('/splash');
    }
  }, [isLoading, user]);

  if (isLoading || user?.role !== 'admin') {
    return null;
  }

  return <Slot />;
}