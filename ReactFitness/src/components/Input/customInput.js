import React from 'react';
import { View, TextInput, StyleSheet, Image,} from 'react-native';
import CustomButton from '../../components/customButton'; // Import your CustomButton component
//<Image
//source={require('../../assets/images/zamek.png')} // Replace with your password icon path
//style={styles.iconStyle}
///>

const Input = ({ value, setValue, placeholder, secureTextEntry, iconImage, imageSource, type }) => {
  return (
    <View style={[styles.textContainer, styles[`textContainer_${type}`]]}>
     {imageSource && <Image source={imageSource} style={styles.icon} />}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="white"
        style={styles.input}
        Image={iconImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: '70%',
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f54a07',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 7,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: 10, 
    resizeMode: 'contain',
    tintColor: 'white',
  },
  input: {
    flex: 1,
    fontFamily: "Rajdhani-Medium",
    height: '100%',
    fontSize: 14,
    color: 'white',
    paddingVertical: 8, 
    backgroundColor: '#a83203',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,// Adjust vertical padding for the text input
  },
  textContainer_REGISTER: {
    height: '8%',
  },
  textContainer_REGISTER2: {
    height: '7%',
    width: '55%',
  },
});

export default Input;
