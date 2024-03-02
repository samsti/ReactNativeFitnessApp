import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'; // Importing useSelector and useDispatch
import { updateTotalCalories } from '../../redux/actions'; // Assuming the path to your actions file is correct
import NavBar from '../../components/navBar/navBar';
import NutritionDataFetcher from '../../components/NutritionDataFetcher';

const MealPlanScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [fetchData, setFetchData] = useState(false);
  const [assignedFoods, setAssignedFoods] = useState({
    BREAKFAST: [],
    SNACK1: [],
    LUNCH: [],
    SNACK2: [],
    DINNER: [],
  });
  const [selectedMealTime, setSelectedMealTime] = useState(null);
  // Remove totalCalories state
  // const [totalCalories, setTotalCalories] = useState(0);
  const [weight, setWeight] = useState('');

  const dispatch = useDispatch(); // Initializing useDispatch hook

  // Load assigned foods and total calories from Redux store when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const assignedFoodsData = await AsyncStorage.getItem('assignedFoods');
        const totalCaloriesData = await AsyncStorage.getItem('totalCalories');

        if (assignedFoodsData) {
          setAssignedFoods(JSON.parse(assignedFoodsData));
        }
        // Remove setting totalCalories from AsyncStorage
        // if (totalCaloriesData) {
        //   setTotalCalories(parseInt(totalCaloriesData));
        // }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Recalculate total calories whenever assignedFoods change
  useEffect(() => {
    let total = 0;
    Object.values(assignedFoods).forEach((mealFoods) => {
      mealFoods.forEach((food) => {
        total += food.nutritionInfo.calories;
      });
    });
  
    // Ensure totalCalories is an integer (no decimal places)
    total = parseInt(total);
  
    // Update Redux store with totalCalories
    dispatch(updateTotalCalories(total));
  }, [assignedFoods, dispatch]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('assignedFoods', JSON.stringify(assignedFoods));
      // Store totalCalories in AsyncStorage
      await AsyncStorage.setItem('totalCalories', totalCalories.toString());
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Use useSelector to get totalCalories from Redux store
  const totalCalories = useSelector(state => state.totalCalories);
  
  // Rest of your component code remains the same...

  const handleSearch = () => {
    setFetchData(true); // Set fetchData state to true to trigger fetching

    saveData();
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

  const handleDeleteFood = (mealTime, index) => {
    // Create a copy of the assignedFoods object
    const updatedAssignedFoods = { ...assignedFoods };
  
    // Remove the food item at the specified index from the assignedFoods array for the given mealTime
    updatedAssignedFoods[mealTime].splice(index, 1);
  
    // Update the state with the updated assignedFoods object
    setAssignedFoods(updatedAssignedFoods);
  };
  

  return (
    <>
      <NavBar />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search food"
            placeholderTextColor="#FF5E00"
            value={searchQuery}
            onChangeText={setSearchQuery} // Update searchQuery state on every text change
          />
          <TextInput
            style={styles.weightInput} 
            value={weight}
            onChangeText={setWeight}
            placeholder="weight(g)"
            placeholderTextColor="#FF5E00"
            keyboardType="numeric"
          />
          <View style={styles.imgContainer}>
              <TouchableOpacity onPress={handleSearch}>
            <Image
              source={require('../../assets/images/search.png')} // Adjust the path to your custom icon
              style={styles.searchIcon}
            />
          </TouchableOpacity>
      </View>
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
              <Text style={styles.nutritionHeader}>Carbs</Text>
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
                <View style={styles.onlyMealTime}>
                    <TouchableOpacity onPress={() => handleMealTimeSelection(mealTime)} style={styles.mealTimeButton}>
                      <Text style={styles.mealTimeText}>{mealTime}</Text>
                    </TouchableOpacity>
                </View>
                {/* Move the addButton inside the mealTimeContainer */}
                <TouchableOpacity onPress={() => handleAddToMealPlan(mealTime)} style={styles.addButton}>
                  <Text style={styles.addButtonLabel}>add</Text>
                </TouchableOpacity>
              </View>
              {/* Place the assignedFoodsContainer below the mealTimeContainer */}
              
              {selectedMealTime === mealTime && (
                <View>
                  <View style={styles.assignedFoodsContainer}>
                    <View style={styles.assignedFoodsRow}>
                      <Text style={styles.assignedFoodsHeader}>Food</Text>
                      <Text style={styles.assignedFoodsHeader}>Calories</Text>
                      <Text style={styles.assignedFoodsHeader}>Protein</Text>
                      <Text style={styles.assignedFoodsHeader}>Fat</Text>
                      <Text style={styles.assignedFoodsHeader}>Carbs</Text>
                      <Text style={styles.assignedFoodsHeader}>          </Text>
                    </View>
                    {assignedFoods[mealTime].map((food, index) => (
                     <View key={index} style={styles.assignedFoodsRow}>
                     <Text style={styles.assignedFoodsText}>{food.name}</Text>
                     <Text style={styles.assignedFoodsText}>{food.nutritionInfo.calories}</Text>
                     <Text style={styles.assignedFoodsText}>{food.nutritionInfo.protein_g}g</Text>
                     <Text style={styles.assignedFoodsText}>{food.nutritionInfo.fat_total_g}g</Text>
                     <Text style={styles.assignedFoodsText}>{food.nutritionInfo.carbohydrates_total_g}g</Text>
                     <View style={styles.deleteCon}>
                      <TouchableOpacity onPress={() => handleDeleteFood(mealTime, index)}>
                        <Image
                          source={require('../../assets/images/trash_orange.png')} // Adjust the path to your custom icon
                          style={styles.trashIcon}
                        />
                      </TouchableOpacity>
                     </View>
                   </View>
                    ))}
               
                  </View>
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
    backgroundColor: '#484847',
  },
  searchContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    
  },
  deleteCon: {
    marginTop: -5,
      height: 35,
      width: 35,
      borderRadius: 4,
  },

  onlyMealTime: {
    backgroundColor: '#ffff',
    borderRadius: 4,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    borderRadius: 4,
    paddingHorizontal: 16,
    fontFamily: "Rajdhani-Medium",
    fontSize: 17,
    color: "#FF5E00",
  },

  weightInput: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginLeft: 10,
    fontFamily: "Rajdhani-Medium",
    fontSize: 17,
    color: "#FF5E00",
  },

  searchIcon: {
    width: 25, // Adjust the width of the background
    height: 30, // Adjust the height of the background
    justifyContent: 'center', // Align icon vertically in the center
    alignItems: 'center', // Align icon horizontally in the center
  },
  imgContainer: {
    height: 40,
    width: 50,
    backgroundColor: "red",
    display: "flex", // Add display flex to enable alignment
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    borderRadius: 4,
    backgroundColor: "black",
    marginLeft: 9,
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
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonLabel: {
    color: '#fff',
    fontFamily: "Rajdhani-Bold",
  },
  nutritionContainer: {
    marginTop: 16,
    backgroundColor: '#ffff',
    borderRadius: 4,
    marginBottom: 16,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  nutritionInfo: {
    textAlign: 'center',
    fontFamily: "Rajdhani-Bold",
    marginRight: 30,
    marginLeft: 23,
    fontSize: 15,
   

  },
  nutritionHeader: {
    fontFamily: "Rajdhani-Regular",
    paddingHorizontal: 30,
    fontSize: 17,
    marginTop: 8,
  },
  mealTimesContainer: {
    marginTop: 16,

  },
  mealTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16, // Optionally add borderRadius to round the corners
    marginBottom: 15,
  },
  mealTimeButton: {
    padding: 10,
    borderRadius: 4,
  },
  mealTimeText: {
    textAlign: 'left',
    borderBottomWidth: 0.5,
    borderBottomColor: '#FF5E00',
    width: 317,
    fontFamily: "Rajdhani-Bold",
    fontSize: 18,
    color: "#FF5E00",
  },
  assignedFoodsContainer: {
    padding: 8,
    marginTop: -23,
    borderRadius: 4,
    width: 337,
    backgroundColor: '#ffff',
    marginBottom: 15,
  },
  assignedFoodsRow: {
    fontFamily: "Rajdhani-Bold",
    flexDirection: 'row',
    justifyContent: 'space-between', // Change to 'space-between' to evenly distribute items
    marginBottom: 15,
    paddingHorizontal: 10, // Add paddingHorizontal to provide space on the sides
  },
  assignedFoodsHeader: {
    fontFamily: "Rajdhani-Regular",
    textAlign: 'left', // Center headings
    fontSize: 17,
    marginBottom: -5,
    marginLeft: -5,
  },
  assignedFoodsText: {
    flex: 1, // Ensure text takes remaining space
    fontFamily: "Rajdhani-Bold",
    fontSize: 15,
    textAlign: 'left', 
    paddingHorizontal: 1,
  },
  trashIcon: {
    width: 23,
    height: 25,
    marginLeft: 6, // Align icon to the right
    marginRight: 0, // Padding from the right
    marginTop: 4,

  },
  resultItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
  },
  resultItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  totalCaloriesContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  totalCaloriesLabel: {
    fontSize: 20,
    fontFamily: "Rajdhani-SemiBold",
    color: "#E6E5C6"
  },
});

export default MealPlanScreen;
