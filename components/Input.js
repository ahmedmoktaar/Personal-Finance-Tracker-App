import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const Input = (props) => {
  return (
    <View>
      <TextInput {...props} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
