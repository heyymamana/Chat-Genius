import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();
export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          screenOptions={{ navigationBarColor: 'white' }}
          name="ChatGenius🚀🥶🏁🔥🤖👍"
          component={HomeScreen}
        />
        <Stack.Screen name="@ChatGenius" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
