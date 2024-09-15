import apiClient from "../apiConfig";

const getStatistics = async (query) => {
  try {
    const response = await apiClient.post("/api/v1/statistics/patients", {
      query,
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching patient statistics:", error);
    throw error;
  }
};

const PatientStats = {
  getQueryableFields: async () => {
    try {
      const response = await apiClient.get("/api/v1/statistics/queryable-fields");
      return response.data;
    } catch (error) {
      console.error("Error fetching queryable fields:", error);
      throw error;
    }
  },

  getTotalPatients: () => getStatistics({ type: "totalPatients" }),

  getPatientsByVitalSign: (field, operator, value) =>
    getStatistics({ type: "patientsByVitalSign", field, operator, value }),

  getPatientsByAssessment: (field, operator, value) =>
    getStatistics({ type: "patientsByAssessment", field, operator, value }),

  getPatientsByTreatment: (field, operator, value) =>
    getStatistics({ type: "patientsByTreatment", field, operator, value }),

  getPatientsByDischarge: (field, operator, value) =>
    getStatistics({ type: "patientsByDischarge", field, operator, value }),

  getPatientsByEvaluation: (field, operator, value) =>
    getStatistics({ type: "patientsByEvaluation", field, operator, value }),

  getPatientsByReferral: (field, operator, value) =>
    getStatistics({ type: "patientsByReferral", field, operator, value }),

  getPatientsByBiodata: (field, operator, value) =>
    getStatistics({ type: "patientsByBiodata", field, operator, value }),

  getPatientsByHospitalRecord: (field, operator, value) =>
    getStatistics({ type: "patientsByHospitalRecord", field, operator, value }),
};

export default PatientStats;
