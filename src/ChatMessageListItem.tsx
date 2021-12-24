import React, { useContext, useMemo } from "react";
import AppContext from "./context/AppContext";
import UserProfile from "./types/UserProfile";

interface ChatMessageListItemProps {
  senderProfile: UserProfile;
  text: string;
}
const ChatMessageListItem: React.FC<ChatMessageListItemProps> = ({
  senderProfile,
  text
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

  return <p className={`ChatMessage ${alignClass}`}>{text}</p>;
};

export default ChatMessageListItem;
