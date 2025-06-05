import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flag, AlertTriangle, CheckCircle, Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Avatar from '@/components/ui/Avatar';

// Mock reports data
const reports = [
  {
    id: '1',
    type: 'user',
    status: 'pending',
    title: 'Inappropriate Behavior',
    description: 'This user was rude and made inappropriate comments during our stay.',
    createdAt: '2023-06-15T10:30:00Z',
    reporter: {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    reported: {
      id: '3',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
  },
  {
    id: '2',
    type: 'accommodation',
    status: 'resolved',
    title: 'Misleading Listing',
    description: 'The accommodation did not match the description and photos in the listing.',
    createdAt: '2023-06-10T14:15:00Z',
    reporter: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
    },
    reported: {
      id: '4',
      name: 'Lakeside Retreat',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
  },
  {
    id: '3',
    type: 'user',
    status: 'pending',
    title: 'Harassment',
    description: 'This user sent inappropriate messages after our stay.',
    createdAt: '2023-06-08T09:45:00Z',
    reporter: {
      id: '4',
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
    },
    reported: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
    },
  },
];

export default function ReportsScreen() {
  const { t } = useLanguage();
  const [filter, setFilter] = React.useState('all'); // 'all', 'pending', 'resolved'

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredReports = React.useMemo(() => {
    if (filter === 'all') return reports;
    return reports.filter(report => report.status === filter);
  }, [filter]);

  const handleViewReport = (id: string) => {
    router.push(`/admin/reports/view?id=${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.reports}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterTabText, filter === 'all' && styles.activeFilterTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'pending' && styles.activeFilterTab]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterTabText, filter === 'pending' && styles.activeFilterTabText]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'resolved' && styles.activeFilterTab]}
          onPress={() => setFilter('resolved')}
        >
          <Text style={[styles.filterTabText, filter === 'resolved' && styles.activeFilterTabText]}>
            Resolved
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reportCard}
            onPress={() => handleViewReport(item.id)}
          >
            <View style={styles.reportHeader}>
              <View style={styles.reportTypeContainer}>
                <Flag size={16} color={Colors.error} />
                <Text style={styles.reportType}>
                  {item.type === 'user' ? 'User Report' : 'Accommodation Report'}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                {item.status === 'pending' ? (
                  <View style={styles.pendingBadge}>
                    <AlertTriangle size={12} color={Colors.warning} />
                    <Text style={styles.pendingText}>Pending</Text>
                  </View>
                ) : (
                  <View style={styles.resolvedBadge}>
                    <CheckCircle size={12} color={Colors.success} />
                    <Text style={styles.resolvedText}>Resolved</Text>
                  </View>
                )}
              </View>
            </View>
            
            <Text style={styles.reportTitle}>{item.title}</Text>
            <Text style={styles.reportDescription} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.reportFooter}>
              <View style={styles.reporterContainer}>
                <Avatar
                  source={item.reporter.avatar}
                  name={item.reporter.name}
                  size={24}
                />
                <Text style={styles.reporterName}>
                  Reported by {item.reporter.name}
                </Text>
              </View>
              <Text style={styles.reportDate}>{formatDate(item.createdAt)}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Flag size={60} color={Colors.border} />
            <Text style={styles.emptyTitle}>No Reports Found</Text>
            <Text style={styles.emptyText}>There are no reports matching your filter criteria.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    fontFamily: 'Montserrat-Bold',
    color: Colors.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.lightGray,
  },
  activeFilterTab: {
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: Colors.textGray,
  },
  activeFilterTabText: {
    color: Colors.textLight,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  reportCard: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportType: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.error,
    marginLeft: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: `${Colors.warning}20`,
  },
  pendingText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.warning,
    marginLeft: 4,
  },
  resolvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: `${Colors.success}20`,
  },
  resolvedText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.success,
    marginLeft: 4,
  },
  reportTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.text,
    marginBottom: 8,
  },
  reportDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: Colors.textGray,
    marginBottom: 16,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reporterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reporterName: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.textGray,
    marginLeft: 8,
  },
  reportDate: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.textGray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: Colors.textGray,
    textAlign: 'center',
  },
});