import { defineStore } from 'pinia';

export const useCommunicationStore = defineStore('communication', {
  state: () => ({
    messages: {},
    serviceRequests: [],
  }),
  
  getters: {
    getMessagesByPatientId: (state) => (patientId) => {
      return state.messages[patientId] || [];
    },
    getServiceRequestById: (state) => (requestId) => {
      return state.serviceRequests.find(request => request._id === requestId);
    },
  },
  
  actions: {
    setMessages(patientId, messages) {
      this.messages = { ...this.messages, [patientId]: messages };
    },
    
    addMessage(patientId, message) {
      if (!this.messages[patientId]) {
        this.messages[patientId] = [];
      }
      this.messages[patientId].push(message);
    },
    
    setServiceRequests(requests) {
      this.serviceRequests = requests;
    },
    
    addServiceRequest(request) {
      this.serviceRequests.push(request);
    },
    
    updateServiceRequest(updatedRequest) {
      const index = this.serviceRequests.findIndex(r => r._id === updatedRequest._id);
      if (index !== -1) {
        this.serviceRequests[index] = { ...this.serviceRequests[index], ...updatedRequest };
      }
    },
    
    removeServiceRequest(requestId) {
      this.serviceRequests = this.serviceRequests.filter(r => r._id !== requestId);
    },
    
    clearCommunicationData() {
      this.messages = {};
      this.serviceRequests = [];
    },
  },
});
