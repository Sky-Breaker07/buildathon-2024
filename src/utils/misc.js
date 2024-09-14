import apiClient from "../apiConfig";

// warm up the server

export const warmUp = async () => {
    try {
        const response = await apiClient.get("/api/v1/auth/warm-up");
        return response.data;
    } catch (error) {
        console.error("Warm up error:", error);
        throw error;
    }
};