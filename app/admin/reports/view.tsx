import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Flag, MessageCircle, User, Calendar, AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import Colors from '@/constants/colors';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';

// Mock report data
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
    messages: [
      {
        id: '1',
        sender: 'reporter',
        text: 'The user was very rude during our stay and made several inappropriate comments about our group.',
        timestamp: '2023-06-15T10:30:00Z',
      },
      {
        id: '2',
        sender: 'admin',
        text: 'Thank you for your report. Could you provide more specific details about the incident?',
        timestamp: '2023-06-15T11:45:00Z',
      },
      {
        id: '3',
        sender: 'reporter',
        text: 'Yes, when we arrived, he made comments about our appearance and continued to make us feel uncomfortable throughout our stay.',
        timestamp: '2023-06-15T12:20:00Z',
      },
    ],
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
    messages: [
      {
        id: '1',
        sender: 'reporter',
        text: 'The accommodation was advertised as having a private bike storage area, but it was actually a shared space with no security.',
        timestamp: '2023-06-10T14:15:00Z',
      },
      {
        id: '2',
        sender: 'admin',
        text: "We'll look into this. Could you share some photos of the storage area?",
        timestamp: '2023-06-10T15:30:00Z',
      },
      {
        id: '3',
        sender: 'reporter',
        text: "I've attached photos showing the shared storage area that was advertised as private.",
        timestamp: '2023-06-10T16:05:00Z',
      },
      {
        id: '4',
        sender: 'admin',
        text: "Thank you for the evidence. We've updated the listing to accurately reflect the shared storage area.",
        timestamp: '2023-06-12T09:20:00Z',
      },
    ],
    resolution: {
      action: 'listing_updated',
      note: 'Listing has been updated to accurately describe the bike storage facilities.',
      timestamp: '2023-06-12T09:30:00Z',
    },
  },
];

