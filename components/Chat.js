import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { useNavigation } from "@react-navigation/native";

const Developers = ({ developers }) => {
  return (
    <Text style={styles.songArtists} numberOfLines={1}>
      {developers.map(({ name }) => `${name}`).join(", ")}
    </Text>
  );
};

const Chat = ({  imageUrl, developers, description, albumName }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("@ChatGenius", {
          chatbotName: albumName,
        })
      }
    >
      <View style={styles.song}>
     
        <Image
          style={[styles.image, styles.albumCover]}
          source={{ uri: imageUrl }}
        />
        <View style={styles.songArtistContainer}>
          <Developers developers={developers} />  
        </View>
        <View style={styles.description}>
           <Text style ={{color:'grey'}}>{description}</Text>
          </View>   
      </View>     
    </Pressable>
  );
};

const styles = StyleSheet.create({
  song: { 
    width: "100%",
  },
  
  albumCover: {
    resizeMode:"cover",
    width: "100%",
    height: 360,
    justifyContent:"space-between",
    paddingTop:50,
  },
  songArtistContainer: {
    margin: 7,
  
  },
  songTitle: {
    
    fontSize: 40,
  },
  songArtists: {
    color: 'black',
    backgroundColor:'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft:20,
  },

  description:{
    
    fontSize: 20,
    paddingLeft:30,
    paddingBottom:20,
  }
});

export default Chat;
