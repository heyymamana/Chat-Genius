import { FlatList, View, StyleSheet } from "react-native";
import { Themes } from "../assets/Themes";
import Chat from "./Chat";

const renderChat = ({ item, index }) => (
  <Chat
    index={index}
    imageUrl={item.imageUrl}
    songTitle={item.name}
    developers={item.developers}
    description={item.description}
    albumName={item.id}
    duration={1000}
  />
);

export default function ChatList({ chats }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={(item, index) => renderChat(item, index)}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent:"center"
  },
  
});
