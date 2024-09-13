<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">All Patients</h1>
  
      <!-- Search and Filter -->
      <div class="mb-6 flex space-x-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search patients..."
          class="px-4 py-2 border rounded-md flex-grow"
        />
        <select
          v-model="filterOption"
          class="px-4 py-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value="assigned">Assigned to Me</option>
          <option value="otherHCPs">Assigned to Other Health Care Professionals</option>
          <option value="received">Received Patients</option>
        </select>
      </div>
  
      <!-- Patients Assigned to Admin -->
      <div v-if="filteredAssignedToAdmin.length > 0" class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Patients Assigned to Me</h2>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2 text-left">Name</th>
              <th class="border p-2 text-left">Hospital No.</th>
              <th class="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in filteredAssignedToAdmin" :key="patient.hospital_id" class="hover:bg-gray-50">
              <td class="border p-2">{{ patient.name }}</td>
              <td class="border p-2">{{ patient.hospital_id }}</td>
              <td class="border p-2">
                <router-link :to="`/hcp/assigned/${patient.hospital_id}`" class="text-blue-500 hover:underline">View Details</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Patients Assigned to Other HCPs -->
      <div v-if="filteredAssignedToOtherHCPs.length > 0" class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Patients Assigned to Other HCPs</h2>
        <div v-for="hcpGroup in filteredAssignedToOtherHCPs" :key="hcpGroup.hcp.staff_id" class="mb-4">
          <h3 class="text-xl font-medium mb-2">{{ hcpGroup.hcp.name }} ({{ hcpGroup.hcp.staff_id }})</h3>
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border p-2 text-left">Name</th>
                <th class="border p-2 text-left">Hospital No.</th>
                <th class="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in hcpGroup.patients" :key="patient.hospital_id" class="hover:bg-gray-50">
                <td class="border p-2">{{ patient.name }}</td>
                <td class="border p-2">{{ patient.hospital_id }}</td>
                <td class="border p-2">
                  <router-link :to="`/hcp/patient/${patient.hospital_id}`" class="text-blue-500 hover:underline">View Details</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Received Patients -->
      <div v-if="filteredReceivedPatients.length > 0" class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Received Patients</h2>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2 text-left">Name</th>
              <th class="border p-2 text-left">Hospital No.</th>
              <th class="border p-2 text-left">Status</th>
              <th class="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in filteredReceivedPatients" :key="patient.hospital_id" class="hover:bg-gray-50">
              <td class="border p-2">{{ patient.name }}</td>
              <td class="border p-2">{{ patient.hospital_id }}</td>
              <td class="border p-2">
                <span :class="getStatusClass(patient.status)">
                  {{ patient.status }}
                </span>
              </td>
              <td class="border p-2">
                <router-link :to="`/hcp/patient/${patient.hospital_id}`" class="text-blue-500 hover:underline mr-2">View Details</router-link>
                <template v-if="patient.status === 'pending'">
                  <button @click="handleAcceptPatient(patient.hospital_id)" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-4">Accept</button>
                  <button @click="handleRejectPatient(patient.hospital_id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Reject</button>
                </template>
                <template v-else-if="patient.status === 'accepted'">
                  <button @click="handleAssignPatient(patient.hospital_id)" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-4">Assign</button>
                  <button @click="handleRejectPatient(patient.hospital_id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Reject</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-if="noResults" class="text-center text-gray-500 mt-8">
        No patients found matching your search or filter criteria.
      </div>
    </div>
    <LoadingModal ref="loadingModal" />

    <!-- Assignment Modal -->
    <div v-if="showAssignmentModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">Assign Patient to HCPs</h3>
        <p class="mb-4">Assign patient {{ selectedPatient?.name }} ({{ selectedPatient?.hospital_id }}) to:</p>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="selectAll">
            <input type="checkbox" id="selectAll" v-model="selectAllHCPs" @change="toggleAllHCPs" class="mr-2">
            Select All HCPs
          </label>
        </div>
        <div class="max-h-60 overflow-y-auto mb-4">
          <div v-for="hcp in availableHCPs" :key="hcp.staff_id" class="mb-2">
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedHCPs" :value="hcp.staff_id" class="mr-2">
              {{ hcp.name }} ({{ hcp.staff_id }})
            </label>
          </div>
        </div>
        <div class="flex justify-end">
          <button @click="closeAssignmentModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button @click="confirmAssignment" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Assign
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStaffStore } from '@/stores/staff-management';
  import { usePatientStore } from '@/stores/patient-management';
  import { getAdminJurisdictionPatients, acceptPatient, rejectPatient, assignPatientToHCP } from '@/utils/patientManagement';
  import { getHCPsByProfession } from '@/utils/staffManagement';
  import { getToken } from '@/utils/tokenUtils';
  import { useToast } from 'vue-toastification';
  import LoadingModal from '@/components/LoadingModal.vue';
  
  const router = useRouter();
  const staffStore = useStaffStore();
  const patientStore = usePatientStore();
  const toast = useToast();
  const loadingModal = ref(null);
  
  const searchTerm = ref('');
  const filterOption = ref('all');
  const showAssignmentModal = ref(false);
  const selectedPatient = ref(null);
  const availableHCPs = ref([]);
  const selectedHCPs = ref([]);
  const selectAllHCPs = ref(false);
  
  const fetchPatients = async () => {
    try {
      loadingModal.value.show();
      const token = getToken();
      const response = await getAdminJurisdictionPatients(token);
      patientStore.setAllPatients(response.data.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Failed to fetch patients. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  };
  
  const fetchHCPs = async () => {
    try {
      loadingModal.value.show();
      const response = await getHCPsByProfession(staffStore.currentUser.profession);
      
      if (response && response.data && response.data.status === "Success" && response.data.data && Array.isArray(response.data.data.healthcareProfessionals)) {
        availableHCPs.value = response.data.data.healthcareProfessionals.map(hcp => ({
          staff_id: hcp.staff_id,
          name: hcp.name || `${hcp.firstName || ''} ${hcp.lastName || ''}`.trim() || 'Unknown Name'
        }));
      } else {
        console.error('Unexpected response structure:', response);
        toast.error('Failed to fetch healthcare professionals. Unexpected data structure.');
      }
    } catch (error) {
      console.error('Error fetching HCPs:', error);
      toast.error('Failed to fetch healthcare professionals. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  };
  
  onMounted(async () => {
    if (!staffStore.currentUser || !staffStore.currentUser.isAdmin) {
      router.push('/dashboard');
      return;
    }
    await fetchPatients();
    await fetchHCPs();
  });
  
  const filteredAssignedToAdmin = computed(() => {
    return filterPatients(patientStore.allPatients.assignedToAdmin || []);
  });
  
  const filteredAssignedToOtherHCPs = computed(() => {
    return (patientStore.allPatients.assignedToOtherHCPs || []).map(hcpGroup => ({
      ...hcpGroup,
      patients: filterPatients(hcpGroup.patients)
    })).filter(hcpGroup => hcpGroup.patients.length > 0);
  });
  
  const filteredReceivedPatients = computed(() => {
    return filterPatients(patientStore.allPatients.receivedPatients || []);
  });
  
  const noResults = computed(() => {
    return filteredAssignedToAdmin.value.length === 0 &&
           filteredAssignedToOtherHCPs.value.length === 0 &&
           filteredReceivedPatients.value.length === 0;
  });
  
  const filterPatients = (patientList) => {
    return patientList.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                            patient.hospital_id.toLowerCase().includes(searchTerm.value.toLowerCase());
      const matchesFilter = filterOption.value === 'all' || 
                            (filterOption.value === 'assigned' && patientList === patientStore.allPatients.assignedToAdmin) ||
                            (filterOption.value === 'otherHCPs' && patientList !== patientStore.allPatients.assignedToAdmin && patientList !== patientStore.allPatients.receivedPatients) ||
                            (filterOption.value === 'received' && patientList === patientStore.allPatients.receivedPatients);
      return matchesSearch && matchesFilter;
    });
  };
  
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-200 px-2 py-1 rounded';
      case 'accepted':
        return 'bg-green-200 px-2 py-1 rounded';
      default:
        return '';
    }
  };
  
  const handleAcceptPatient = async (hospitalId) => {
    try {
      loadingModal.value.show();
      const token = getToken();
      await acceptPatient(hospitalId, staffStore.currentUser.staff_id, token);
      patientStore.removePatientFromReceived(hospitalId);
      toast.success('Patient accepted successfully');
      await fetchPatients();
    } catch (error) {
      console.error('Error accepting patient:', error);
      toast.error('Failed to accept patient. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  };
  
  const handleRejectPatient = async (hospitalId) => {
    try {
      loadingModal.value.show();
      const token = getToken();
      await rejectPatient(hospitalId, staffStore.currentUser.staff_id, token);
      toast.success('Patient rejected successfully');
      // Remove the patient from the store
      patientStore.removePatient(hospitalId);
    } catch (error) {
      console.error('Error rejecting patient:', error);
      toast.error('Failed to reject patient. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  };
  
  const handleAssignPatient = async (hospitalId) => {
    selectedPatient.value = patientStore.allPatients.receivedPatients.find(p => p.hospital_id === hospitalId);
    
    if (availableHCPs.value.length === 0) {
      await fetchHCPs();
    }
    
    showAssignmentModal.value = true;
  };
  
  const closeAssignmentModal = () => {
    showAssignmentModal.value = false;
    selectedHCPs.value = [];
    selectAllHCPs.value = false;
  };
  
  const toggleAllHCPs = () => {
    if (selectAllHCPs.value) {
      selectedHCPs.value = availableHCPs.value.map(hcp => hcp.staff_id);
    } else {
      selectedHCPs.value = [];
    }
  };
  
  const confirmAssignment = async () => {
    if (selectedHCPs.value.length === 0) {
      toast.error('Please select at least one HCP to assign the patient to.');
      return;
    }

    try {
      loadingModal.value.show();
      const token = getToken();
      
      for (const staffId of selectedHCPs.value) {
        await assignPatientToHCP(selectedPatient.value.hospital_id, staffId, token);
      }
      
      // Remove the assigned patient from receivedPatients
      patientStore.removePatientFromReceived(selectedPatient.value.hospital_id);
      
      toast.success('Patient assigned successfully');
      await fetchPatients();
      closeAssignmentModal();
    } catch (error) {
      console.error('Error assigning patient:', error);
      toast.error('Failed to assign patient. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  };
  </script>