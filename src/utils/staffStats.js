import apiClient from "../apiConfig";

const getStaffStatistics = async (query) => {
  try {
    const response = await apiClient.get("/api/v1/statistics/staff", {
      query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching staff statistics:", error);
    throw error;
  }
};

export default {
  getStaffStatistics,
};
