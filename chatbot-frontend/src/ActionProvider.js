import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  // Handle user questions
  const handleUserQuestion = async (message) => {
    try {
      // Show "Bot is thinking..."
      const thinkingMessage = createChatBotMessage("Bot is thinking...");
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, thinkingMessage],
      }));

      // Send request to backend
      const botResponse = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message }),
      });

      if (botResponse.ok) {
        const data = await botResponse.json();

        // Replace "Bot is thinking..." with actual response
        setState((prev) => ({
          ...prev,
          messages: [
            ...prev.messages.slice(0, -1), // Remove last message (thinking)
            createChatBotMessage(data.response), // Show bot response
          ],
        }));
      } else {
        console.log("Failed in getting bot response");
      }
    } catch (error) {
      console.error("Error handling user question", error);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { handleUserQuestion },
        });
      })}
    </div>
  );
};

export default ActionProvider;
