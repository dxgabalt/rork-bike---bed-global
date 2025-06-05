import React, { useEffect } from 'react';
import { Slot, router } from 'expo-router';
import { useApp } from '@/contexts/Context';

export default function HostLayout() {
  const { user, isLoading } = useApp();

  useEffect(() => {
    if (!isLoading && user?.role !== 'host') {
      router.replace('/splash');
    }
  }, [isLoading, user]);

  if (isLoading || user?.role !== 'host') {
    return null;
  }

  return <Slot />;
}