import apiClient from '../apiConfig';

const createTreatmentTemplate = (templateData) => {
  return apiClient.post('/api/v1/treatment-template', templateData);
};

const getTreatmentTemplates = () => {
  return apiClient.get('/api/v1/treatment-templates');
};

const getTreatmentTemplateById = (templateId) => {
  return apiClient.get(`/api/v1/treatment-templates/${templateId}`);
};

const getTreatmentTemplatesByProfession = (profession) => {
  return apiClient.get(`/api/v1/treatment-template/profession/${profession}`);
};

const updateTreatmentTemplate = (templateId, updateData) => {
  return apiClient.put(`/api/v1/treatment-templates/${templateId}`, updateData);
};

const deleteTreatmentTemplate = (templateId) => {
  return apiClient.delete(`/api/v1/treatment-templates/${templateId}`);
};

export {
  createTreatmentTemplate,
  getTreatmentTemplates,
  getTreatmentTemplateById,
  getTreatmentTemplatesByProfession,
  updateTreatmentTemplate,
  deleteTreatmentTemplate
};
