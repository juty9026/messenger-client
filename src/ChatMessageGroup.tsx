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

  const owner: ChatMessageOwner = useMemo(() => {
    if (userId === undefined || userProfile?.id === undefined) {
      return "unknown";
    }
    return userProfile?.id === userId ? "me" : "them";
  }, [userId, userProfile]);

  return (
    <div className="ChatMessageGroup">
      <div className="avatar">
        {userProfile?.avatarSrc && (
          <img
            className="avatar-thumb"
            src={`/images/${userProfile.avatarSrc}`}
            alt={userProfile.avatarSrc}
          />
        )}
      </div>
      <div className="main">
        {owner === "them" && <span className="name">{userProfile?.name}</span>}
        <ChatMessageList
          userProfile={userProfile}
          messages={group}
          owner={owner}
        />
      </div>
      <div className="time" />
    </div>
  );
};

export default ChatMessageGroup;
