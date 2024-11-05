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

const HomePage = () => {
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store transactions
  const [transactions, setTransactions] = useState([]);
  // State to store original transactions for filtering/sorting
  const [originalTransactions, setOriginalTransactions] = useState([]);
  // State to store the selected filter type
  const [filterType, setFilterType] = useState("");
  // State to store the selected sort type
  const [sortType, setSortType] = useState("");

  // Calculate total expense for the current month
  const totalExpenseForCurrentMonth = TotalMoneyForCurrentMonth(transactions, "expense");
  // Calculate total income for the current month
  const totalIncomeForCurrentMonth = TotalMoneyForCurrentMonth(transactions, "income");

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

  // Function to handle sorting by date
  const handleSortByDate = (type) => {
    setSortType(type);
    setFilterType("");

    if (type === "ascending") {
      sortDescendingValues(originalTransactions);
    } else if (type === "descending") {
      const sortedValues = originalTransactions.reverse();
      setTransactions(sortedValues);
    } else {
      setTransactions(originalTransactions);
    }
  };

  // Function to handle sorting by type (income/expense)
  const handleSortByType = (type) => {
    setFilterType(type);
    setSortType("");
    if (type) {
      const filteredValues = originalTransactions.filter((transaction) => transaction.type === type);
      setTransactions(filteredValues);
    } else {
      setTransactions(originalTransactions);
    }
  };

  // Fetch data when the component mounts or modal visibility changes
  useEffect(() => {
    fetchData();
  }, [isModalVisible]);

  return (
    <View>
      <Text>Welcome to Personal Finance Tracker</Text>
      <Text>{totalExpenseForCurrentMonth}</Text>
      <Text>{totalIncomeForCurrentMonth}</Text>

      <Ionicons name="add-circle" size={24} color="black" onPress={handleModalVisibility} />

      <Modal visible={isModalVisible} animationType="slide">
        <Form setIsModalVisible={setIsModalVisible} />
      </Modal>

      <View>
        <Text>Filter by Date:</Text>
        <Picker selectedValue={sortType} onValueChange={handleSortByDate}>
          <Picker.Item label="ascending" value="ascending" />
          <Picker.Item label="descending" value="descending" />
        </Picker>
        <Text>Filter by Type:</Text>
        <Picker selectedValue={filterType} onValueChange={handleSortByType}>
          <Picker.Item label="income" value="income" />
          <Picker.Item label="expense" value="expense" />
        </Picker>
      </View>

      <FlatList data={transactions} renderItem={({ item }) => <Card transaction={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomePage;
