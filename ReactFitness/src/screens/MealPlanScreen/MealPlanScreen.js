import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import NutritionDataFetcher from '../../components/NutritionDataFetcher'; // Import the NutritionDataFetcher component

const MealPlanScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);

 
  const handleSearch = (query) => {
      setSearchQuery(query);
  };

  const toggle = () => {
    return !value;
  }


  let value = false;


  const handleFetchComplete = (data) => {
    setNutritionInfo(data);
  };

  const handleFoodSelection = (food) => {
    setSelectedFood(food);
    setSearchResults([]); // Clear search results
    setNutritionInfo(null); // Clear nutrition info when selecting new food
  };

  const handleAddToMealPlan = () => {
    // Calculate nutritional information based on the selected weight
    // Add the selected food to the meal plan
    // You can implement this based on your specific requirements
  };

  const handleShowNutritionInfo = () => {
    setNutritionInfo(selectedFood); // Display nutrition info for selected food
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a food"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <TouchableOpacity onPress={toggle}>
        <Text>VYHLEDAT</Text>
      </TouchableOpacity>

      {/* Fetch data from Nutrition API based on search query */}
      <NutritionDataFetcher searchQuery={searchQuery} onFetchComplete={handleFetchComplete} />

      {/* Display selected food and input for weight */}
      {selectedFood && (
        <View style={styles.selectedFoodContainer}>
          <Text style={styles.selectedFoodName}>{selectedFood.name}</Text>
          <TextInput
            style={styles.weightInput}
            placeholder="Enter weight in grams"
            value={selectedWeight}
            onChangeText={setSelectedWeight}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleAddToMealPlan} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Add to Meal Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShowNutritionInfo} style={styles.infoButton}>
            <Text style={styles.infoButtonLabel}>Show Nutritional Info</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Display nutritional information */}
      {nutritionInfo && (
        <View style={styles.nutritionInfoContainer}>
          <Text style={styles.nutritionInfoTitle}>Nutritional Information</Text>
          <Text>Food: {nutritionInfo.name}</Text>
          <Text>Calories: {nutritionInfo.calories}</Text>
          <Text>Protein: {nutritionInfo.protein_g}</Text>
          <Text>Fat: {nutritionInfo.fat_total_g}</Text>
          <Text>Carbohydrates: {nutritionInfo.carbohydrates_total_g}</Text>
        </View>
      )}

      {/* Display search results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFoodSelection(item)} style={styles.resultItem}>
            <Text style={styles.resultItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  selectedFoodContainer: {
    marginTop: 16,
  },
  selectedFoodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  weightInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  infoButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nutritionInfoContainer: {
    marginTop: 16,
  },
  nutritionInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  resultItemText: {
    fontSize: 16,
  },
});

export default MealPlanScreen;
