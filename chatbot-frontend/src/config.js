import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hello, my name is Jarvis. How can I be of assistance today?`
    ),
  ],
  botName: "AI bot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
      fontSize: "18px",
      padding: "20px",
    },
    chatButton: { backgroundColor: "#5ccc9d" },
  },
};

export default config;
