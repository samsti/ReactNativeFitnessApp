// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Image, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrainingsSlider from '../../components/TrainingsSlider';
import NavBar from '../../components/navBar/navBar';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { updateTotalCalories, updateTotalEvents } from '../../redux/actions'; // Import the action to update total calories


 
const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [markedDates, setMarkedDates] = useState({});


  const totalCalories = useSelector(state => state.totalCalories); // Retrieve totalCalories from Redux store
  const totalEvents = useSelector(state => state.totalEvents);
  const dispatch = useDispatch();

  const navigation = useNavigation();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the username from AsyncStorage
        const username = await AsyncStorage.getItem('username');
    
        // Retrieve the user with the provided username from Firestore
        const userSnapshot = await firestore().collection('user').where('username', '==', username).get();
    
        if (!userSnapshot.empty) {
          // Assuming there's only one user with the provided username
          const userData = userSnapshot.docs[0].data();
          // Include the document ID in the user data
          userData.uid = userSnapshot.docs[0].id;
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


   useEffect(() => {
    const fetchTotalCalories = async () => {
      try {
        const totalCaloriesData = await AsyncStorage.getItem('totalCalories');
        if (totalCaloriesData !== null) {
          // Dispatch action to update totalCalories in Redux store
          dispatch(updateTotalCalories(parseInt(totalCaloriesData)));
        } else {
          console.log('Total calories data not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving total calories:', error);
      }
    };

    fetchTotalCalories();
  }, [dispatch]); // Add dispatch to dependency array

  useEffect(() => {
    // Load events for all dates from AsyncStorage on component mount
    loadMarkedDates();
  }, []);
  
  const loadMarkedDates = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      const allEvents = storedEvents ? JSON.parse(storedEvents) : {};
  
      const updatedMarkedDates = {};
  
      // Iterate through allEvents to mark dates with events
      Object.keys(allEvents).forEach((date) => {
        if (allEvents[date].length > 0) {
          updatedMarkedDates[date] = { marked: true, dotColor: '#FF5E00' };
        }
      });
  
      // Update Redux store with totalEvents
      dispatch(updateTotalEvents(Object.values(allEvents).flat().length));
  
      setMarkedDates(updatedMarkedDates);
    } catch (error) {
      console.error('Error loading marked dates:', error);
    }
  };
  

  
  const onDayPress = (day) => {
    const currentDate = day.dateString;
    // Navigate to the CalendarScreen with the selected date
    navigation.navigate('Calendar', { selectedDate: currentDate });

  };

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.calendarContainer}>
      {console.log('Marked dates:', markedDates)}

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
          <Text style={styles.workoutCounterText}>workouts</Text>
          <Text style={styles.workoutCounterNumber}>{totalEvents}</Text>
        </View>
        <View style={styles.caloriesContainer}>
          <Text style={styles.caloriesText}>Today</Text>
          <Text style={styles.numberCaloriesText}>Budget {userData && userData.kcalPerDay ? userData.kcalPerDay.toString() + ' Cal' : ""}</Text>
          <Text style={styles.numberCaloriesText}>Current Kcal:</Text>
          <Text style={styles.caloriesNumber}>{totalCalories}</Text>  
        </View>
      </View>
      <View style={styles.sliderContainer}>
      <TrainingsSlider/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: 'grey',
    height: '100%',
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
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
    fontFamily: "Rajdhani-Bold",
  },
  workoutCounterNumber: {
    color: '#FF5E00',
    fontSize: 80,
    fontFamily: "Rajdhani-Bold",
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
    fontFamily: "Rajdhani-Bold",
    textAlign: "left",
    marginLeft: 15,
  },
  caloriesNumber: {
    color: '#FF5E00',
    fontSize: 50,
    fontFamily: "Rajdhani-Bold",
    marginTop: 0,
    marginLeft: 15,
  },
  numberCaloriesText: {
    color: '#FF5E00',
    fontFamily: "Rajdhani-Medium",
    fontSize: 20,
    textAlign: "left",
    marginLeft: 15,
  },
 
});

export default HomeScreen;
