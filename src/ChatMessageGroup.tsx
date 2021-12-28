import { useContext, useMemo } from "react";
import AppContext from "./context/AppContext";
import ChatMessageList from "./ChatMessageList";
import ChatMessage from "./types/ChatMessage";
import ChatMessageOwner from "./types/ChatMessageOwner";
import UserProfile from "./types/UserProfile";

interface ChatMessageGroupProps {
  group: ChatMessage[];
  userProfile: UserProfile;
}
const ChatMessageGroup: React.FC<ChatMessageGroupProps> = ({
  group,
  userProfile
}) => {
  const { userId } = useContext(AppContext);

  const timeDisplayText = useMemo(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }, []);

  const owner: ChatMessageOwner = useMemo(() => {
    if (userId === undefined || userProfile?.id === undefined) {
      return "unknown";
    }
    return userProfile?.id === userId ? "me" : "them";
  }, [userId, userProfile]);

  const ownerClass = useMemo(() => {
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
    <div className={`ChatMessageGroup ${ownerClass}`}>
      {owner === "them" && (
        <div className="avatar">
          {userProfile?.avatarSrc && (
            <img
              className="avatar-thumb"
              src={`/images/${userProfile.avatarSrc}`}
              alt={userProfile.avatarSrc}
            />
          )}
        </div>
      )}
      <div className="main">
        {owner === "them" && <span className="name">{userProfile?.name}</span>}
        <ChatMessageList messages={group} />
      </div>
      <div className="time">
        <span>{timeDisplayText}</span>
      </div>
    </div>
  );
};

export default ChatMessageGroup;
