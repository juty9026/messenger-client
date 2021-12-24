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

  const owner = useMemo(() => {
    if (userId === undefined || senderProfile?.id === undefined) {
      return "unknown";
    }
    return senderProfile?.id === userId ? "me" : "them";
  }, [userId, senderProfile]);

  const profileImageSrc = useMemo(() => {
    return senderProfile?.avatarSrc;
  }, [senderProfile]);

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
      <div>
        {profileImageSrc && (
          <img
            className="profile-thumb"
            src={`/images/${profileImageSrc}`}
            alt={profileImageSrc}
          />
        )}
        <span className="name">{senderProfile?.name}</span>
        <div className="ballon">{text}</div>
      </div>
    </li>
  );
};

export default ChatMessageListItem;
