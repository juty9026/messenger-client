import React, { useContext, useMemo } from "react";
import AppContext from "./context/AppContext";
import UserProfile from "./types/UserProfile";

interface ChatMessageProps {
  senderProfile: UserProfile;
  text: string;
}
const ChatMessage: React.FC<ChatMessageProps> = ({ senderProfile, text }) => {
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

  return <p className={`ChatMessage ${alignClass}`}>{text}</p>;
};

export default ChatMessage;
