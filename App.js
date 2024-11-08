import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/HomePage";
import colors from "./constants/colors";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: "white" }}>
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{
                title: "Finance Tracker App",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
