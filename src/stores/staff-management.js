import { defineStore } from 'pinia';

export const useStaffStore = defineStore('staff', {
  state: () => ({
    currentUser: null,
    healthcareProfessionals: [],
    adminHealthcareProfessionals: [],
    healthInformationManagers: [],
  }),
  
  actions: {
    setCurrentUser(user) {
      this.currentUser = user;
    },
    
    setHealthcareProfessionals(hcps) {
      this.healthcareProfessionals = hcps;
    },
    
    setAdminHealthcareProfessionals(adminHCPs) {
      this.adminHealthcareProfessionals = adminHCPs;
    },
    
    setHealthInformationManagers(hims) {
      this.healthInformationManagers = hims;
    },
    
    addHealthcareProfessional(hcp) {
      this.healthcareProfessionals.push(hcp);
    },
    
    addAdminHealthcareProfessional(adminHCP) {
      this.adminHealthcareProfessionals.push(adminHCP);
    },
    
    addHealthInformationManager(him) {
      this.healthInformationManagers.push(him);
    },
    
    removeHealthcareProfessional(staffId) {
      this.healthcareProfessionals = this.healthcareProfessionals.filter(hcp => hcp.staff_id !== staffId);
    },
    
    removeHealthInformationManager(staffId) {
      this.healthInformationManagers = this.healthInformationManagers.filter(him => him.staff_id !== staffId);
    },
    
    updateHCPAdminStatus(staffId, isAdmin) {
      const hcp = this.healthcareProfessionals.find(hcp => hcp.staff_id === staffId);
      if (hcp) {
        hcp.isAdmin = isAdmin;
      }
    },
    
    clearStaffData() {
      this.currentUser = null;
      this.healthcareProfessionals = [];
      this.adminHealthcareProfessionals = [];
      this.healthInformationManagers = [];
    },
  },
});
