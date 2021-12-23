import axios from "../axiosInstance";

interface FetchChatMessagesProps {
  chatRoomId?: number;
}
const fetchChatMessages = async ({ chatRoomId }: FetchChatMessagesProps) => {
  try {
    const { data } = await axios.get("/chatMessages", {
      params: { chatRoomId }
    });
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { fetchChatMessages };
