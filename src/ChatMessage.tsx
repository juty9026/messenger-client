import React, { useMemo } from "react";
import ChatMessageType from "./types/ChatMessage";

interface ChatMessageProps {
  message: ChatMessageType;
}
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const mine = useMemo(() => {
    return message.senderId === 1;
  }, [message]);

  const alignClass = useMemo(() => {
    console.log(mine);
    return mine ? "right" : "left";
  }, [mine]);

  return <p className={`ChatMessage ${alignClass}`}>{message.text}</p>;
};

export default ChatMessage;
