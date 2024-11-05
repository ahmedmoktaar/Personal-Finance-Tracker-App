import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, FlatList } from "react-native";
import Form from "../components/Form";
import Card from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
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
        setTransactions(values);
      }
    } catch (e) {
      console.error(e);
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

      <FlatList data={transactions} renderItem={({ item }) => <Card transaction={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomePage;
