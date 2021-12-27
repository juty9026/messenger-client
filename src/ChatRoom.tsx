import React, { useEffect, useState } from "react";
import ChatMessage from "./types/ChatMessage";
import ChatMessageList from "./ChatMessageList";
import chatService from "./services/chatService";
import useMessageGroup from "./hooks/useMessgeGroup";

interface ChatRoomProps {
  chatRoomId: number;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ chatRoomId }) => {
  const [rawMessages, setRawMessages] = useState<ChatMessage[]>([]);
  const messageGroups = useMessageGroup(rawMessages);

  const fetchChatMessages = async (chatRoomId: number) => {
    const data = await chatService.fetchChatMessages({ chatRoomId });
    setRawMessages(data);
  };

  useEffect(() => {
    fetchChatMessages(chatRoomId);
  }, [chatRoomId]);

  return (
    <div className="ChatRoom">
      {messageGroups.map((messages) => (
        <ChatMessageList messages={messages} />
      ))}
    </div>
  );
};

export default ChatRoom;
