import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import NavBar from "../../components/navBar/navBar";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [modifiedUserData, setModifiedUserData] = useState(null); // State to hold modified user data

  const navigation = useNavigation();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const userSnapshot = await firestore().collection('user').where('username', '==', username).get();

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          userData.uid = userSnapshot.docs[0].id;
          setUserData(userData);
          setModifiedUserData(userData); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (key, value) => {
    // Update the modifiedUserData state with the new input value
    setModifiedUserData({ ...modifiedUserData, [key]: value });
  };

  const handleSaveChanges = async () => {
    try {
      // Update the user data in Firestore
      await firestore().collection('user').doc(userData.uid).update(modifiedUserData);
      Alert.alert('Success', 'User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
      Alert.alert('Error', 'An error occurred while updating user data');
    }
  };

  return (
    <>
      <NavBar />
      <View style={styles.container}>
        <View style={styles.circle}>
          <Image
            source={require("../../assets/images/logo_main.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.username}>{userData ? userData.username : ""}</Text>

        <TouchableOpacity style={styles.logOut} onPress={() => navigation.navigate('LogIn')}>   
            <Text style={styles.logOutText} >Log out</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>USERNAME</Text>
          <TextInput
            style={styles.input}
            value={modifiedUserData ? modifiedUserData.username : ""}
            onChangeText={(text) => handleInputChange('username', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>AGE</Text>
          <TextInput
            style={styles.input}
            value={modifiedUserData ? modifiedUserData.age : ""}
            onChangeText={(text) => handleInputChange('age', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>HEIGHT (cm)</Text>
          <TextInput
            style={styles.input}
            value={modifiedUserData ? modifiedUserData.height : ""}
            onChangeText={(text) => handleInputChange('height', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>WEIGHT (kg)</Text>
          <TextInput
            style={styles.input}
            value={modifiedUserData ? modifiedUserData.weight : ""}
            onChangeText={(text) => handleInputChange('weight', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>KCAL PER DAY</Text>
          <TextInput
            style={styles.input}
            value={modifiedUserData ? modifiedUserData.kcalPerDay : ""}
            onChangeText={(text) => handleInputChange('kcalPerDay', text)}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleSaveChanges}>
          <Text style={styles.textButton}>save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#484847",
    flex: 1,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOut:{
    fontFamily: "Rajdhani-Regular",
    backgroundColor: "red",
    borderRadius: 3,
    width: 80,
    height: 35,
    verticalAlign: "middle", 
    justifyContent: "center",
    marginTop: 15,
  },
  logOutText: {
    textAlign: "center",
    justifyContent: "center",
    verticalAlign: "middle", 
    fontFamily: "Rajdhani-Bold",
    color: "white",
    fontSize: 17,
  },
  headings: {
    textAlign: "left",
    fontSize: 15,
    color: "#FF5E00",
    marginTop: 5,
    fontFamily: "Rajdhani-Medium",
  },
  inputContainer: {
    width: "100%",
    marginLeft: "20%",
    marginTop: 5,
  },
  circle: {
    backgroundColor: "black",
    height: 116,
    width: 116,
    borderRadius: 999,
    marginTop: 15,
    borderWidth: 2,
    borderColor: "#FF5E00",
    justifyContent: "center",
  },
  logo: {
    width: 90,
    height: 70,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "white",
    width: "80%",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "Rajdhani-Medium",
  },
  username: {
    fontSize: 24,
    color: "white",
    fontFamily: "Rajdhani-Bold",
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 3,
    alignItems: "center",
    height: 70,
    justifyContent: "center",
    width: "80%",
    marginTop: 15,
  },
  textButton: {
    color: "#FF5E00",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default UserScreen;
