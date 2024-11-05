import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ transaction }) => {
  return (
    <View>
      <Text>{transaction.category}</Text>
      <Text>{transaction.amount}</Text>
      <Text>{transaction.date}</Text>
      {transaction.description && <Text>{transaction.description}</Text>}
      <Text>{transaction.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Card;
