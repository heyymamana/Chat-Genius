import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text, View } from "react-native";
import KnowItAll from "../components/KnowItAll";
import EquaBot from "../components/EquaBot";

export const CHATBOTS = {
 
  "KnowItAll": {
    id: "KnowItAll",
    name: "KnowItAll",
    description:"Empower your mind with the simple interactions(True/False) - your virtual key to a world of facts, figures and fascinating information📡🏷️📘. Expand your knowledge, boost your confidence, and uncover the joy of discovering the information of the world, one chat at a time⏳",
    imageUrl: "https://blog-assets.freshworks.com/freshdesk/wp-content/uploads/2020/11/17171650/Chatbot-applications.jpg",
    developers: [{ name: "@KnowItAll" }],
    component: KnowItAll,
  },
  "EquaBot": {
    id: "EquaBot",
    name: "ChatGenius",
    description:"EquaBot is a user-friendly AI chatbot which helps in your instant arithmetic assistance ➕➖🦾, from addition to substraction this chatbot is your go-to solution for simple calculations. Wheather you're splitting bills, arithmetic tips, or just checking your mental math, this bot is just a message away 📇📚💵💜",
    imageUrl: "https://images.wsj.net/im-716007?width=1280&size=1.33333333",
    developers: [{ name: "@EquaBot" }],
    component: EquaBot,
  }
};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>'{chatbotName}'</Text>;
    }
  };

  return (
  
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingBottom:10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 550,
  },
});
