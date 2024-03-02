import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavBar from '../../components/navBar/navBar';

const CalendarScreen = () => {
  const [events, setEvents] = useState([]);
  const [newEventText, setNewEventText] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const selectedDate = route.params?.selectedDate || null;

  useEffect(() => {
    // Load events for the selected date from AsyncStorage on component mount
    if (selectedDate) {
      loadEvents(selectedDate);
    }
  }, [selectedDate]);

  const loadEvents = async (date) => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      const allEvents = storedEvents ? JSON.parse(storedEvents) : {};
      const selectedDateEvents = allEvents[date] || [];
      setEvents(selectedDateEvents);
      updateMarkedDates(setMarkedDates, date, selectedDateEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.scheduleList}>
          <View style={styles.rowContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>muscle Part</Text>
            </View>
            <Text style={styles.label}>time</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.labelContainer}>
            <Text style={styles.value}>{item.text}</Text>
            </View>
            <Text style={styles.value}>{item.time}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(item.id)}>
          <Image source={require('../../assets/images/trash.png')} style={styles.icon}  />
        </TouchableOpacity>
      </View>
    );
  };
  

  const handleDeleteEvent = async (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    storeEvents(updatedEvents, selectedDate);

    // Update marked dates to remove the dot for the deleted event
    updateMarkedDates(setMarkedDates, selectedDate, updatedEvents);

    // Check if the day has no events left, then update marked dates to mark the day as false
    if (updatedEvents.length === 0) {
      const updatedMarkedDates = { ...markedDates };
      updatedMarkedDates[selectedDate] = { marked: false };
      setMarkedDates(updatedMarkedDates);
    }
  };

  const handleAddEvent = async () => {
    if (!newEventText || !newEventTime || !selectedDate) {
      Alert.alert('Incomplete Event', 'Please enter event details and select a date before adding.');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      text: newEventText,
      time: newEventTime,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    storeEvents(updatedEvents, selectedDate);

    // Update marked dates to include the dot for the newly added event
    updateMarkedDates(setMarkedDates, selectedDate, updatedEvents);

    setNewEventText('');
    setNewEventTime('');
  };

  const storeEvents = async (events, date) => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      const allEvents = storedEvents ? JSON.parse(storedEvents) : {};
      allEvents[date] = events;
      await AsyncStorage.setItem('events', JSON.stringify(allEvents));
    } catch (error) {
      console.error('Error storing events:', error);
    }
  };

  const updateMarkedDates = async (setMarkedDates, date, updatedEvents) => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      const allEvents = storedEvents ? JSON.parse(storedEvents) : {};

      // Update marked dates to include the dot for the date with events
      const markedDates = { ...allEvents[date] };
      markedDates[date] = { marked: updatedEvents.length > 0, dotColor: '#FF5E00' };

      setMarkedDates(markedDates);
    } catch (error) {
      console.error('Error updating marked dates:', error);
    }
  };

  const removeDayFromAsyncStorage = async (date) => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      const allEvents = storedEvents ? JSON.parse(storedEvents) : {};

      // Remove the day from AsyncStorage
      delete allEvents[date];

      await AsyncStorage.setItem('events', JSON.stringify(allEvents));
    } catch (error) {
      console.error('Error removing day from AsyncStorage:', error);
    }
  };

  // Function to get day and month in the format "9.2"
  const getFormattedDate = (date) => {
    const selectedDate = new Date(date);
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1; // Months are zero-indexed
    return `${day}.${month}`;
  };

  // Function to get the name of the day
  const getDayName = (date) => {
    const days = ['(sunday)', '(monday)', '(tuesday)', '(wednesday)', '(thursday)', '(friday)', '(saturday)'];
    const selectedDate = new Date(date);
    const dayIndex = selectedDate.getDay();
    return days[dayIndex];
  };

  const handleTimeChange = (time) => {
    // Format the time input to include ":" after two numbers
    if (time.length === 2 && !time.includes(':')) {
      time += ':';
    }
    setNewEventTime(time);
  };

  return (
    <>
    <NavBar />
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Image source={require('../../assets/images/undo.png')} style={styles.backIcon}  />
    </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>TODAY'S WORKOUT</Text>
        <Text style={styles.dateText}>{getFormattedDate(selectedDate)} {getDayName(selectedDate)}</Text>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.scheduleList}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="event"
              placeholderTextColor="#FF5E00"
              value={newEventText}
              onChangeText={(text) => setNewEventText(text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="time"
              placeholderTextColor="#FF5E00"
              value={newEventTime}
              onChangeText={handleTimeChange} // Updated to call handleTimeChange
              keyboardType='numeric'
            />
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.textButton}>add event</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#484847',
    padding: 16,
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Rajdhani-Bold",
    marginBottom: 8,
    color: "#FF5E00",
    marginBottom: 0, // Added color for consistency
  },
  dateText: {
    fontSize: 20,
    fontFamily: "Rajdhani-Regular",
    marginBottom: 16,
    color: "#FF5E00",// Added color for consistency
  },
  value: {
    color: 'white', // Example color
    fontSize: 20, // Example font size
    fontFamily: "Rajdhani-Medium",
  },
  inputContainer: {
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
   
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 8,
    color: '#FF5E00',
    fontFamily: "Rajdhani-Medium",
  },
  addButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 3,
    alignItems: 'center',
    height: 89,
    justifyContent: 'center',
  },
  textButton: {
    color: "#FF5E00",
    fontSize: 20,
    fontFamily: "Rajdhani-Bold",
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 16,
    borderRadius: 8,
    marginBottom: 30,
  },
  scheduleList: {
    display: "inline-block",
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    width: 130,
    marginRight: 90,
  },
  label: {
    color: "#FF5E00",
    fontSize: 16,
    fontFamily: "Rajdhani-Medium",
    textDecorationLine: "underline",
    marginBottom: 15,
    
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default CalendarScreen;
