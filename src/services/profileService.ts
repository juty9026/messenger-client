import axios from "../axiosInstance";

interface FetchUserProfileProps {
  userId?: number;
}
const fetchUserProfile = async ({ userId }: FetchUserProfileProps) => {
  try {
    const { data } = await axios.get("/userProfiles", {
      params: { userId }
    });
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { fetchUserProfile };
