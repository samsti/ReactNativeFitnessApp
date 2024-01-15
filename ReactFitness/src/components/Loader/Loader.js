import { View, Text } from "react-native";
import React from "react";
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <View direction="row" justifyContent="center" alignItems="center" width="100%">
      <InfinitySpin color="grey" />
    </View>
  );
};

export default Loader;
