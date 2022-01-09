import userProfiles from "../data/userProfiles";
import UserProfile from "../types/UserProfile";

interface FetchUserProfileProps {
  userIds?: number | number[];
}
const fetchUserProfiles = ({
  userIds
}: FetchUserProfileProps): UserProfile[] => {
  const findIds = typeof userIds === "number" ? [userIds] : userIds;
  return userProfiles.filter((userProfile) => findIds.includes(userProfile.id));
};

export default { fetchUserProfiles };
