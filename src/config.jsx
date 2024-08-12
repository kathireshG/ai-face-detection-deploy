import { createChatBotMessage } from "react-chatbot-kit";
const isUserLoggedIn = () => {
  return !!window.localStorage.getItem("username");
};

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi ${
        isUserLoggedIn()
          ? window.localStorage.getItem("username").toUpperCase()
          : ""
      }, How can I assist You?`
    ),
  ],
};

export default config;
