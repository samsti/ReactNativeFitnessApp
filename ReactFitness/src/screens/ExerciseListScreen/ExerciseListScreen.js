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
            expanded={index === expandedIndex}
            toggleExpand={() => toggleExpand(index)}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});

export default ExerciseListScreen;
