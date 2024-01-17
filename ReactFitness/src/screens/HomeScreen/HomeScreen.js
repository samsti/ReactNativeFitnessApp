// HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleMuscleGroupClick = (muscleGroupName) => {
    navigation.navigate('ExerciseList', { muscleGroupName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Muscle Groups</Text>
      <Button onPress={() => handleMuscleGroupClick('back')} title="Back" />
      {/* Add more buttons for other muscle groups as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
