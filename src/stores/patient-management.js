import { defineStore } from 'pinia';

export const usePatientStore = defineStore('patient', {
  state: () => ({
    currentPatient: null,
    hospitalRecord: null,
    assessments: [],
    treatments: [],
    discharges: [],
    evaluations: [],
    allPatients: {
      assignedToAdmin: [],
      assignedToOtherHCPs: [],
      receivedPatients: [],
    },
    assignedPatients: [], // New state for assigned patients
  }),
  
  actions: {
    setCurrentPatient(patient) {
      this.currentPatient = patient;
    },
    
    setHospitalRecord(record) {
      this.hospitalRecord = record;
    },
    
    addAssessment(assessment) {
      this.assessments.push(assessment);
    },
    
    addTreatment(treatment) {
      this.treatments.push(treatment);
    },
    
    addDischarge(discharge) {
      this.discharges.push(discharge);
    },
    
    addEvaluation(evaluation) {
      this.evaluations.push(evaluation);
    },
    
    updateAssessment(assessmentId, updatedAssessment) {
      const index = this.assessments.findIndex(a => a._id === assessmentId);
      if (index !== -1) {
        this.assessments[index] = { ...this.assessments[index], ...updatedAssessment };
      }
    },
    
    updateTreatment(treatmentId, updatedTreatment) {
      const index = this.treatments.findIndex(t => t._id === treatmentId);
      if (index !== -1) {
        this.treatments[index] = { ...this.treatments[index], ...updatedTreatment };
      }
    },
    
    updateDischarge(dischargeId, updatedDischarge) {
      const index = this.discharges.findIndex(d => d._id === dischargeId);
      if (index !== -1) {
        this.discharges[index] = { ...this.discharges[index], ...updatedDischarge };
      }
    },
    
    updateEvaluation(evaluationId, updatedEvaluation) {
      const index = this.evaluations.findIndex(e => e._id === evaluationId);
      if (index !== -1) {
        this.evaluations[index] = { ...this.evaluations[index], ...updatedEvaluation };
      }
    },
    
    clearPatientData() {
      this.currentPatient = null;
      this.hospitalRecord = null;
      this.assessments = [];
      this.treatments = [];
      this.discharges = [];
      this.evaluations = [];
    },
    
    setAllPatients(patients) {
      this.allPatients = patients;
    },
    
    removePatient(hospitalId) {
      this.allPatients.receivedPatients = this.allPatients.receivedPatients.filter(
        patient => patient.hospital_id !== hospitalId
      );
    },
    
    removePatientFromReceived(hospitalId) {
      this.allPatients.receivedPatients = this.allPatients.receivedPatients.filter(
        patient => patient.hospital_id !== hospitalId
      );
    },
    
    setAssignedPatients(patients) {
      this.assignedPatients = patients || [];
    },
  },
});
