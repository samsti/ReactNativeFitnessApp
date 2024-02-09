// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Image, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import TrainingsSlider from '../../components/TrainingsSlider';

const HomeScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [totalEvents, setTotalEvents] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state
  const navigation = useNavigation();

  useEffect(() => {
    // Load events for all dates from AsyncStorage on component mount
    loadMarkedDates();
  }, []);

  const loadMarkedDates = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      const allEvents = storedEvents ? JSON.parse(storedEvents) : {};
      updateMarkedDates(allEvents);
    } catch (error) {
      console.error('Error loading marked dates:', error);
    }
  };

  const updateMarkedDates = (allEvents) => {
    try {
      const updatedMarkedDates = Object.keys(allEvents).reduce((acc, currentDate) => {
        acc[currentDate] = { marked: true, dotColor: '#FF5E00' };
        if (allEvents[currentDate].length === 0) {
          acc[currentDate].marked = false;
        }
        return acc;
      }, {});

      setMarkedDates(updatedMarkedDates);

      // Count total events
      const totalEventsCount = Object.values(allEvents).flat().length;
      setTotalEvents(totalEventsCount);
    } catch (error) {
      console.error('Error updating marked dates:', error);
    }
  };

  const onDayPress = (day) => {
    const currentDate = day.dateString;
    setSelectedDate(currentDate); // Update selectedDate state
    // Navigate to the CalendarScreen with the selected date
    navigation.navigate('Calendar', { selectedDate: currentDate });
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo_main.png')} style={styles.logo} />
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          theme={styles.customTheme}
          firstDay={1}
          horizontal={true}
          onDayPress={onDayPress}
          markedDates={markedDates}
        />
      </View>
      <View style={styles.inlineContainer}>
        <View style={styles.workoutCounterContainer}>
          <Text style={styles.workoutCounterText}>workout</Text>
          <Text style={styles.workoutCounterNumber}>{totalEvents}</Text>
        </View>
        <View style={styles.caloriesContainer}>
          <Text style={styles.caloriesText}>Today</Text>
          <Text style={styles.numberCaloriesText}>budget 2500 Cal</Text>
          <Text style={styles.caloriesNumber}>1157</Text>
        </View>
      </View>
      <TrainingsSlider/>
      <View style={styles.footer}>
          <Text>footer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: 'grey',
    height: '100%',
    fontFamily: "Rajdhani",
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
  },
  logo: {
    width: 90,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
  calendar: {
    backgroundColor: '#383836',
    marginTop: 25,
    borderRadius: 15,
    width: 380,
    color: '#FF5E00',
    height: 320,
  },
  customTheme: {
    calendarBackground: '#383836',
    monthTextColor: '#FF5E00',
    dayTextColor: 'white',
    todayTextColor: '#FF5E00',
    selectedDayBackgroundColor: '#FF5E00',
    textSectionTitleColor: '#FF5E00',
    arrowColor: '#FF5E00',
    textDisabledColor: '#9D9D9D',

  },
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    height: 150,
  },
  workoutCounterContainer: {
    backgroundColor: 'black',
    borderRadius: 15,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutCounterText: {
    color: '#FF5E00',
    fontSize: 30,
    fontWeight: 'bold',
  },
  workoutCounterNumber: {
    color: '#FF5E00',
    fontSize: 80,
    fontWeight: 'bold',
    marginTop: 0,
  },
  caloriesContainer: {
    backgroundColor: 'black',
    borderRadius: 15,
    width: '45%',
    justifyContent: 'center',
  },
  caloriesText: {
    color: '#FF5E00',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "left",
    marginLeft: 15,
  },
  caloriesNumber: {
    color: '#FF5E00',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 15,
  },
  numberCaloriesText: {
    color: '#FF5E00',
    fontSize: 20,
    textAlign: "left",
    marginLeft: 15,
  },
 
});

export default HomeScreen;
