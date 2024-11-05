import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Modal } from "react-native";
import Form from "../components/Form";

const HomePage = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModalVibility = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View>
      <Text>Welcome to Personal Finance Tracker</Text>

      <Ionicons name="add-circle" size={24} color="black" onPress={handleModalVibility} />

      <Modal visible={isModalVisible} animationType="slide">
        <Form setIsModalVisible={setIsModalVisible}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomePage;
