import apiClient from "../apiConfig";
import { setToken, removeToken } from "./tokenUtils";

export const login = async (staffId, password) => {
  try {
    const response = await apiClient.post("/api/v1/auth/login", {
      staff_id: staffId,
      password: password,
    });
    if (response.data && response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  removeToken();
  // You might want to add any additional cleanup here
};

export const resetPassword = async (
  staffId,
  securityQuestion,
  securityAnswer,
  newPassword
) => {
  try {
    const response = await apiClient.post("/api/v1/auth/reset-password", {
      staffId,
      securityQuestion,
      securityAnswer,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiClient.post("/api/v1/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const response = await apiClient.get("/api/v1/auth/verify-token");
    return response.data;
  } catch (error) {
    console.error("Token verification error:", error);
    throw error;
  }
};
