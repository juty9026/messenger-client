import axios from "../axiosInstance";

interface FetchUserProfileProps {
  userIds?: number | number[];
}
const fetchUserProfile = async ({ userIds }: FetchUserProfileProps) => {
  try {
    const { data } = await axios.get("/userProfiles", {
      params: { id: userIds }
    });
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { fetchUserProfile };
