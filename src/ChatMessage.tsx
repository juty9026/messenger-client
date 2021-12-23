import React from "react";
import ChatMessageType from "./types/ChatMessage";

interface ChatMessageProps {
  message: ChatMessageType;
}
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return <p className="ChatMessage">{message.text}</p>;
};

export default ChatMessage;
