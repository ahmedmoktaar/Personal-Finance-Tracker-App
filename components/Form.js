import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUniqueKey } from "../utils/uniqueKey";

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

const Form = ({setIsModalVisible}) => {
  handleCloseModal = () => {
    setIsModalVisible(false);
  }
  return (
    <Formik
      initialValues={{ type: "income", amount: 0, category: "", date: 0, description: "" }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        saveData(values);
        handleCloseModal();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <Picker selectedValue={values.type} onValueChange={handleChange("type")}>
            <Picker.Item label="income" value="income" />
            <Picker.Item label="expense" value="expense" />
          </Picker>
          {errors.type && touched.type ? <Text style={styles.error}>{errors.type}</Text> : null}

          <Input
            onChangeText={handleChange("amount")}
            onBlur={handleBlur("amount")}
            value={values.amount}
            placeholder="Amount"
            maxLength={10}
            keyboardType="decimal-pad"
          />
          {errors.amount && touched.amount ? <Text style={styles.error}>{errors.amount}</Text> : null}

          <Input onChangeText={handleChange("category")} onBlur={handleBlur("category")} value={values.category} placeholder="Category" maxLength={40} />
          {errors.category && touched.category ? <Text style={styles.error}>{errors.category}</Text> : null}

          <Input
            onChangeText={handleChange("date")}
            onBlur={handleBlur("date")}
            value={values.date}
            placeholder="Date"
            maxLength={10}
            keyboardType="decimal-pad"
          />
          {errors.date && touched.date ? <Text style={styles.error}>{errors.date}</Text> : null}

          <Input
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
            placeholder="Description"
            maxLength={200}
            multiline={true}
            numberOfLines={4}
          />
          {errors.description && touched.description ? <Text style={styles.error}>{errors.description}</Text> : null}

          <Button onPress={handleSubmit} title="Submit" />
          <Button onPress={handleCloseModal} title="Cancel" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default Form;