export default function ViewReportScreen() {
  const { t } = useLanguage();
  const { id } = useLocalSearchParams();
  
  // Find the report by id
  const report = reports.find(r => r.id === id) || reports[0];
  
  const [newMessage, setNewMessage] = useState('');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleResolve = () => {
    // In a real app, this would update the report status
    router.back();
  };

  const handleDismiss = () => {
    // In a real app, this would dismiss the report
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.reportHeader}>
          <View style={styles.reportTypeContainer}>
            <Flag size={16} color={Colors.error} />
            <Text style={styles.reportType}>
              {report.type === 'user' ? 'User Report' : 'Accommodation Report'}
            </Text>
          </View>
          <Text style={styles.reportTitle}>{report.title}</Text>
          <Text style={styles.reportDate}>Reported on {formatDate(report.createdAt)}</Text>
          
          <View style={styles.statusContainer}>
            {report.status === 'pending' ? (
              <View style={[styles.statusBadge, styles.pendingBadge]}>
                <AlertTriangle size={14} color={Colors.warning} />
                <Text style={[styles.statusText, styles.pendingText]}>Pending</Text>
              </View>
            ) : (
              <View style={[styles.statusBadge, styles.resolvedBadge]}>
                <CheckCircle size={14} color={Colors.success} />
                <Text style={[styles.statusText, styles.resolvedText]}>Resolved</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{report.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Involved Parties</Text>
          
          <View style={styles.partyContainer}>
            <View style={styles.partyHeader}>
              <User size={16} color={Colors.primary} />
              <Text style={styles.partyLabel}>Reporter</Text>
            </View>
            <View style={styles.partyInfo}>
              <Avatar
                source={report.reporter.avatar}
                name={report.reporter.name}
                size={40}
              />
              <View style={styles.partyDetails}>
                <Text style={styles.partyName}>{report.reporter.name}</Text>
                <TouchableOpacity>
                  <Text style={styles.viewProfileLink}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.partyContainer}>
            <View style={styles.partyHeader}>
              <Flag size={16} color={Colors.error} />
              <Text style={styles.partyLabel}>Reported</Text>
            </View>
            <View style={styles.partyInfo}>
              {report.type === 'user' ? (
                <>
                  <Avatar
                    source={report.reported.avatar}
                    name={report.reported.name}
                    size={40}
                  />
                  <View style={styles.partyDetails}>
                    <Text style={styles.partyName}>{report.reported.name}</Text>
                    <TouchableOpacity>
                      <Text style={styles.viewProfileLink}>View Profile</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Image
                    source={{ uri: report.reported.image }}
                    style={styles.accommodationImage}
                  />
                  <View style={styles.partyDetails}>
                    <Text style={styles.partyName}>{report.reported.name}</Text>
                    <TouchableOpacity>
                      <Text style={styles.viewProfileLink}>View Listing</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication</Text>
          
          {report.messages.map((message) => (
            <View 
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'admin' ? styles.adminMessage : styles.userMessage
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageTime}>{formatDate(message.timestamp)}</Text>
            </View>
          ))}
          
          <View style={styles.inputContainer}>
            <Input
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              multiline
            />
            <Button
              title="Send"
              onPress={() => setNewMessage('')}
              style={styles.sendButton}
            />
          </View>
        </View>

        {report.resolution && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resolution</Text>
            <View style={styles.resolutionContainer}>
              <CheckCircle size={20} color={Colors.success} />
              <View style={styles.resolutionDetails}>
                <Text style={styles.resolutionNote}>{report.resolution.note}</Text>
                <Text style={styles.resolutionDate}>
                  Resolved on {formatDate(report.resolution.timestamp)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {report.status === 'pending' && (
          <View style={styles.actionButtons}>
            <Button
              title="Resolve Report"
              onPress={handleResolve}
              fullWidth
            />
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={handleDismiss}
            >
              <XCircle size={20} color={Colors.error} />
              <Text style={styles.dismissButtonText}>Dismiss Report</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Simple Input component for this screen
interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
}

const Input = ({ value, onChangeText, placeholder, multiline }: InputProps) => (
  <View style={inputStyles.container}>
    <View style={inputStyles.inputWrapper}>
      <MessageCircle size={20} color={Colors.primary} style={inputStyles.icon} />
      <View style={inputStyles.textInputContainer}>
        <TextInput
          style={[
            inputStyles.textInput,
            !value && inputStyles.placeholder,
            multiline && inputStyles.multiline,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.border}
          multiline={multiline}
        />
      </View>
    </View>
  </View>
);

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.background,
  },
  icon: {
    marginRight: 8,
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 4,
  },
  placeholder: {
    color: Colors.border,
  },
  multiline: {
    minHeight: 60,
  },
});

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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.text,
  },
  content: {
    padding: 20,
  },
  reportHeader: {
    marginBottom: 20,
  },
  reportTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportType: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: Colors.error,
    marginLeft: 6,
  },
  reportTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: Colors.text,
    marginBottom: 8,
  },
  reportDate: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: Colors.textGray,
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: `${Colors.warning}20`,
  },
  resolvedBadge: {
    backgroundColor: `${Colors.success}20`,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 4,
  },
  pendingText: {
    color: Colors.warning,
  },
  resolvedText: {
    color: Colors.success,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: Colors.text,
    lineHeight: 24,
  },
  partyContainer: {
    marginBottom: 16,
  },
  partyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  partyLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: Colors.textGray,
    marginLeft: 6,
  },
  partyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 12,
  },
  partyDetails: {
    marginLeft: 12,
  },
  partyName: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  viewProfileLink: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: Colors.primary,
  },
  accommodationImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    maxWidth: '80%',
  },
  adminMessage: {
    backgroundColor: Colors.lightGray,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: `${Colors.primary}15`,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: Colors.text,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.textGray,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  sendButton: {
    marginLeft: 8,
    height: 40,
    paddingHorizontal: 16,
  },
  resolutionContainer: {
    flexDirection: 'row',
    backgroundColor: `${Colors.success}15`,
    borderRadius: 12,
    padding: 12,
  },
  resolutionDetails: {
    marginLeft: 12,
    flex: 1,
  },
  resolutionNote: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: Colors.text,
    marginBottom: 4,
  },
  resolutionDate: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.textGray,
  },
  actionButtons: {
    marginBottom: 30,
  },
  dismissButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 12,
  },
  dismissButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: Colors.error,
  },
});