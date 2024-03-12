import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ExerciseCard from '../../components/ExerciseCard';
import ExerciseDataFetcher from '../../components/ExerciseDataFetcher';
import NavBar from '../../components/navBar/navBar';

const ExerciseListScreen = ({ route }) => {
  const selectedMuscle = route.params?.selectedMuscle || '';
  const [exerciseData, setExerciseData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
  <>
    <NavBar />
    <View style={styles.container}>
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
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#484847",
  },
  muscleName: {
    color: "#FF5E00",
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    padding: 16,
    marginBottom: 8,
    marginLeft: 50,
  },
  gifImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  exerciseName: {
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionHeading: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalInfo: {
    fontSize: 14,
  },
  instructions: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default ExerciseListScreen;
