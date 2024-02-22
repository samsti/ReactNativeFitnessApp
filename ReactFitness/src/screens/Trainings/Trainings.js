import React, { useState } from 'react';
import { TouchableOpacity, Text, Animated, StyleSheet, View } from 'react-native';
import ExerciseListScreen from '../../screens/ExerciseListScreen'; // Assuming ExerciseListScreen.js is in the same directory
import ExerciseDataFetcher from '../../components/ExerciseDataFetcher';

const Trainings = ({ route }) => {

  const [exerciseData, setExerciseData] = useState([]);

  const selectedMuscle = route.params?.selectedMuscle || '';
  console.warn('Selected Muscle in Trainings:', selectedMuscle);

  return (
    <>
    <ExerciseDataFetcher selectedMuscle={selectedMuscle} onFetchComplete={setExerciseData} />
    <ExerciseListScreen route={{ params: { selectedMuscle } }} />
    </>
  );
};

export default Trainings;
