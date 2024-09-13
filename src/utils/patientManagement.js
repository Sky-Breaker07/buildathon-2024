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

const assignPatientToHCP = (hospitalId, staffId, token) => {
  return apiClient.post("/api/v1/patients/assign-patient", 
    {
      hospital_id: hospitalId,
      staffId: staffId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

const transferPatient = (hospitalId, receiverStaffId, token) => {
  return apiClient.post(
    "/api/v1/patients/transfer-patient",
    {
      hospital_id: hospitalId,
      receiverStaffId: receiverStaffId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const acceptPatient = (hospitalId, token) => {
  return apiClient.post(
    "/api/v1/patients/accept-patient",
    {
      hospital_id: hospitalId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const rejectPatient = (hospitalId, token) => {
  return apiClient.post(
    "/api/v1/patients/reject-patient",
    {
      hospital_id: hospitalId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getAdminJurisdictionPatients = (token) => {
  return apiClient.get("/api/v1/patients/admin-jurisdiction", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAssignedPatients = (token) => {
  return apiClient.get(`/api/v1/patients/assigned-patients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  transferPatient,
  acceptPatient,
  rejectPatient,
  getAdminJurisdictionPatients,
  getAssignedPatients
};
