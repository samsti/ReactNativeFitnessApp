import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import NutritionDataFetcher from '../../components/NutritionDataFetcher'; // Import the NutritionDataFetcher component
import NavBar from '../../components/navBar/navBar';

const MealPlanScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [fetchData, setFetchData] = useState(false); // State to control fetching data
  const [assignedFoods, setAssignedFoods] = useState({
    BREAKFAST: [],
    SNACK1: [],
    LUNCH: [],
    SNACK2: [],
    DINNER: [],
  });
  const [selectedMealTime, setSelectedMealTime] = useState(null); // State to track selected meal time
  const [totalCalories, setTotalCalories] = useState(0); // State to store total calories
  const [weight, setWeight] = useState('');

  useEffect(() => {
    // Calculate total calories when assignedFoods changes
    let total = 0;
    Object.values(assignedFoods).forEach((mealFoods) => {
      mealFoods.forEach((food) => {
        total += parseInt(food.nutritionInfo.calories);
      });
    });
    setTotalCalories(total);
  }, [assignedFoods]);

  const handleSearch = () => {
    setFetchData(true); // Set fetchData state to true to trigger fetching
  };

  const handleFetchComplete = (data) => {
    setNutritionInfo(data);
    setFetchData(false); // Reset fetchData state to false after data is fetched
  };

  const handleFoodSelection = (food) => {
    setSelectedFood(food);
    setSearchResults([]); // Clear search results
    setNutritionInfo(null); // Clear nutrition info when selecting new food
  };

  const handleAddToMealPlan = (mealTime) => {
    console.log("Adding food to meal time:", mealTime); // Log the meal time
    if (nutritionInfo && nutritionInfo.name && mealTime && mealTime.trim()) {
      const foodToAdd = {
        name: nutritionInfo.name, // Use displayed nutritionInfo.name as selected food
        nutritionInfo: {
          calories: nutritionInfo.calories,
          protein_g: nutritionInfo.protein_g,
          fat_total_g: nutritionInfo.fat_total_g,
          carbohydrates_total_g: nutritionInfo.carbohydrates_total_g,
          weight: weight // Add weight to nutritionInfo
        }
      };

      // Add the selected food to the corresponding meal time array
      setAssignedFoods(prev => ({
        ...prev,
        [mealTime]: [...prev[mealTime], foodToAdd]
      }));

      setNutritionInfo(null); // Clear nutrition info after adding to meal plan
      setWeight(''); // Clear weight input
    } else {
      console.log('Selected food or meal time is invalid');
    }
  };

  const handleShowNutritionInfo = (food) => {
    setNutritionInfo(food); // Display nutrition info for selected food
  };

  const handleMealTimeSelection = (mealTime) => {
    setSelectedMealTime(mealTime === selectedMealTime ? null : mealTime);
  };

  return (
    <>
      <NavBar />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search food"
            value={searchQuery}
            onChangeText={setSearchQuery} // Update searchQuery state on every text change
          />
          <TextInput
            style={styles.weightInput} 
            value={weight}
            onChangeText={setWeight}
            placeholder="weight(g)"
          />
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.searchButton}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        {/* Fetch data from Nutrition API based on search query only when fetchData is true */}
        {fetchData && <NutritionDataFetcher searchQuery={`${weight}g ${searchQuery} `} onFetchComplete={handleFetchComplete} />}

        {/* Display nutrition info */}
        {nutritionInfo && (
          <View style={styles.nutritionContainer}>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionHeader}>Food</Text>
              <Text style={styles.nutritionHeader}>Calories</Text>
              <Text style={styles.nutritionHeader}>Protein</Text>
              <Text style={styles.nutritionHeader}>Fat</Text>
              <Text style={styles.nutritionHeader}>Carbohydrates</Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionInfo}>{nutritionInfo.name}</Text>
              <Text style={styles.nutritionInfo}>{nutritionInfo.calories}</Text>
              <Text style={styles.nutritionInfo}>{nutritionInfo.protein_g}g</Text>
              <Text style={styles.nutritionInfo}>{nutritionInfo.fat_total_g}g</Text>
              <Text style={styles.nutritionInfo}>{nutritionInfo.carbohydrates_total_g}g</Text>
            </View>
          </View>
        )}

        <View style={styles.mealTimesContainer}>
          {Object.keys(assignedFoods).map((mealTime) => (
            <View key={mealTime}>
              <View style={styles.mealTimeContainer}>
                <TouchableOpacity onPress={() => handleMealTimeSelection(mealTime)} style={styles.mealTimeButton}>
                  <Text style={styles.mealTimeText}>{mealTime}</Text>
                </TouchableOpacity>
                {/* Move the addButton inside the mealTimeContainer */}
                <TouchableOpacity onPress={() => handleAddToMealPlan(mealTime)} style={styles.addButton}>
                  <Text style={styles.addButtonLabel}>add</Text>
                </TouchableOpacity>
              </View>
              {/* Place the assignedFoodsContainer below the mealTimeContainer */}
              {selectedMealTime === mealTime && (
                <View style={styles.assignedFoodsContainer}>
                  <View style={styles.assignedFoodsRow}>
                    <Text style={styles.assignedFoodsHeader}>Food</Text>
                    <Text style={styles.assignedFoodsHeader}>Calories</Text>
                    <Text style={styles.assignedFoodsHeader}>Protein</Text>
                    <Text style={styles.assignedFoodsHeader}>Fat</Text>
                    <Text style={styles.assignedFoodsHeader}>Carbs</Text>
                  </View>
                  {assignedFoods[mealTime].map((food, index) => (
                    <View key={index} style={styles.assignedFoodsRow}>
                      <Text>{food.name}</Text>
                      <Text>{food.nutritionInfo.calories}</Text>
                      <Text>{food.nutritionInfo.protein_g}g</Text>
                      <Text>{food.nutritionInfo.fat_total_g}g</Text>
                      <Text>{food.nutritionInfo.carbohydrates_total_g}g</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>


        {/* Display total calories */}
        <View style={styles.totalCaloriesContainer}>
          <Text style={styles.totalCaloriesLabel}>Total calories: {totalCalories}</Text>
        </View>

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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
  },

  weightInput: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginLeft: 10,
  },

  searchButton: {
    marginLeft: 8,
    padding: 10,
    backgroundColor: "#FF5E00",
    borderRadius: 8,
    color: 'white',
  },
  selectedFoodContainer: {
    marginTop: 16,
  },
  selectedFoodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#FF5E00",
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 10,
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
  nutritionContainer: {
    marginTop: 16,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  nutritionInfo: {
    textAlign: 'center',
  },
  nutritionHeader: {
    fontWeight: 'bold',
  },
  mealTimesContainer: {
    marginTop: 16,
  },
  mealTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items center
  },
  mealTimeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  mealTimeText: {
    textAlign: 'center',
    width: 310,
  },
  assignedFoodsContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 330,
  },
  assignedFoodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Change to 'space-between' to evenly distribute items
    marginBottom: 15,
    paddingHorizontal: 10, // Add paddingHorizontal to provide space on the sides
  },
  assignedFoodsHeader: {
    fontWeight: 'bold',
    textAlign: 'center', // Center headings
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
    textAlign: 'center',
    color: "red",
  },
  totalCaloriesContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  totalCaloriesLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MealPlanScreen;
