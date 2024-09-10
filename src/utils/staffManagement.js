import apiClient from '../apiConfig';

const registerAdminHCP = async (adminHCPData, token) => {
  return await apiClient.post('/api/v1/staff/register-admin-hcp', adminHCPData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const registerHIM = async (himData, token) => {
  return await apiClient.post('/api/v1/staff/register-him', himData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const registerSuperAdmin = (superAdminData) => {
  return apiClient.post('/api/v1/staff/register-super-admin', superAdminData);
};

const registerHCP = (hcpData) => {
  return apiClient.post('/api/v1/staff/register-hcp', hcpData);
};

const getAllHCPs = () => {
  return apiClient.get('/api/v1/staff/hcp');
};

const getAdminHCPs = () => {
  return apiClient.get('/api/v1/staff/admin-hcp');
};

const getHCPsByProfession = (profession) => {
  return apiClient.get(`/api/v1/staff/hcp/${profession}`);
};

const getAllHIMs = () => {
  return apiClient.get('/api/v1/staff/him');
};

const changeHCPAdminStatus = (staffId, isAdmin) => {
  return apiClient.patch(`/api/v1/staff/hcp/${staffId}/admin-status`, { isAdmin });
};

const removeHCP = (staffId) => {
  return apiClient.delete(`/api/v1/staff/hcp/${staffId}`);
};

const removeHIM = (staffId) => {
  return apiClient.delete(`/api/v1/staff/him/${staffId}`);
};

const getCurrentUser = async () => {
  const response = await apiClient.get('/api/v1/auth/current-user');
  if (response.data.status === "Success" && response.data.data) {
    return response.data.data;
  } else {
    console.error("Unexpected response format:", response.data);
    throw new Error("Failed to get current user");
  }
};

export {
  registerSuperAdmin,
  registerAdminHCP,
  registerHCP,
  registerHIM,
  getAllHCPs,
  getAdminHCPs,
  getHCPsByProfession,
  getAllHIMs,
  changeHCPAdminStatus,
  removeHCP,
  removeHIM,
  getCurrentUser
};


