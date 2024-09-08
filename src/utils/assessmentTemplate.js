import apiClient from '../apiConfig';

const createAssessmentTemplate = (templateData) => {
  return apiClient.post('/api/v1/assessment-templates', templateData);
};

const getAssessmentTemplates = () => {
  return apiClient.get('/api/v1/assessment-templates');
};

const getAssessmentTemplateById = (templateId) => {
  return apiClient.get(`/api/v1/assessment-templates/${templateId}`);
};

const updateAssessmentTemplate = (templateId, updateData) => {
  return apiClient.put(`/api/v1/assessment-templates/${templateId}`, updateData);
};

const deleteAssessmentTemplate = (templateId) => {
  return apiClient.delete(`/api/v1/assessment-templates/${templateId}`);
};

export {
  createAssessmentTemplate,
  getAssessmentTemplates,
  getAssessmentTemplateById,
  updateAssessmentTemplate,
  deleteAssessmentTemplate
};
