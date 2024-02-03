import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

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
        <View>
          <Text>{item.text}</Text>
          <Text>{item.time}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Fitness Schedule</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text>Back to Home</Text>
      </TouchableOpacity>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.scheduleList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Event"
          value={newEventText}
          onChangeText={(text) => setNewEventText(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={newEventTime}
          onChangeText={(time) => setNewEventTime(time)}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text>Add Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scheduleList: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e0e0e0',
    marginBottom: 8,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
    paddingLeft: 8,
  },
  addButton: {
    backgroundColor: '#FF5E00',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
});

export default CalendarScreen;
