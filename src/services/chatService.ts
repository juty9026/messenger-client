import chatMessages from "../data/chatMessages";
import ChatMessage from "../types/ChatMessage";

interface FetchChatMessagesProps {
  chatRoomId?: number;
}
const fetchChatMessages = ({
  chatRoomId
}: FetchChatMessagesProps): ChatMessage[] => {
  return chatMessages.filter(
    (chatMessage) => chatMessage.chatRoomId === chatRoomId
  );
};

export default { fetchChatMessages };
