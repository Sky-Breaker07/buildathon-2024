<template>
  <div v-if="superAdmin" class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      <div class="p-8">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Organization Setup</h2>
        <div class="mb-6">
          <p class="text-lg text-gray-700">Welcome, <span class="font-semibold">{{ superAdmin.firstName }} {{ superAdmin.lastName }}</span>!</p>
          <p class="text-sm text-gray-500">Staff ID: {{ superAdmin.staff_id }}</p>
        </div>

        <!-- Department Setup -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Add Departments</h3>
          <div class="flex items-center space-x-4 mb-4">
            <input v-model="newDepartment" type="text" class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter department name">
            <button @click="addDepartment" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="dept in departments" :key="dept" class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {{ dept }}
            </span>
          </div>
        </div>

        <!-- Department Head Registration -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Register Department Heads</h3>
          <form @submit.prevent="registerDepartmentHead" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <input v-model="HeadForm.firstName" type="text" required class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="First Name">
              <input v-model="HeadForm.lastName" type="text" required class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Last Name">
            </div>
            <input v-model="HeadForm.email" type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email">
            <select v-model="HeadForm.department" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select Department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>
            <button type="submit" class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Register Department Head
            </button>
          </form>
        </div>

        <!-- Health Information Manager Registration -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Register Health Information Manager</h3>
          <form @submit.prevent="registerHealthInformationManager" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <input v-model="himForm.firstName" type="text" required class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="First Name">
              <input v-model="himForm.lastName" type="text" required class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Last Name">
            </div>
            <input v-model="himForm.email" type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email">
            <button type="submit" class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Register Health Information Manager
            </button>
          </form>
        </div>

        <!-- Registered Staff List -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Registered Department Heads and HIM</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="staff in registeredStaff" :key="staff.staff_id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ staff.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ staff.staff_id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ staff.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ staff.role }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <LoadingModal ref="loadingModal" />
  </div>
  <div v-else class="text-center text-gray-600">
    Loading Super Admin data...
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { registerAdminHCP, registerHIM } from '../utils/staffManagement';
import LoadingModal from './LoadingModal.vue';
import { getToken } from '../utils/tokenUtils'; // Add this import

const props = defineProps({
  superAdmin: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['setup-complete']);

const toast = useToast();
const loadingModal = ref(null);

const superAdminData = ref(null);
const departments = ref([]);
const newDepartment = ref('');
const registeredStaff = ref([]);

const HeadForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  department: '',
});

const himForm = ref({
  firstName: '',
  lastName: '',
  email: '',
});

onMounted(() => {
  superAdminData.value = props.superAdmin;
});

watch(() => props.superAdmin, (newValue) => {
  if (newValue) {
    superAdminData.value = newValue;
  }
});

const addDepartment = () => {
  if (newDepartment.value && !departments.value.includes(newDepartment.value)) {
    departments.value.push(newDepartment.value);
    newDepartment.value = '';
    toast.success('Department added successfully');
  } else {
    toast.error('Department already exists or is empty');
  }
};

const registerDepartmentHead = async () => {
  try {
    loadingModal.value.show();
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await registerAdminHCP({
      ...HeadForm.value,
      profession: HeadForm.value.department
    }, token); // Pass the token here
    registeredStaff.value.push({
      ...response.data.adminHealthcareProfessional,
      role: `${HeadForm.value.department} Head`
    });
    resetHeadForm();
    toast.success('Department Head registered successfully');
    checkSetupComplete();
  } catch (error) {
    console.error('Error registering Department Head:', error);
    toast.error('Failed to register Department Head. Please try again.');
  } finally {
    loadingModal.value.hide();
  }
};

const registerHealthInformationManager = async () => {
  try {
    loadingModal.value.show();
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await registerHIM(himForm.value, token); // Pass the token here
    registeredStaff.value.push({
      ...response.data.healthInformationManager,
      role: 'Health Information Manager'
    });
    resetHIMForm();
    toast.success('Health Information Manager registered successfully');
    checkSetupComplete();
  } catch (error) {
    console.error('Error registering Health Information Manager:', error);
    toast.error('Failed to register Health Information Manager. Please try again.');
  } finally {
    loadingModal.value.hide();
  }
};

const resetHeadForm = () => {
  HeadForm.value = {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  };
};

const resetHIMForm = () => {
  himForm.value = {
    firstName: '',
    lastName: '',
    email: '',
  };
};

const checkSetupComplete = () => {
  if (departments.value.length > 0 && registeredStaff.value.length > 0) {
    emit('setup-complete');
  }
};
</script>