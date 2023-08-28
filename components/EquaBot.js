import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2, 
  name: "EquaBot",
  avatar:
    "https://images.wsj.net/im-716007?width=1280&size=1.33333333",
}; 

export default function App() {
  var [index, setindex] = useState(0);
  var [count, setcount] = useState(0);
  var [x, setx] = useState(Math.floor(Math.random() * 50));
  var [y, sety] = useState(Math.floor(Math.random() * 50));
  var [z, setz] = useState(x + y);
  const [messages, setMessages] = useState([]); 
  const level1 = [
    {
      question1:
        "Hello!",
      correct: "Yes",
      fail: "Please try again",
    },
    {
      addition: "add",
      equation: x + "+" + y,
      correct: z,
      fail: "Please try again",
    }, //0
    {
      subtraction: "subtract",
      equation: x + "-" + y,
      correct: "z",
      fail: "Please try again",
    }, //1
  ];

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "To start, simply enter 'add' for addition or 'subtract' for subtraction.",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
      {
        _id: 2,
        text: "Get ready to dive into the realm of calculations🔢. I'm your trusty arithmetic chatbot, here to make math a breeze!",    
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
      {
        _id: 3,
        text: "Hello and Welcome!👋",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },



    ]);
  }, []); 

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, newMessages); 
    });
  }; 

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }; 

  const respondToUser = (userMessages, level1) => {
    console.log("User message text:", userMessages[0].text);
    console.log("index:", index);
    console.log("count before if statement: ", count);

    if (count <= 4) {

      if (userMessages[0].text.toLowerCase() == level1[1].addition) {
        setindex(1);
        setx(Math.floor(Math.random() * 50)); 
        sety(Math.floor(Math.random() * 50)); 
        setz(x + y); 
        addBotMessage(level1[1].equation);
        console.log("index:", index);
        console.log(level1[index].equation);
      }
      if (userMessages[0].text.toLowerCase() == level1[2].subtraction) {
        setindex(2);
        setx(Math.floor(Math.random() * 50)); 
        sety(Math.floor(Math.random() * 50)); 
        setz(x - y); 
        addBotMessage(level1[2].equation);
        console.log("index:", index);
      }
      if (
        userMessages[0].text == level1[1].correct ||
        userMessages[0].text == level1[2].correct
      ) {
        addBotMessage("Correct✔️");
        if (count == 4) {
          addBotMessage("end of game");
        } else {
          addBotMessage("To start again, choose between 'Add' or 'Subtract'");
          setindex(0);
          setcount(count + 1);
        }
      } else if (index != 0) {
        addBotMessage("Wrong❌Please Try Again❗");
      }
    }
  }; 

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages, level1), 1000);
      }}
      user={{
        _id: 1,
        name: "@EquaBot",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
