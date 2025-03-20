import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config.js";
import MessageParser from "./MessageParser.js";
import ActionProvider from "./ActionProvider.js";
import "./config.css";
import { useEffect, useState } from "react";

export default function App() {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  //get chat history
  useEffect(() => {
    async function getChatHistory() {
      try {
        const response = await fetch("http://127.0.0.1:8000/get_chat_history");
        if (response.ok) {
          const data = await response.json();
          console.log(data.chatHistory);
          setChatHistory(data.chatHistory);
        } else {
          console.log("No chat history");
        }
      } catch (error) {
        console.error("Error getting chat history", error);
      }
    }
    getChatHistory();
  }, []);

  useEffect(() => {
    for (let chat of chatHistory) {
      console.log(chat.user_query);
    }
  }, [chatHistory]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          fontSize: "15px",
          cursor: "pointer",
          padding: "10px",
          color: "green",
        }}
        onClick={() => {
          setHistoryOpen(!historyOpen);
        }}
      >
        ☰ Chat history
      </div>
      {historyOpen && (
        <div
          style={{
            width: "300px",
            height: "200px",
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "10px",
            overflowY: "auto",
            backgroundColor: "white",
            position: "absolute",
            top: "40px",
            marginBottom: "10px",
            zIndex: 1000,
            resize: "both",
          }}
        >
          <h2 style={{ color: "green" }}>Chat History</h2>
          {(() => {
            let lastChat = [];
            for (let index = 0; index < chatHistory.length; index++) {
              lastChat.push(
                <div key={index}>
                  <div
                    style={{
                      color: "blue",
                      textAlign: "right",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid black",
                        padding: "10px",
                        color: "white",
                        backgroundColor: "blue",
                        borderRadius: "10px",
                        whiteSpace: "pre-line",
                        display: "inline-block",
                      }}
                    >
                      {chatHistory[index].user_query}
                    </div>
                    &nbsp;
                    <strong>U</strong>
                  </div>
                  <p></p>
                  <div
                    style={{
                      color: "purple",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    <strong>B</strong>&nbsp;
                    <div
                      style={{
                        border: "1px solid black",
                        padding: "10px",
                        color: "white",
                        backgroundColor: "purple",
                        borderRadius: "10px",
                        whiteSpace: "pre-line",
                        display: "inline-block",
                      }}
                    >
                      {chatHistory[index].bot_response ===
                      "Agent stopped due to iteration limit or time limit."
                        ? "Bot was unable too dumb to answer."
                        : chatHistory[index].bot_response}
                    </div>
                  </div>
                  <p></p>
                </div>
              );
            }
            return lastChat;
          })()}
        </div>
      )}
      <center>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </center>
    </div>
  );
}
