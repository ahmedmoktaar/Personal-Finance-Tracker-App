import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/HomePage";
import colors from "./constants/colors";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator  initialRouteName="Home"  screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: "white"}}>
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{
                title: "Personal Finance Tracker App",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
