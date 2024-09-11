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

const registerHCP = async (hcpData, token) => {
  return await apiClient.post('/api/v1/staff/register-hcp', hcpData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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

const removeHCP = async (staffId, token) => {
  return await apiClient.delete(`/api/v1/staff/hcp/${staffId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const removeAdminHCP = async (staffId, token) => {
  return await apiClient.delete(`/api/v1/staff/admin-hcp/${staffId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const removeHIM = async (staffId, token) => {
  return await apiClient.delete(`/api/v1/staff/him/${staffId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getCurrentUser = async () => {
  const response = await apiClient.get('/api/v1/auth/current-user');
  if (response.data.status === "Success" && response.data.data) {
    // Ensure that the organization information is included
    return {
      ...response.data.data,
      organization: response.data.data.organization || { name: 'Unknown Organization' }
    };
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
  getCurrentUser,
  removeAdminHCP
};


