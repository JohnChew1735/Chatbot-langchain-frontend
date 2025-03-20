import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    } else {
      actions.handleUserQuestion(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
