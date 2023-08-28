import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import ChatList from "../components/ChatList";
import { CHATBOTS } from "./ChatScreen";

export default function HomeScreen() {

  return (
    <> 
      <View style={styles.container}>  
      <ChatList chats={Object.values(CHATBOTS)} /> 
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
  backgroundColor: "#ffffff",
  alignItems:"center",
  },
});
