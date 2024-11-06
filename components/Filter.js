import { View, Text, StyleSheet } from "react-native";

const Filter = ({ type, handleFilterChange, selectedFilter }) => {
  return (
    <View style={[styles.typeButton, selectedFilter === type ? styles.typeButtonSelected : styles.typeButtonNotSelected]}>
      <Text
        onPress={() => {
          handleFilterChange(type);
        }}
        style={[styles.typeButtonText, { color: selectedFilter === type ? "white" : "black" }]}
      >
        {type}
      </Text>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  typeButton: {
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  typeButtonText: {
    padding: 6,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  typeButtonSelected: {
    backgroundColor: "green",
  },
  typeButtonNotSelected: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});
