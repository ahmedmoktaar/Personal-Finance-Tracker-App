import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const Card = ({ transaction }) => {
  const amountStyle = { color: transaction.type === "expense" ? colors.red : colors.green, fontSize: 16 };

  return (
    <View style={styles.card}>
      <Text style={styles.category}>{transaction.category}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.date}>{transaction.date}</Text>
        <Text style={amountStyle}>
          {transaction.type === "expense" ? "-" : "+"} {transaction.amount}
        </Text>
      </View>
      {transaction.description && <Text style={styles.description}>{transaction.description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: colors.gray,
  },
  description: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 5,
  },
});

export default Card;
