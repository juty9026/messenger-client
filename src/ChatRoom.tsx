import React from "react";
import ChatMessage from "./ChatMessage";

const ChatRoom: React.FC = () => {
  return (
    <div className="ChatRoom">
      <div className="container">
        <ChatMessage>message1</ChatMessage>
        <ChatMessage>message2</ChatMessage>
        <ChatMessage>message3</ChatMessage>
        <ChatMessage>message4</ChatMessage>
      </div>
    </div>
  );
};

export default ChatRoom;
