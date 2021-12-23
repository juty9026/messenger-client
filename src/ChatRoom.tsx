import React, { useEffect, useState } from "react";
import ChatMessageProps from "./types/ChatMessage";
import ChatMessage from "./ChatMessage";
import { chatService } from "./services";

interface ChatRoomProps {
  chatRoomId: number;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);

  const fetchChatMessages = async (chatRoomId: number) => {
    const data = await chatService.fetchChatMessages({ chatRoomId });
    setMessages(data);
  };

  useEffect(() => {
    fetchChatMessages(chatRoomId);
  }, [chatRoomId]);
  return (
    <div className="ChatRoom">
      <div className="container">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
