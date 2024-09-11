import { defineStore } from 'pinia';
import { getCurrentUser } from '../utils/staffManagement';

export const useStaffStore = defineStore('staff', {
  state: () => ({
    currentUser: null,
    adminHealthcareProfessionals: [],
    healthInformationManagers: [],
  }),
  
  actions: {
    setCurrentUser(user) {
      this.currentUser = user;
    },
    
    async fetchCurrentUser() {
      try {
        const userData = await getCurrentUser();
        this.setCurrentUser(userData);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        throw error; // Rethrow the error so the router can catch it
      }
    },
    
    clearStaffData() {
      this.currentUser = null;
      // ... clear other staff-related data ...
    },
    
    addAdminHealthcareProfessional(adminHCP) {
      this.adminHealthcareProfessionals.push(adminHCP);
    },
    
    removeAdminHealthcareProfessional(staff_id) {
      this.adminHealthcareProfessionals = this.adminHealthcareProfessionals.filter(hcp => hcp.staff_id !== staff_id);
    },
    
    addHealthInformationManager(him) {
      this.healthInformationManagers.push(him);
    },
    
    // ... other actions ...
  },
});
