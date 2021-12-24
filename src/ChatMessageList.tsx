import React, { useEffect, useState } from "react";
import ChatMessage from "./types/ChatMessage";
import ChatMessageListItem from "./ChatMessageListItem";
import profileService from "./services/profileService";
import UserProfile from "./types/UserProfile";

interface ChatMessageListProps {
  messages: ChatMessage[];
}
const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  const fetchUserProfiles = async (userIds: number[]) => {
    const data = await profileService.fetchUserProfiles({ userIds });
    setUserProfiles(data);
  };

  useEffect(() => {
    const senderIds = messages.map(({ senderId }) => senderId);
    const uniqueSenderIds = Array.from(new Set(senderIds));
    if (uniqueSenderIds.length > 0) {
      fetchUserProfiles(uniqueSenderIds);
    }
  }, [messages]);

  const getSenderProfile = (senderId: number) => {
    return userProfiles.find((p) => p.id === senderId)!;
  };

  return (
    <ol className="ChatMessageList">
      {messages.map(({ id, senderId, text }) => (
        <ChatMessageListItem
          key={id}
          text={text}
          senderProfile={getSenderProfile(senderId)}
        />
      ))}
    </ol>
  );
};

export default ChatMessageList;
