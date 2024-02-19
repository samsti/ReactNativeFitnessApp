import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import NavBar from "../../components/navBar/navBar";


const UserScreen = () => {

  const uID = firebase.auth().currentUser.uid;
  const user = firestore.collection('user').getDocs(uID);

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
        <Text style={styles.username}>{user.username}</Text>
        
        <View style={styles.inputContainer}>
            <Text style={styles.headings}>USERNAME</Text>
                <TextInput
                style={styles.input}
                value="Sam Sulek"
                />
        </View>
    
        <View style={styles.inputContainer}>
        <Text style={styles.headings}>AGE</Text>
            <TextInput
            style={styles.input}
            value="25"
            />
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.headings}>HEIGHT (cm)</Text>
            <TextInput
            style={styles.input}
            value="180"
            />
        </View>
        
        <View style={styles.inputContainer}>
        <Text style={styles.headings}>WEIGHT (kg)</Text>
            <TextInput
            style={styles.input}
            value="70"
            />
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.headings}>KCAL PER DAY</Text>
            <TextInput
            style={styles.input}
            value="2800"
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
    height: "100%",
    width: "100%",
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
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 3,
    alignItems: 'center',
    height: 89,
    justifyContent: 'center',
    width: "80%",
    marginTop: 20,
  },
  textButton: {
    color: "#FF5E00",
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UserScreen;
