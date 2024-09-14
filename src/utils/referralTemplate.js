import apiClient from '../apiConfig';

const createReferralTemplate = (templateData) => {
  return apiClient.post('/api/v1/referral-template', templateData);
};

const getReferralTemplates = () => {
  return apiClient.get('/api/v1/referral-templates');
};

const getReferralTemplateById = (templateId) => {
  return apiClient.get(`/api/v1/referral-templates/${templateId}`);
};

const getReferralTemplatesByProfession = (profession) => {
  return apiClient.get(`/api/v1/referral-template/profession/${profession}`);
};

const updateReferralTemplate = (templateId, updateData) => {
  return apiClient.put(`/api/v1/referral-templates/${templateId}`, updateData);
};

const deleteReferralTemplate = (templateId) => {
  return apiClient.delete(`/api/v1/referral-templates/${templateId}`);
};

export {
  createReferralTemplate,
  getReferralTemplates,
  getReferralTemplateById,
  getReferralTemplatesByProfession,
  updateReferralTemplate,
  deleteReferralTemplate
};
