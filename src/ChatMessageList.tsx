import React from "react";
import ChatMessage from "./types/ChatMessage";
import ChatMessageListItem from "./ChatMessageListItem";
import ChatMessageOwner from "./types/ChatMessageOwner";
import UserProfile from "./types/UserProfile";

interface ChatMessageListProps {
  userProfile: UserProfile;
  messages: ChatMessage[];
  owner: ChatMessageOwner;
}
const ChatMessageList: React.FC<ChatMessageListProps> = ({
  userProfile,
  messages,
  owner
}) => {
  return (
    <ol className="ChatMessageList">
      {messages.map(({ id, senderId, text }) => (
        <ChatMessageListItem key={id} owner={owner} text={text} />
      ))}
    </ol>
  );
};

export default ChatMessageList;
