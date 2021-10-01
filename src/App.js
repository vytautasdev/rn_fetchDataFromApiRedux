import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Provider} from "react-redux";
import {Store} from "./redux/store";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: "#0080ff"},
            headerTintColor: "#ffffff",
            headerTitleStyle: {fontSize: 15, fontWeight: "bold"},
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
