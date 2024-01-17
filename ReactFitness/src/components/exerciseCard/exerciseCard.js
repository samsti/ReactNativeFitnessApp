import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ExerciseCard = ({ exercise }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: exercise.gifUrl }} style={styles.gifImage} />
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.instructions}>{exercise.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: '45%',
  },
  gifImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
  },
});

export default ExerciseCard;
