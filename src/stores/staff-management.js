import { defineStore } from 'pinia';
import { getCurrentUser } from '../utils/staffManagement';

export const useStaffStore = defineStore('staff', {
  state: () => ({
    currentUser: null,
    // ... other state properties ...
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
    
    // ... other actions ...
  },
});
