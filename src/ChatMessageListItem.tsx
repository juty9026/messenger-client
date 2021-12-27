import React, { useMemo } from "react";
import ChatMessageOwner from "./types/ChatMessageOwner";

interface ChatMessageListItemProps {
  owner: ChatMessageOwner;
  text: string;
}
const ChatMessageListItem: React.FC<ChatMessageListItemProps> = ({
  owner,
  text
}) => {
  const itemClass = useMemo(() => {
    switch (owner) {
      case "me":
        return "mine";
      case "them":
        return "theirs";
      default:
        return "unknown";
    }
  }, [owner]);

  return (
    <li className={`ChatMessageListItem ${itemClass}`}>
      <div className="ballon">{text}</div>
    </li>
  );
};

export default ChatMessageListItem;
