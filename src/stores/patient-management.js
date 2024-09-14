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
      // Ensure patients are correctly categorized
      this.allPatients = {
        assignedToAdmin: patients.assignedToAdmin || [],
        assignedToOtherHCPs: patients.assignedToOtherHCPs || [],
        receivedPatients: patients.receivedPatients || [],
      };
    },
    
    // Consolidated removePatient action
    removePatient(hospitalId) {
      this.allPatients.receivedPatients = this.allPatients.receivedPatients.filter(
        patient => patient.hospital_id !== hospitalId
      );
      this.allPatients.assignedToAdmin = this.allPatients.assignedToAdmin.filter(
        patient => patient.hospital_id !== hospitalId
      );
      this.allPatients.assignedToOtherHCPs = this.allPatients.assignedToOtherHCPs.map(group => ({
        ...group,
        patients: group.patients.filter(patient => patient.hospital_id !== hospitalId)
      })).filter(group => group.patients.length > 0);
    },
    
    movePatientToReceived(patient) {
      // Remove from other categories
      this.allPatients.assignedToAdmin = this.allPatients.assignedToAdmin.filter(p => p.hospital_id !== patient.hospital_id);
      this.allPatients.assignedToOtherHCPs = this.allPatients.assignedToOtherHCPs.filter(group => {
        group.patients = group.patients.filter(p => p.hospital_id !== patient.hospital_id);
        return group.patients.length > 0;
      });

      // Add to receivedPatients if not already there
      if (!this.allPatients.receivedPatients.some(p => p.hospital_id === patient.hospital_id)) {
        this.allPatients.receivedPatients.push(patient);
      }
    },
    
    setAssignedPatients(patients) {
      this.assignedPatients = patients || [];
    },
    
    // New actions for vital signs
    addVitalSign(vitalSign) {
      if (this.currentPatient) {
        this.currentPatient.vital_signs.unshift(vitalSign);
      }
    },

    updateVitalSign(index, updatedVitalSign) {
      if (this.currentPatient && this.currentPatient.vital_signs[index]) {
        this.currentPatient.vital_signs[index] = updatedVitalSign;
      }
    },

    removeVitalSign(index) {
      if (this.currentPatient) {
        this.currentPatient.vital_signs.splice(index, 1);
      }
    },

    clearVitalSigns() {
      if (this.currentPatient) {
        this.currentPatient.vital_signs = [];
      }
    },
    
    // New action to handle patient assignment
    assignPatient(patient, staffId, isAdmin = false) {
      // Remove from receivedPatients
      this.allPatients.receivedPatients = this.allPatients.receivedPatients.filter(
        p => p.hospital_id !== patient.hospital_id
      );

      if (isAdmin) {
        // Assign to admin
        if (!this.allPatients.assignedToAdmin.some(p => p.hospital_id === patient.hospital_id)) {
          this.allPatients.assignedToAdmin.push(patient);
        }
      } else {
        // Assign to other HCP
        let hcpGroup = this.allPatients.assignedToOtherHCPs.find(group => group.hcp.staff_id === staffId);
        if (!hcpGroup) {
          hcpGroup = { hcp: { staff_id: staffId }, patients: [] };
          this.allPatients.assignedToOtherHCPs.push(hcpGroup);
        }
        if (!hcpGroup.patients.some(p => p.hospital_id === patient.hospital_id)) {
          hcpGroup.patients.push(patient);
        }
      }
    },
    
    // Update this action to handle status changes
    updatePatientStatus(hospitalId, newStatus) {
      const patient = this.allPatients.receivedPatients.find(p => p.hospital_id === hospitalId);
      if (patient) {
        patient.status = newStatus;
      }
    },

    // Update this action to handle patient unassignment
    unassignPatient(hospitalId, staffId) {
      // Remove from assignedToAdmin if applicable
      this.allPatients.assignedToAdmin = this.allPatients.assignedToAdmin.filter(
        p => p.hospital_id !== hospitalId
      );

      // Remove from assignedToOtherHCPs if applicable
      this.allPatients.assignedToOtherHCPs = this.allPatients.assignedToOtherHCPs.map(group => {
        if (group.hcp.staff_id === staffId) {
          group.patients = group.patients.filter(p => p.hospital_id !== hospitalId);
        }
        return group;
      }).filter(group => group.patients.length > 0);

      // Move the patient back to receivedPatients with 'accepted' status
      const patient = this.currentPatient && this.currentPatient.hospital_id === hospitalId
        ? this.currentPatient
        : this.allPatients.assignedToAdmin.find(p => p.hospital_id === hospitalId) ||
          this.allPatients.assignedToOtherHCPs.flatMap(g => g.patients).find(p => p.hospital_id === hospitalId);

      if (patient) {
        patient.status = 'accepted';
        this.allPatients.receivedPatients.push(patient);
      }
    },
  },
});
