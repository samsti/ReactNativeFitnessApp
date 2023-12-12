import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Input = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.textContainer}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="white"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: '70%',
    justifyContent: 'center',
    backgroundColor: '#FF5E00',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  input: {
    color: 'white',
    paddingHorizontal: 10,
  },
});

export default Input;
