import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Users, Minus, Plus, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from './Button';

interface GuestPickerProps {
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  label?: string;
  placeholder?: string;
}

const GuestPicker: React.FC<GuestPickerProps> = ({
  value,
  onChange,
  minValue = 1,
  maxValue = 10,
  label = 'Guests',
  placeholder = 'Select number of guests',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const getDisplayText = () => {
    if (value > 0) {
      return `${value} guest${value !== 1 ? 's' : ''}`;
    }
    return placeholder;
  };

  const handleOpen = () => {
    setTempValue(value);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleApply = () => {
    onChange(tempValue);
    handleClose();
  };

  const increment = () => {
    if (tempValue < maxValue) {
      setTempValue(tempValue + 1);
    }
  };

  const decrement = () => {
    if (tempValue > minValue) {
      setTempValue(tempValue - 1);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity style={styles.pickerButton} onPress={handleOpen}>
        <Users size={20} color={Colors.primary} />
        <Text style={[styles.pickerText, value === 0 && styles.placeholderText]}>
          {getDisplayText()}
        </Text>
      </TouchableOpacity>
      
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Guests</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={[styles.counterButton, tempValue <= minValue && styles.disabledButton]}
                onPress={decrement}
                disabled={tempValue <= minValue}
              >
                <Minus size={20} color={tempValue <= minValue ? Colors.border : Colors.text} />
              </TouchableOpacity>
              
              <Text style={styles.counterValue}>{tempValue}</Text>
              
              <TouchableOpacity
                style={[styles.counterButton, tempValue >= maxValue && styles.disabledButton]}
                onPress={increment}
                disabled={tempValue >= maxValue}
              >
                <Plus size={20} color={tempValue >= maxValue ? Colors.border : Colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.guestInfo}>
              <Text style={styles.guestInfoText}>
                This accommodation can accommodate up to {maxValue} guests.
              </Text>
            </View>
            
            <View style={styles.modalFooter}>
              <Button
                title="Apply"
                onPress={handleApply}
                fullWidth
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: Colors.text,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  pickerText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.text,
  },
  placeholderText: {
    color: Colors.border,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  counterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  disabledButton: {
    borderColor: Colors.border,
    backgroundColor: Colors.lightGray,
  },
  counterValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
  },
  guestInfo: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  guestInfoText: {
    fontSize: 14,
    color: Colors.textGray,
    textAlign: 'center',
  },
  modalFooter: {
    paddingHorizontal: 20,
  },
});

export default GuestPicker;