import axios from "../axiosInstance";

interface FetchUserProfileProps {
  userIds?: number | number[];
}
const fetchUserProfile = async ({ userIds }: FetchUserProfileProps) => {
  const isNull = userIds === undefined || userIds === null;
  const isEmpty = Array.isArray(userIds) && userIds.length === 0;
  if (isNull || isEmpty) {
    console.info("no userId(s) provided. return empty array.");
    return [];
  }

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
