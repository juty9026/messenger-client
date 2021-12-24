import React, { useEffect, useMemo, useState } from "react";
import ChatMessage from "./types/ChatMessage";
import ChatMessageList from "./ChatMessageList";
import { chatService } from "./services";

interface ChatRoomProps {
  chatRoomId: number;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const hasMessage = useMemo(() => {
    return messages.length > 0;
  }, [messages]);

  const fetchChatMessages = async (chatRoomId: number) => {
    const data = await chatService.fetchChatMessages({ chatRoomId });
    setMessages(data);
  };

  useEffect(() => {
    fetchChatMessages(chatRoomId);
  }, [chatRoomId]);

  return (
    <div className="ChatRoom">
      {hasMessage && <ChatMessageList messages={messages} />}
    </div>
  );
};

export default ChatRoom;
