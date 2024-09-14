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

const getAllPatients = (page = 1, limit = 200) => {
  return apiClient.get(`/api/v1/patients?page=${page}&limit=${limit}`);
};

const createAssessment = (template_id, assessment_data, hospital_id) => {
  return apiClient.post("/api/v1/patients/assessment", {
    template_id: template_id,
    assessment_data: assessment_data,
    hospital_id: hospital_id,
  });
};

const createTreatment = (temlate_id, treatment_data, hospital_id) => {
  return apiClient.post("/api/v1/patients/treatment", {
    template_id: temlate_id,
    treatment_data: treatment_data,
    hospital_id: hospital_id,
  });
};

const createReferral = (template_id, referral_data, hospital_id) => {
  return apiClient.post("/api/v1/patients/referral", {
    template_id: template_id,
    referral_data: referral_data,
    hospital_id: hospital_id,
  });
};

const assignPatientToHCP = (hospitalId, staffId, token) => {
  return apiClient.post(
    "/api/v1/patients/assign-patient",
    {
      hospital_id: hospitalId,
      staffId: staffId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const createDischarge = (template_id, discharge_data, hospital_id) => {
  return apiClient.post("/api/v1/patients/discharge", {
    template_id: template_id,
    discharge_data: discharge_data,
    hospital_id: hospital_id,
  });
};

const createEvaluation = (template_id, evaluation_data, hospital_id) => {
  return apiClient.post("/api/v1/patients/evaluation", {
    template_id: template_id,
    evaluation_data: evaluation_data,
    hospital_id: hospital_id,
  });
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

const updateNightCount = (hospitalId, nightCount) => {
  return apiClient.patch("/api/v1/patients/night-count", {
    hospital_id: hospitalId,
    nightCount: nightCount,
  });
};

const updateSessionCount = (hospitalId, sessionCount) => {
  return apiClient.patch("/api/v1/patients/session-count", {
    hospital_id: hospitalId,
    sessionCount: sessionCount,
  });
};

const createVitals = (hospitalId, vitalsData) => {
  return apiClient.post("/api/v1/patients/vital-sign", {
    hospital_id: hospitalId,
    vital_sign_data: vitalsData,
  });
};

const getPatientFullDetails = (hospitalId) => {
  console.log(hospitalId);
  return apiClient.post("/api/v1/patients/full-details", {
    hospital_id: hospitalId,
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
  createReferral,
  updatePatientInfo,
  getAllPatients,
  transferPatient,
  acceptPatient,
  rejectPatient,
  getAdminJurisdictionPatients,
  getAssignedPatients,
  updateNightCount,
  updateSessionCount,
  createVitals,
  getPatientFullDetails,
};
