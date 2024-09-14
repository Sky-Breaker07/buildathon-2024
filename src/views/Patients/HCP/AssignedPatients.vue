<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-extrabold text-indigo-900 mb-8 text-center">Assigned Patients</h1>
        
        <!-- Search and filter -->
        <div class="mb-6 flex flex-col sm:flex-row justify-between items-center">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Search patients..." 
            class="w-full sm:w-64 px-4 py-2 rounded-md border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4 sm:mb-0"
          >
          <select 
            v-model="sortBy" 
            class="w-full sm:w-auto px-4 py-2 rounded-md border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="name">Sort by Name</option>
            <option value="hospital_id">Sort by Hospital ID</option>
          </select>
        </div>
  
        <!-- Patients table -->
        <div v-if="sortedAndFilteredPatients.length > 0" class="bg-white shadow-xl rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-indigo-200">
            <thead class="bg-indigo-600">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Hospital ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-indigo-100">
              <tr v-for="patient in sortedAndFilteredPatients" :key="patient.hospital_record.hospital_id" class="hover:bg-indigo-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-indigo-900">{{ patient.biodata.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-indigo-700">{{ patient.hospital_record.hospital_id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <router-link 
                    :to="`/dashboard/assigned/${patient.hospital_record.hospital_id}`" 
                    class="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                  >
                    View Details
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- No results message -->
        <div v-else-if="patientStore.assignedPatients.length > 0" class="text-center mt-8 text-indigo-800 font-medium">
          No patients found matching your search criteria.
        </div>
  
        <!-- No assigned patients message -->
        <div v-else class="text-center mt-8 text-indigo-800 font-medium">
          You currently have no assigned patients.
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStaffStore } from '@/stores/staff-management';
  import { usePatientStore } from '@/stores/patient-management';
  import { getAssignedPatients } from '@/utils/patientManagement';
  import { getToken } from '@/utils/tokenUtils';
  import { useToast } from 'vue-toastification';
  
  const router = useRouter();
  const staffStore = useStaffStore();
  const patientStore = usePatientStore();
  const toast = useToast();
  
  const searchTerm = ref('');
  const sortBy = ref('name');
  
  const fetchAssignedPatients = async () => {
    try {
      const token = getToken();
      const response = await getAssignedPatients(token);
      if (response.data && response.data.status === 'Success' && Array.isArray(response.data.data)) {
        patientStore.setAssignedPatients(response.data.data);
      } else {
        console.error('Unexpected response structure:', response);
        toast.error('Failed to fetch assigned patients. Unexpected data structure.');
      }
    } catch (error) {
      console.error('Error fetching assigned patients:', error);
      toast.error('Failed to fetch assigned patients. Please try again.');
    }
  };
  
  onMounted(async () => {
    if (!staffStore.currentUser || staffStore.currentUser.role !== 'HealthCareProfessional') {
      toast.error('Unauthorized access');
      router.push('/dashboard');
      return;
    }
    await fetchAssignedPatients();
  });
  
  const sortedAndFilteredPatients = computed(() => {
    if (!patientStore.assignedPatients) return [];
    
    let filtered = patientStore.assignedPatients.filter(patient => 
      (patient.biodata.name && patient.biodata.name.toLowerCase().includes(searchTerm.value.toLowerCase())) ||
      (patient.hospital_record.hospital_id && patient.hospital_record.hospital_id.toLowerCase().includes(searchTerm.value.toLowerCase()))
    );
  
    return filtered.sort((a, b) => {
      if (sortBy.value === 'name') {
        return (a.biodata.name || '').localeCompare(b.biodata.name || '');
      } else {
        return (a.hospital_record.hospital_id || '').localeCompare(b.hospital_record.hospital_id || '');
      }
    });
  });
  </script>