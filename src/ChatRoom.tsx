import React, { useEffect, useState } from "react";
import ChatMessageProps from "./types/ChatMessage";
import UserProfile from "./types/UserProfile";
import ChatMessage from "./ChatMessage";
import { chatService, profileService } from "./services";

interface ChatRoomProps {
  chatRoomId: number;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [senderIds, setSenderIds] = useState<number[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  const fetchChatMessages = async (chatRoomId: number) => {
    const data = await chatService.fetchChatMessages({ chatRoomId });
    setMessages(data);
  };

  const fetchUserProfiles = async (userIds: number[]) => {
    const data = await profileService.fetchUserProfile({ userIds });
    setUserProfiles(data);
  };

  const getSenderProfile = (senderId: number) => {
    return userProfiles.find((p) => p.id === senderId)!;
  };

  useEffect(() => {
    fetchChatMessages(chatRoomId);
  }, [chatRoomId]);

  useEffect(() => {
    setSenderIds(Array.from(new Set(messages.map((m) => m.senderId))));
  }, [messages]);

  useEffect(() => {
    fetchUserProfiles(senderIds);
  }, [senderIds]);

  return (
    <div className="ChatRoom">
      <div className="container">
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            message={m}
            senderProfile={getSenderProfile(m.senderId)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
