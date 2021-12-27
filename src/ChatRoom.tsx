import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./types/ChatMessage";
import ChatMessageGroup from "./ChatMessageGroup";
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
        // delayApi.reset();
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [delayState.finish, delayApi]);

  const getSenderProfile = (senderId: number): UserProfile => {
    return userProfiles.find((p) => p.id === senderId)!;
  };

  return (
    <div className="ChatRoom" ref={chatRoomRef}>
      {messageGroups.map((group, i) => (
        <ChatMessageGroup
          key={i}
          group={group}
          userProfile={getSenderProfile(group[0].senderId)}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatRoom;
