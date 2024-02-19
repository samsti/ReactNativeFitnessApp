import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, ViewPropTypes } from "react-native";
import NavBar from "../../components/navBar/navBar";
import firestore from '@react-native-firebase/firestore';
import PropTypes from 'prop-types'; // Import PropTypes from the 'prop-types' package
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the username from AsyncStorage
        const username = await AsyncStorage.getItem('username');

        // Retrieve the user with the provided username from Firestore
        const userSnapshot = await firestore().collection('user').where('username', '==', username).get();
        
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>USERNAME</Text>
          <TextInput
            style={styles.input}
            value={userData ? userData.username : ""}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>AGE</Text>
          <TextInput
            style={styles.input}
            value={userData ? userData.age : ""}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>HEIGHT (cm)</Text>
          <TextInput
            style={styles.input}
            value={userData ? userData.height : ""}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>WEIGHT (kg)</Text>
          <TextInput
            style={styles.input}
            value={userData ? userData.weight : ""}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>KCAL PER DAY</Text>
          <TextInput
            style={styles.input}
            value={userData ? userData.kcalPerDay : ""}
          />
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.textButton}>save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

UserScreen.propTypes = {
  style: ViewPropTypes.style, // Use ViewPropTypes instead of PropTypes
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
    marginTop: 34,
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
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "Rajdhani-Medium",
  },
  username: {
    fontSize: 24,
    color: "white",
    fontFamily: "Rajdhani-Bold",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 3,
    alignItems: "center",
    height: 89,
    justifyContent: "center",
    width: "80%",
    marginTop: 20,
  },
  textButton: {
    color: "#FF5E00",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default UserScreen;
