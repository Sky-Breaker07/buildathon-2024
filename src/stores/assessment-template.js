import { defineStore } from 'pinia';

export const useAssessmentTemplateStore = defineStore('assessmentTemplate', {
  state: () => ({
    templates: [],
    currentTemplate: null,
  }),
  
  getters: {
    getTemplateById: (state) => (id) => {
      return state.templates.find(template => template._id === id);
    },
  },
  
  actions: {
    setTemplates(templates) {
      this.templates = templates;
    },
    
    setCurrentTemplate(template) {
      this.currentTemplate = template;
    },
    
    addTemplate(template) {
      this.templates.push(template);
    },
    
    updateTemplate(updatedTemplate) {
      const index = this.templates.findIndex(t => t._id === updatedTemplate._id);
      if (index !== -1) {
        this.templates[index] = { ...this.templates[index], ...updatedTemplate };
      }
      if (this.currentTemplate && this.currentTemplate._id === updatedTemplate._id) {
        this.currentTemplate = { ...this.currentTemplate, ...updatedTemplate };
      }
    },
    
    removeTemplate(templateId) {
      this.templates = this.templates.filter(t => t._id !== templateId);
      if (this.currentTemplate && this.currentTemplate._id === templateId) {
        this.currentTemplate = null;
      }
    },
    
    clearTemplates() {
      this.templates = [];
      this.currentTemplate = null;
    },
  },
});
