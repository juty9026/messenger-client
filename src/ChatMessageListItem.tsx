import React from "react";

interface ChatMessageListItemProps {
  text: string;
}
const ChatMessageListItem: React.FC<ChatMessageListItemProps> = ({ text }) => {
  return (
    <li className="ChatMessageListItem">
      <div className="balloon">{text}</div>
    </li>
  );
};

export default ChatMessageListItem;
