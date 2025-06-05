import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { Ban, UserCheck, AlertTriangle } from 'lucide-react-native';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { users } from '@/mocks/users';

export default function AdminUsersScreen() {
  const { t } = useApp();
  const [showReports, setShowReports] = useState(false);

  const reports = [
    { id: '1', type: 'Inappropriate Content', user: 'John Doe', status: 'pending' },
    { id: '2', type: 'Spam', user: 'Jane Smith', status: 'resolved' },
    { id: '3', type: 'Harassment', user: 'Bob Johnson', status: 'pending' },
  ];

  if (showReports) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Reports' }} />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Reports</Text>
            <Button
              label="Back to Users"
              onPress={() => setShowReports(false)}
              variant="outline"
              style={styles.backButton}
            />
          </View>
          
          {reports.map((report) => (
            <View key={report.id} style={styles.reportItem}>
              <View style={styles.reportInfo}>
                <Text style={styles.reportType}>{report.type}</Text>
                <Text style={styles.reportUser}>Reported: {report.user}</Text>
                <Text style={[styles.reportStatus, { color: report.status === 'pending' ? '#FF9800' : colors.success }]}>
                  {report.status.toUpperCase()}
                </Text>
              </View>
              <AlertTriangle size={20} color={report.status === 'pending' ? '#FF9800' : colors.textGray} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: t.usersTitle }} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Users</Text>
          <Button
            label="View Reports"
            onPress={() => setShowReports(true)}
            variant="outline"
            style={styles.reportsButton}
          />
        </View>
        
        {users.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <Avatar uri={user.avatar} size={50} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userRole}>{user.role.toUpperCase()}</Text>
            </View>
            <View style={styles.userActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ban size={16} color={colors.error} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <UserCheck size={16} color={colors.success} />
              </TouchableOpacity>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  reportsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
  },
  userItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 2,
  },
  userRole: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontWeight: '600',
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  reportItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportInfo: {
    flex: 1,
  },
  reportType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  reportUser: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 2,
  },
  reportStatus: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});