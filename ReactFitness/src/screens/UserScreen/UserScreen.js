import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import NavBar from "../../components/navBar/navBar";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import firestore from "firebase/firestore";

const UserScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        firestore.collection(user).doc(user.uid);
        console.warn(firestore.collection(user).doc(user.uid))
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
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
        <Text style={styles.username}>{userData ? userData.displayName : ""}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>USERNAME</Text>
          <TextInput
            style={styles.input}
            value={userData ? userData.uid : ""}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>AGE</Text>
          <TextInput
            style={styles.input}
            value="25" // Example value, replace with actual age data if available
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>HEIGHT (cm)</Text>
          <TextInput
            style={styles.input}
            value="180" // Example value, replace with actual height data if available
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>WEIGHT (kg)</Text>
          <TextInput
            style={styles.input}
            value="70" // Example value, replace with actual weight data if available
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.headings}>KCAL PER DAY</Text>
          <TextInput
            style={styles.input}
            value="2800" // Example value, replace with actual kcal data if available
            editable={false}
          />
        </View>

        <TouchableOpacity style={styles.addButton}>
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
