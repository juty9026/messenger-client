import React from "react";
import ChatMessage from "./types/ChatMessage";
import ChatMessageListItem from "./ChatMessageListItem";
import UserProfile from "./types/UserProfile";

interface ChatMessageListProps {
  userProfile: UserProfile;
  messages: ChatMessage[];
}
const ChatMessageList: React.FC<ChatMessageListProps> = ({
  userProfile,
  messages
}) => {
  return (
    <ol className="ChatMessageList">
      {messages.map(({ id, senderId, text }) => (
        <ChatMessageListItem key={id} text={text} senderProfile={userProfile} />
      ))}
    </ol>
  );
};

export default ChatMessageList;
