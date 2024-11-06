import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, FlatList } from "react-native";
import Form from "../components/Form";
import Card from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { sortDescendingValues } from "../utils/sortDescendingValues";
import { Picker } from "@react-native-picker/picker";
import { TotalMoneyForCurrentMonth } from "../utils/calculateTotalMoney";
import colors from "../constants/colors";
import Filter from "../components/Filter";

const HomePage = () => {
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store transactions
  const [transactions, setTransactions] = useState([]);
  // State to store original transactions for filtering/sorting
  const [originalTransactions, setOriginalTransactions] = useState([]);
  // Calculate total expense for the current month
  const totalExpenseForCurrentMonth = TotalMoneyForCurrentMonth(originalTransactions, "expense");
  // Calculate total income for the current month
  const totalIncomeForCurrentMonth = TotalMoneyForCurrentMonth(originalTransactions, "income");
  // State to store selected filter
  const [selectedFilter, setSelectedFilter] = useState("Most Recent");


  // Function to handle modal visibility
  const handleModalVisibility = () => {
    setIsModalVisible(true);
  };

  // Function to fetch data from AsyncStorage
  const fetchData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length > 0) {
        const valuesArray = await AsyncStorage.multiGet(keys);
        const values = valuesArray.map(([key, value]) => ({
          key,
          ...JSON.parse(value),
        }));
        const sortedValues = sortDescendingValues(values);
        setTransactions(sortedValues);
        setOriginalTransactions(sortedValues);
        TotalMoneyForCurrentMonth(sortedValues);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Function to handle filter change
  const handleFilterChange = (type) => {
    switch (type) {
      case "Most Recent":
        setTransactions(sortDescendingValues(originalTransactions));
        break;
      case "Oldest":
        const sortedValues = originalTransactions.reverse();
        setTransactions(sortedValues);
        break;
      case "Income":
        const filteredValues = originalTransactions.filter((transaction) => transaction.type === "income");
        setTransactions(filteredValues);
        break;
      case "Expense":
        const filteredValuesExpense = originalTransactions.filter((transaction) => transaction.type === "expense");
        setTransactions(filteredValuesExpense);
        break;
      default:
        console.log("No filter selected");
        break;
    }
    setSelectedFilter(type);
  };

  // Fetch data when the component mounts or modal visibility changes
  useEffect(() => {
    fetchData();
  }, [isModalVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.transactionContainer}>
        <View style={styles.addTransactionContainer}>
          <Text style={styles.addTransaction}>Add Transaction</Text>
          <Ionicons name="add" size={30} color="black" onPress={handleModalVisibility} style={styles.icon} />
        </View>

        <View style={styles.totalTextContainer}>
          <Text style={styles.totalText}>Current Month Total Income:</Text>
          <Text style={styles.totalMoney}> ${totalIncomeForCurrentMonth}</Text>
        </View>
        <View style={styles.totalTextContainer}>
          <Text style={styles.totalText}>Current Month Total Expense:</Text>
          <Text style={styles.totalMoney}> ${totalExpenseForCurrentMonth}</Text>
        </View>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <Form setIsModalVisible={setIsModalVisible} />
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Filter type="Income" handleFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
        <Filter type="Expense" handleFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
        <Filter type="Most Recent" handleFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
        <Filter type="Oldest" handleFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
      </View>

      <FlatList data={transactions} renderItem={({ item }) => <Card transaction={item} />} style={styles.flatList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  transactionContainer: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  addTransactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  addTransaction: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  totalTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  totalText: {
    fontSize: 16,
    color: "white",
  },
  totalMoney: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.203)",
    borderWidth: 1,
    color: "white",
  },
  modal: {
    flex: 1,
  },
  flatList: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  button: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
    maxWidth: 150,
  },
});

export default HomePage;
