import apiClient from '../apiConfig';

const registerSuperAdmin = (superAdminData) => {
  return apiClient.post('/api/v1/staff/register-super-admin', superAdminData);
};

const registerAdminHCP = (adminHCPData) => {
  return apiClient.post('/api/v1/staff/register-admin-hcp', adminHCPData);
};

const registerHCP = (hcpData) => {
  return apiClient.post('/api/v1/staff/register-hcp', hcpData);
};

const registerHIM = (himData) => {
  return apiClient.post('/api/v1/staff/register-him', himData);
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
  removeHIM
};
