// ExerciseCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const exerciseCard = ({ exercise, expanded, toggleExpand }) => {
  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        { width: expanded ? '100%' : '100%' },
        expanded && { marginBottom: 16 },
      ]}
      onPress={toggleExpand}
    >
      <Image source={{ uri: exercise.gifUrl }} style={styles.gifImage(expanded)} />
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      {expanded && (
        <>
          <Text style={styles.sectionHeading}>Equipment:</Text>
          <Text style={styles.additionalInfo}>{exercise.equipment}</Text>

          <Text style={styles.sectionHeading}>Target:</Text>
          <Text style={styles.additionalInfo}>{exercise.target}</Text>

          <Text style={styles.sectionHeading}>Instructions:</Text>
          <Text style={styles.instructions}>{exercise.instructions}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  gifImage: (expanded) => ({
    width: '100%',
    height: expanded ? 330 : 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  }),
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  additionalInfo: {
    fontSize: 14,
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default exerciseCard;
