import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./types/ChatMessage";
import ChatMessageList from "./ChatMessageList";
import chatService from "./services/chatService";
import useDelay from "./hooks/useDelay";
import useMessageGroup from "./hooks/useMessgeGroup";
import UserProfile from "./types/UserProfile";
import profileService from "./services/profileService";

interface ChatRoomProps {
  chatRoomId: number;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ chatRoomId }) => {
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [rawMessages, setRawMessages] = useState<ChatMessage[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [delayState, delayApi] = useDelay<ChatMessage>(rawMessages);
  const messageGroups = useMessageGroup(delayState.data);

  const fetchChatMessages = async (chatRoomId: number) => {
    const data = await chatService.fetchChatMessages({ chatRoomId });
    setRawMessages(data);
  };

  const fetchUserProfiles = async (userIds: number[]) => {
    const data = await profileService.fetchUserProfiles({ userIds });
    setUserProfiles(data);
  };

  useEffect(() => {
    fetchChatMessages(chatRoomId);
  }, [chatRoomId]);

  useEffect(() => {
    const senderIds = rawMessages.map(({ senderId }) => senderId);
    const uniqueSenderIds = Array.from(new Set(senderIds));
    if (uniqueSenderIds.length > 0) {
      fetchUserProfiles(uniqueSenderIds);
    }
  }, [rawMessages]);

  useEffect(() => {
    chatRoomRef.current!.scrollTo({
      top: bottomRef.current!.offsetTop,
      behavior: "smooth"
    });
  }, [messageGroups]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (delayState.finish) {
      timeout = setTimeout(() => {
        delayApi.reset();
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [delayState.finish, delayApi]);

  const getSenderProfile = (senderId: number) => {
    return userProfiles.find((p) => p.id === senderId)!;
  };

  return (
    <div className="ChatRoom" ref={chatRoomRef}>
      {messageGroups.map((messages, i) => {
        if (messages.length === 0) {
          return null;
        }
        const userProfile: UserProfile = getSenderProfile(messages[0].senderId);
        return (
          <ChatMessageList
            key={`${i}_${userProfile.name}`}
            userProfile={userProfile}
            messages={messages}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatRoom;
