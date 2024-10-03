import apiClient from '../apiConfig';

const createTemplate = (type, templateData) => {
  return apiClient.post(`/api/v1/${type}-template`, templateData);
};

const getTemplates = (type) => {
  return apiClient.get(`/api/v1/${type}-template`);
};

const getTemplateById = (type, templateId) => {
  return apiClient.get(`/api/v1/${type}-template/${templateId}`);
};

const getTemplatesByProfession = (type, profession) => {
  return apiClient.get(`/api/v1/${type}-template/profession/${profession}`);
};

const updateTemplate = (type, templateId, updateData) => {
  return apiClient.patch(`/api/v1/${type}-template/${templateId}`, updateData);
};

const deleteTemplate = (type, templateId) => {
  return apiClient.delete(`/api/v1/${type}-template/${templateId}`);
};

export {
  createTemplate,
  getTemplates,
  getTemplateById,
  getTemplatesByProfession,
  updateTemplate,
  deleteTemplate
};
