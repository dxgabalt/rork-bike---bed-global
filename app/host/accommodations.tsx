import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useApp } from '@/contexts/Context';
import { colors } from '@/constants/colors';
import { Plus, Edit } from 'lucide-react-native';
import AccommodationCard from '@/components/AccommodationCard';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { accommodations } from '@/mocks/accommodations';

export default function HostAccommodationsScreen() {
  const { t } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    // In a real app, this would save the accommodation
    setShowAddForm(false);
    setName('');
    setDescription('');
    setLocation('');
    setPrice('');
  };

  if (showAddForm) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: t.addAccommodation }} />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter accommodation name"
          />

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your accommodation"
            multiline
          />

          <Input
            label="Location"
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location"
          />

          <Input
            label="Price per night"
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <Button
              label={t.save}
              onPress={handleSave}
              style={styles.button}
            />
            <Button
              label={t.cancel}
              onPress={() => setShowAddForm(false)}
              variant="outline"
              style={styles.button}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: t.accommodations }} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t.accommodations}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddForm(true)}
          >
            <Plus size={24} color={colors.textLight} />
          </TouchableOpacity>
        </View>
        
        {accommodations.map((accommodation) => (
          <View key={accommodation.id} style={styles.accommodationItem}>
            <AccommodationCard
              id={accommodation.id}
              title={accommodation.title}
              location={accommodation.location}
              price={accommodation.price}
              rating={accommodation.rating}
              imageUrl={accommodation.imageUrl}
              onPress={() => {}}
            />
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color={colors.textGray} />
            </TouchableOpacity>
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
  addButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accommodationItem: {
    position: 'relative',
    marginBottom: 16,
  },
  editButton: {
    position: 'absolute',
    top: 12,
    right: 28,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 8,
  },
  buttonContainer: {
    gap: 16,
    marginTop: 20,
  },
  button: {
    marginBottom: 0,
  },
});