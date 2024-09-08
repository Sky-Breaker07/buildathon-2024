import apiClient from '../apiConfig';

const sendMessage = (messageData) => {
  return apiClient.post('/api/v1/communication/messages', messageData);
};

const getMessages = (patientId) => {
  return apiClient.get(`/api/v1/communication/messages/${patientId}`);
};

const createServiceRequest = (requestData) => {
  return apiClient.post('/api/v1/communication/service-requests', requestData);
};

const getServiceRequests = (status) => {
  return apiClient.get('/api/v1/communication/service-requests', { params: { status } });
};

const updateServiceRequest = (requestId, updateData) => {
  return apiClient.patch(`/api/v1/communication/service-requests/${requestId}`, updateData);
};

export {
  sendMessage,
  getMessages,
  createServiceRequest,
  getServiceRequests,
  updateServiceRequest
};
