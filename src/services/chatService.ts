import axios from "../axiosInstance";
import ChatMessage from "../types/ChatMessage";

interface FetchChatMessagesProps {
  chatRoomId?: number;
}
const fetchChatMessages = async ({ chatRoomId }: FetchChatMessagesProps) => {
  try {
    const { data } = await axios.get<ChatMessage[]>("/chatMessages", {
      params: { chatRoomId }
    });
    return data;
  } catch (e) {
    return [];
  }
};

export default { fetchChatMessages };
