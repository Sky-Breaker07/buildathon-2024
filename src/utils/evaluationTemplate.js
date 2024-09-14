import apiClient from '../apiConfig';

const createEvaluationTemplate = (templateData) => {
  return apiClient.post('/api/v1/evaluation-template', templateData);
};

const getEvaluationTemplates = () => {
  return apiClient.get('/api/v1/evaluation-templates');
};

const getEvaluationTemplateById = (templateId) => {
  return apiClient.get(`/api/v1/evaluation-templates/${templateId}`);
};

const getEvaluationTemplatesByProfession = (profession) => {
  return apiClient.get(`/api/v1/evaluation-template/profession/${profession}`);
};

const updateEvaluationTemplate = (templateId, updateData) => {
  return apiClient.put(`/api/v1/evaluation-templates/${templateId}`, updateData);
};

const deleteEvaluationTemplate = (templateId) => {
  return apiClient.delete(`/api/v1/evaluation-templates/${templateId}`);
};

export {
  createEvaluationTemplate,
  getEvaluationTemplates,
  getEvaluationTemplateById,
  getEvaluationTemplatesByProfession,
  updateEvaluationTemplate,
  deleteEvaluationTemplate
};
