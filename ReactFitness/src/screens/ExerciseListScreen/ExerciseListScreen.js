// ExerciseListScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ExerciseCard from '../../components/ExerciseCard';
import ExerciseDataFetcher from '../../components/ExerciseDataFetcher';

const ExerciseListScreen = ({ route }) => {
  const selectedMuscle = route.params?.selectedMuscle || '';
  const [exerciseData, setExerciseData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    cardContainer: {
      // Your cardContainer styles here
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 16,
      marginBottom: 8,
    },
    gifImage: {
      // Your gifImage styles here
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 8,
    },
    exerciseName: {
      // Your exerciseName styles here
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 8,
    },
    sectionHeading: {
      // Your sectionHeading styles here
      marginTop: 8,
      fontSize: 16,
      fontWeight: 'bold',
    },
    additionalInfo: {
      // Your additionalInfo styles here
      fontSize: 14,
    },
    instructions: {
      // Your instructions styles here
      fontSize: 14,
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text>{selectedMuscle}</Text>
      <ExerciseDataFetcher selectedMuscle={selectedMuscle} onFetchComplete={setExerciseData} />
      <FlatList
        data={exerciseData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={({ item, index }) => (
          <ExerciseCard
            exercise={item}
            styles={styles}
            expanded={index === expandedIndex}
            toggleExpand={() => toggleExpand(index)}
          />
        )}
      />
    </View>
  );
};

export default ExerciseListScreen;
