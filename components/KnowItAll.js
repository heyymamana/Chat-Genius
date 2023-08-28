import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "KnowItAll",
  avatar:
    "https://blog-assets.freshworks.com/freshdesk/wp-content/uploads/2020/11/17171650/Chatbot-applications.jpg",
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("unset");
  const [isFirst, setFirst] = useState(true);
  const [numQs, setNumQs] = useState(0);

  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=3679d98eb1440dc5b31b6e9a8103437c");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    setMessages([
      {
        _id: 3,
        text: "Waiting for your response⏳",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
      {
        _id: 2,
        text: "I'm here to spark your curiosity with some fascinating facts from history to science 🤖📚- Let's explore!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
      {
        _id: 1,
        text: "Welcome aboard! 👋",
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

  const respondToUser = (userMessages) => {
    console.log("User message text:", userMessages[0].text);

    if (isFirst) {
      if (userMessages[0].text.toLowerCase() == "start") {
        addBotMessage("Ever wondered about the wonders of the world? 🌎🌌");
        addBotMessage("Are you looking for questions that are easy, medium, or hard?");
        setFirst(false);
      } else addBotMessage("Type 'start' and press send button to begin!");
    } else if (isFirst == false && difficulty == "unset") {
      if (userMessages[0].text.toLowerCase() == "easy") {
        setDifficulty("easy");
        addBotMessage("Starting with the easy ones, I like your strategy. Let's build that confidence!");
        addBotMessage("How many questions shall we go for in this round?");
      } else if (userMessages[0].text.toLowerCase() == "medium") {
        setDifficulty("medium");
        addBotMessage("Let's explore the sweet spot of difficulty!🦉");
        addBotMessage("How many questions shall we go for in this round?");
      } else if (userMessages[0].text.toLowerCase() == "hard") {
        setDifficulty("hard");
        addBotMessage("That's some serious determination!🔥🎃");
        addBotMessage("How many questions shall we go for in this round?");
      } else {
        addBotMessage("Ready to explore?🧭");
        addBotMessage("Do you want to start with easy, medium, or hard?");
      }
    } else if (isFirst == false && difficulty != "unset" && numQs == 0) {
      if (
        parseInt(userMessages[0].text) != NaN &&
        parseInt(userMessages[0].text) > 0
      ) {
        setNumQs(parseInt(userMessages[0].text));
        fetchQs(difficulty, parseInt(userMessages[0].text));
        addBotMessage("And so it begins! Here's the opening question for you:");
      } else {
        addBotMessage("To continue, enter a valid number!");
      }
    } else if (index < numQs) {
      if (
        userMessages[0].text.toLowerCase() ==
        questions[index].correct_answer.toLowerCase()
      ) {
        addBotMessage("Correct💯");
        if (index != numQs - 1) {
          addBotMessage(questions[index + 1].question);
          addBotMessage("True or False?");
        } else {
          addBotMessage(`You've got a ${score + 1} out of ${numQs}! this time. There's always room to grow⚔️😊`);
          addBotMessage(`Begin again?👍`);
        }
        setIndex(index + 1);
        setScore(score + 1);
      } else if (
        userMessages[0].text.toLowerCase() ==
        questions[index].incorrect_answers[0].toLowerCase()
      ) {
        addBotMessage("Incorrect❌");
        if (index != numQs - 1) {
          addBotMessage(questions[index + 1].question);
          addBotMessage("True or False?");
        } else {
          addBotMessage(`You scored a ${score} out of ${numQs}!`);
          addBotMessage(`begin again? Say 'start'!`);
        }
        setIndex(index + 1);
      } else {
        addBotMessage("I need either 'true' or 'false' as your input");
      }
    } else {
      if (userMessages[0].text.toLowerCase() == "start") {
        setIndex(0);
        setScore(0);
        setDifficulty("unset");
        setNumQs(0);
        addBotMessage("When you're prepared, simply say 'start' to kick things off🎯");
      } else {
        addBotMessage("Grateful for your participation!😇🎉 If you want to begin again, use the word 'start'.");
      }
    }
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  const fetchQs = (level, num) => {
    fetch(
      `https://opentdb.com/api.php?amount=${num}&difficulty=${level}&type=boolean`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.results);
        addBotMessage(result.results[0].question);
        addBotMessage("True or False?");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "KnowItAll",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
