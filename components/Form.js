import React, { useState } from "react";
import { View, Button, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUniqueKey } from "../utils/uniqueKey";

// Define the validation schema using Yup
const FormSchema = Yup.object().shape({
  type: Yup.string().required("Required"),
  amount: Yup.number()
    .typeError("Must be a number")
    .min(1, "Must be greater than zero")
    .max(1000000000, "Must be less than 1,000,000,000")
    .required("Required"),
  category: Yup.string().required("Required"),
  date: Yup.string()
    .matches(/^(0[1-9]|[12][0-9]|3[01])([\/-])(0[1-9]|1[0-2])\2\d{4}$/, "Must be in dd/mm/yyyy or dd-mm-yyyy format")
    .required("Required"),
  description: Yup.string(),
});

// Initial form values
const initialValues = { type: "income", amount: 0, category: "", date: "", description: "" };

// Function to save data to AsyncStorage
const saveData = async (values) => {
  try {
    const key = generateUniqueKey(values);
    const jsonValue = JSON.stringify(values);
    await AsyncStorage.setItem(key, jsonValue);
    console.log("Data successfully saved");
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

// Form component
const Form = ({ setIsModalVisible }) => {
  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // State to manage the selected type (income/expense)
  const [selectedType, setSelectedType] = useState("income");

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          saveData(values);
          handleCloseModal();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.title}>Add Transaction</Text>

            <View style={styles.buttonContainer}>
              <View style={[styles.typeButton, selectedType === "income" ? styles.typeButtonSelected : styles.typeButtonNotSelected]}>
                <Text
                  onPress={() => {
                    handleChange("type")("income");
                    setSelectedType("income");
                  }}
                  style={[styles.typeButtonText, { color: selectedType === "income" ? "white" : "black" }]}
                >
                  Income
                </Text>
              </View>

              <View style={[styles.typeButton, selectedType === "expense" ? styles.typeButtonSelected : styles.typeButtonNotSelected]}>
                <Text
                  onPress={() => {
                    handleChange("type")("expense");
                    setSelectedType("expense");
                  }}
                  style={[styles.typeButtonText, { color: selectedType === "expense" ? "white" : "black" }]}
                >
                  Expense
                </Text>
              </View>
            </View>
            {errors.type && touched.type ? <Text style={styles.error}>{errors.type}</Text> : null}

            <Input
              onChangeText={handleChange("amount")}
              onBlur={handleBlur("amount")}
              value={values.amount}
              label="Amount"
              placeholder="ex: 100"
              maxLength={10}
              keyboardType="decimal-pad"
              style={styles.input}
            />
            {errors.amount && touched.amount ? <Text style={styles.error}>{errors.amount}</Text> : null}

            <Input
              onChangeText={handleChange("category")}
              onBlur={handleBlur("category")}
              value={values.category}
              label="Category"
              placeholder="ex: Food"
              maxLength={40}
              style={styles.input}
            />
            {errors.category && touched.category ? <Text style={styles.error}>{errors.category}</Text> : null}

            <Input
              onChangeText={handleChange("date")}
              onBlur={handleBlur("date")}
              value={values.date}
              label="Date"
              placeholder="ex: 01/01/2021"
              maxLength={10}
              style={styles.input}
            />
            {errors.date && touched.date ? <Text style={styles.error}>{errors.date}</Text> : null}

            <Input
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              label="Description"
              placeholder="ex: Lunch with friends"
              maxLength={200}
              multiline={true}
              numberOfLines={4}
              style={[styles.input, styles.description]}
            />
            {errors.description && touched.description ? <Text style={styles.error}>{errors.description}</Text> : null}

            <View style={[styles.buttonContainer, { alignItems: "flex-end" }]}>
              <View style={[styles.button]}>
                <Button onPress={handleCloseModal} title="Cancel" color={"red"} />
              </View>
              <View style={styles.button}>
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 15,
    marginTop: -5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "ios" && 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  description: {
    height: 100,
    textAlignVertical: "top",
    padding: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  typeButton: {
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  typeButtonText: {
    padding: 12,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  typeButtonSelected: {
    backgroundColor: "green",
  },
  typeButtonNotSelected: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  button: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
    maxWidth: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  picker: {
    marginBottom: 10,
  },
});

export default Form;
