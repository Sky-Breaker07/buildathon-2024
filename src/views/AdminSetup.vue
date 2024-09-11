<template>
  <div v-if="currentUser" class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      <div class="p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-extrabold text-gray-900">{{ profession }} Registration</h2>
          <button
            @click="goToDashboard"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div class="mb-6">
          <p class="text-lg text-gray-700">Welcome, <span class="font-semibold">{{ currentUser.firstName }} {{ currentUser.lastName }}</span>!</p>
          <p class="text-sm text-gray-500">Staff ID: {{ currentUser.staff_id }}</p>
          <p class="text-sm text-gray-500">Profession: {{ profession }}</p>
        </div>

        <!-- Healthcare Professional Registration Form -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Register New {{ profession }}</h3>
          <form @submit.prevent="registerHealthcareProfessional" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <input v-model="hcpForm.firstName" type="text" required class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="First Name">
              <input v-model="hcpForm.lastName" type="text" required class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Last Name">
            </div>
            <input v-model="hcpForm.email" type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email">
            <button type="submit" class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Register {{ profession }}
            </button>
          </form>
        </div>

        <!-- Registered Healthcare Professionals List -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Registered {{ profession }}s</h3>
          <div v-if="registeredHCPs.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="hcp in registeredHCPs" :key="hcp.staff_id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ hcp.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ hcp.staff_id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ hcp.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button @click="openRemoveModal(hcp)" class="text-red-600 hover:text-red-900 focus:outline-none">
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else class="text-gray-600 italic">No registered {{ profession }}s found.</p>
        </div>
      </div>
    </div>
    <LoadingModal ref="loadingModal" />
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-100">
    <p class="text-xl text-gray-600">Loading...</p>
  </div>
  <!-- Add this modal at the end of the template -->
  <teleport to="body">
    <div v-if="showRemoveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-4 rounded-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Confirm Healthcare Professional Removal</h2>
        <p class="mb-4">Are you sure you want to remove {{ hcpToRemove?.name }}?</p>
        <p class="mb-4">To confirm, please type the staff ID: <strong>{{ hcpToRemove?.staff_id }}</strong></p>
        <input v-model="confirmationInput" class="w-full p-2 border rounded mb-4" placeholder="Type staff ID here" />
        <div class="flex justify-end">
          <button @click="closeRemoveModal" class="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
          <button @click="removeHealthcareProfessional" :disabled="confirmationInput !== hcpToRemove?.staff_id" class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50">Remove</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStaffStore } from '../stores/staff-management';
import { registerHCP, getHCPsByProfession, removeHCP } from '../utils/staffManagement';
import LoadingModal from '../components/LoadingModal.vue';
import { getToken } from '../utils/tokenUtils';

const router = useRouter();
const toast = useToast();
const staffStore = useStaffStore();
const loadingModal = ref(null);

const currentUser = computed(() => staffStore.currentUser);
const registeredHCPs = ref([]);

const profession = computed(() => {
  return currentUser.value?.profession ? capitalizeFirstLetter(currentUser.value.profession) : '';
});

const hcpForm = ref({
  firstName: '',
  lastName: '',
  email: '',
});

const showRemoveModal = ref(false);
const hcpToRemove = ref(null);
const confirmationInput = ref('');

onMounted(async () => {
  if (!currentUser.value) {
    await staffStore.fetchCurrentUser();
  }
  
  if (!currentUser.value || !currentUser.value.isAdmin || currentUser.value.role !== 'HealthCareProfessional') {
    toast.error('You are not authorized to access this page');
    router.push('/dashboard');
    return;
  }
  
  await fetchRegisteredHCPs();
});

const goToDashboard = () => {
  router.push('/dashboard');
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const fetchRegisteredHCPs = async () => {
  try {
    loadingModal.value.show();
    const response = await getHCPsByProfession(currentUser.value.profession);
    
    // Check if the response is successful and has the expected structure
    if (response && response.data && response.data.status === "Success" && response.data.data && Array.isArray(response.data.data.healthcareProfessionals)) {
      registeredHCPs.value = response.data.data.healthcareProfessionals.filter(hcp => !hcp.isAdmin);
      if (registeredHCPs.value.length === 0) {
        toast.info('No registered healthcare professionals found for this profession.');
      }
    } else {
      console.error('Unexpected response structure:', response);
      toast.error('Failed to fetch registered healthcare professionals. Unexpected data structure.');
    }
  } catch (error) {
    console.error('Error fetching registered HCPs:', error);
    toast.error('Failed to fetch registered healthcare professionals. Please try again.');
  } finally {
    loadingModal.value.hide();
  }
};

const registerHealthcareProfessional = async () => {
  try {
    loadingModal.value.show();
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await registerHCP({
      ...hcpForm.value,
      profession: currentUser.value.profession
    }, token);
    
    // Check if the response is successful and has the expected structure
    if (response && response.data && response.data.status === "Success" && response.data.data && response.data.data.healthcareProfessional) {
      registeredHCPs.value.push(response.data.data.healthcareProfessional);
      resetHCPForm();
      toast.success('Healthcare Professional registered successfully');
    } else {
      console.error('Unexpected response structure:', response);
      toast.error('Failed to register Healthcare Professional. Unexpected data structure.');
    }
  } catch (error) {
    console.error('Error registering Healthcare Professional:', error);
    toast.error('Failed to register Healthcare Professional. Please try again.');
  } finally {
    loadingModal.value.hide();
  }
};

const openRemoveModal = (hcp) => {
  hcpToRemove.value = hcp;
  showRemoveModal.value = true;
  confirmationInput.value = '';
};

const closeRemoveModal = () => {
  showRemoveModal.value = false;
  hcpToRemove.value = null;
  confirmationInput.value = '';
};

const removeHealthcareProfessional = async () => {
  if (confirmationInput.value === hcpToRemove.value.staff_id) {
    try {
      loadingModal.value.show();
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      await removeHCP(hcpToRemove.value.staff_id, token);
      registeredHCPs.value = registeredHCPs.value.filter(hcp => hcp.staff_id !== hcpToRemove.value.staff_id);
      toast.success('Healthcare Professional removed successfully');
      closeRemoveModal();
    } catch (error) {
      console.error('Error removing Healthcare Professional:', error);
      toast.error('Failed to remove Healthcare Professional. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  }
};

const resetHCPForm = () => {
  hcpForm.value = {
    firstName: '',
    lastName: '',
    email: '',
  };
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>