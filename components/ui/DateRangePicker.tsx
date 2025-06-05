import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from './Button';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
  label?: string;
  placeholder?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
  label = 'Select Dates',
  placeholder = 'Check-in - Check-out',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDisplayText = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return placeholder;
  };

  const handleOpen = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setCurrentMonth(new Date());
    setSelectingStart(!startDate);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleApply = () => {
    onDateChange(tempStartDate, tempEndDate);
    handleClose();
  };

  const handleClear = () => {
    setTempStartDate(null);
    setTempEndDate(null);
    setSelectingStart(true);
  };

  const handleDateSelect = (date: Date) => {
    if (selectingStart || (tempStartDate && date < tempStartDate)) {
      setTempStartDate(date);
      setTempEndDate(null);
      setSelectingStart(false);
    } else {
      setTempEndDate(date);
      setSelectingStart(true);
    }
  };

  const isDateSelected = (date: Date) => {
    if (tempStartDate && date.toDateString() === tempStartDate.toDateString()) {
      return true;
    }
    if (tempEndDate && date.toDateString() === tempEndDate.toDateString()) {
      return true;
    }
    return false;
  };

  const isDateInRange = (date: Date) => {
    if (tempStartDate && tempEndDate) {
      return date > tempStartDate && date < tempEndDate;
    }
    return false;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    
    const days = [];
    let day = 1;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    
    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected = isDateSelected(date);
      const isInRange = isDateInRange(date);
      const isDisabled = isDateDisabled(date);
      
      days.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[
            styles.dayCell,
            isSelected && styles.selectedDay,
            isInRange && styles.inRangeDay,
            isDisabled && styles.disabledDay,
          ]}
          onPress={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isInRange && styles.inRangeDayText,
              isDisabled && styles.disabledDayText,
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={() => setCurrentMonth(new Date(year, month - 1, 1))}
            style={styles.navButton}
          >
            <ChevronLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <Text style={styles.monthYearText}>{`${monthName} ${year}`}</Text>
          
          <TouchableOpacity
            onPress={() => setCurrentMonth(new Date(year, month + 1, 1))}
            style={styles.navButton}
          >
            <ChevronRight size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.weekdayHeader}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.weekdayText}>
              {day}
            </Text>
          ))}
        </View>
        
        <View style={styles.daysContainer}>{days}</View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity style={styles.pickerButton} onPress={handleOpen}>
        <Calendar size={20} color={Colors.primary} />
        <Text style={[styles.pickerText, (!startDate && !endDate) && styles.placeholderText]}>
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
              <Text style={styles.modalTitle}>Select Dates</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.selectionInfo}>
              <View style={styles.dateDisplay}>
                <Text style={styles.dateLabel}>Check-in</Text>
                <Text style={styles.dateValue}>
                  {tempStartDate ? formatDate(tempStartDate) : 'Select date'}
                </Text>
              </View>
              
              <View style={styles.dateDisplay}>
                <Text style={styles.dateLabel}>Check-out</Text>
                <Text style={styles.dateValue}>
                  {tempEndDate ? formatDate(tempEndDate) : 'Select date'}
                </Text>
              </View>
            </View>
            
            <ScrollView style={styles.calendarScroll}>
              {renderCalendar()}
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <Button
                title="Clear"
                onPress={handleClear}
                variant="outline"
                style={styles.footerButton}
              />
              <Button
                title="Apply"
                onPress={handleApply}
                disabled={!tempStartDate || !tempEndDate}
                style={styles.footerButton}
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
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  selectionInfo: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateDisplay: {
    flex: 1,
    marginRight: 10,
  },
  dateLabel: {
    fontSize: 14,
    color: Colors.textGray,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  calendarScroll: {
    maxHeight: 400,
  },
  calendarContainer: {
    paddingHorizontal: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 4,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  weekdayHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textGray,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 16,
    color: Colors.text,
  },
  selectedDay: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  selectedDayText: {
    color: Colors.textLight,
    fontWeight: '600',
  },
  inRangeDay: {
    backgroundColor: `${Colors.primary}30`,
  },
  inRangeDayText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  disabledDay: {
    opacity: 0.3,
  },
  disabledDayText: {
    color: Colors.textGray,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default DateRangePicker;