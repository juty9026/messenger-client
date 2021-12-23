import React, { useContext, useMemo } from "react";
import AppContext from "./context/AppContext";
import ChatMessageType from "./types/ChatMessage";
import UserProfile from "./types/UserProfile";

interface ChatMessageProps {
  senderProfile: UserProfile;
  message: ChatMessageType;
}
const ChatMessage: React.FC<ChatMessageProps> = ({
  senderProfile,
  message
}) => {
  const { userId } = useContext(AppContext);

  const mine = useMemo(() => {
    if (!senderProfile || !userId) {
      return;
    }

    return senderProfile.id === userId;
  }, [senderProfile, userId]);

  const alignClass = useMemo(() => {
    return mine ? "right" : "left";
  }, [mine]);

  return <p className={`ChatMessage ${alignClass}`}>{message.text}</p>;
};

export default ChatMessage;
