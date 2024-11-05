import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, FlatList } from "react-native";
import Form from "../components/Form";
import Card from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { sortDescendingValues } from "../utils/sortDescendingValues";
import { Picker } from "@react-native-picker/picker";

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [OriginalTransactions, setOriginalTransactions] = useState();
  const [filterType, setFilterType] = useState("");
  const [sortType, setSortType] = useState("");
  const handleModalVibility = () => {
    setIsModalVisible(true);
  };

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
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleSortByDate = (type) => {
    setSortType(type);
    setFilterType("");

    if (type === "ascending") {
      sortDescendingValues(OriginalTransactions);
    } else if (type === "descending") {
      const sortedValues = OriginalTransactions.reverse();
      setTransactions(sortedValues);
    } else {
      setTransactions(OriginalTransactions);
    }
  };

  const handleSortByType = (type) => {
    setFilterType(type);
    setSortType("");
    if (type === "income") {
      const filteredValues = OriginalTransactions.filter((transaction) => transaction.type === "income");
      setTransactions(filteredValues);
    } else if (type === "expense") {
      const filteredValues = OriginalTransactions.filter((transaction) => transaction.type === "expense");
      setTransactions(filteredValues);
    } else {
      setTransactions(OriginalTransactions);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isModalVisible]);

  return (
    <View>
      <Text>Welcome to Personal Finance Tracker</Text>

      <Ionicons name="add-circle" size={24} color="black" onPress={handleModalVibility} />

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
        <Ionicons
          name="filter"
          size={24}
          color="black"
          onPress={() => {
            /* Implement type filter logic */
          }}
        />
      </View>

      <FlatList data={transactions} renderItem={({ item }) => <Card transaction={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomePage;
