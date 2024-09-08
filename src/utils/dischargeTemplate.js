import apiClient from '../apiConfig';

const createDischargeTemplate = (templateData) => {
  return apiClient.post('/api/v1/discharge-templates', templateData);
};

const getDischargeTemplates = () => {
  return apiClient.get('/api/v1/discharge-templates');
};

const getDischargeTemplateById = (templateId) => {
  return apiClient.get(`/api/v1/discharge-templates/${templateId}`);
};

const updateDischargeTemplate = (templateId, updateData) => {
  return apiClient.put(`/api/v1/discharge-templates/${templateId}`, updateData);
};

const deleteDischargeTemplate = (templateId) => {
  return apiClient.delete(`/api/v1/discharge-templates/${templateId}`);
};

export {
  createDischargeTemplate,
  getDischargeTemplates,
  getDischargeTemplateById,
  updateDischargeTemplate,
  deleteDischargeTemplate
};
