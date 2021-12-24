import axios from "../axiosInstance";
import UserProfile from "../types/UserProfile";

interface FetchUserProfileProps {
  userIds?: number | number[];
}
const fetchUserProfile = async ({ userIds }: FetchUserProfileProps) => {
  try {
    const { data } = await axios.get<UserProfile[]>("/userProfiles", {
      params: { id: userIds }
    });
    return data;
  } catch (e) {
    return [];
  }
};

export { fetchUserProfile };
