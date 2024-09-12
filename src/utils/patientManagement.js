import apiClient from "../apiConfig";

const registerPatient = (patientData) => {
  return apiClient.post("/api/v1/patients/register", patientData);
};

const getHospitalRecord = (hospitalId) => {
  return apiClient.post("/api/v1/patients/hospital-records", {
    hospital_id: hospitalId,
  });
};

const getPatient = (hospitalId) => {
  return apiClient.post("/api/v1/patients", { hospital_id: hospitalId });
};

const getAllPatients = (page = 1, limit = 100) => {
  return apiClient.get(`/api/v1/patients?page=${page}&limit=${limit}`);
};

const createAssessment = (assessmentData) => {
  return apiClient.post("/api/v1/patients/assessment", assessmentData);
};

const createTreatment = (treatmentData) => {
  return apiClient.post("/api/v1/patients/treatment", treatmentData);
};

const assignPatientToHCP = (hospitalId, staffId) => {
  return apiClient.post("/api/v1/patients/assign-patient", {
    hospital_id: hospitalId,
    staff_id: staffId,
  });
};

const createDischarge = (dischargeData) => {
  return apiClient.post("/api/v1/patients/discharge", dischargeData);
};

const createEvaluation = (evaluationData) => {
  return apiClient.post("/api/v1/patients/evaluation", evaluationData);
};

const updatePatientInfo = (updateData) => {
  return apiClient.patch("/api/v1/patients/update-patient-info", updateData);
};

export {
  registerPatient,
  getHospitalRecord,
  getPatient,
  createAssessment,
  createTreatment,
  assignPatientToHCP,
  createDischarge,
  createEvaluation,
  updatePatientInfo,
  getAllPatients,
};
