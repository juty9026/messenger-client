import React from "react";

interface ChatMessageListItemProps {
  text: string;
}
const ChatMessageListItem: React.FC<ChatMessageListItemProps> = ({ text }) => {
  return (
    <li className="ChatMessageListItem">
      <div className="ballon">{text}</div>
    </li>
  );
};

export default ChatMessageListItem;
