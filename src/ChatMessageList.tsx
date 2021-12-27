import React from "react";
import ChatMessage from "./types/ChatMessage";
import ChatMessageListItem from "./ChatMessageListItem";

interface ChatMessageListProps {
  messages: ChatMessage[];
}
const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  return (
    <ol className="ChatMessageList">
      {messages.map(({ id, text }) => (
        <ChatMessageListItem key={id} text={text} />
      ))}
    </ol>
  );
};

export default ChatMessageList;
