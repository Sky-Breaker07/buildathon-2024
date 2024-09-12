<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">All Patients</h1>

    <!-- Search and Filter -->
    <div class="mb-6 flex space-x-4">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Search by Name or Hospital No."
        class="p-2 border rounded-md flex-grow"
      />
      <select v-model="selectedYear" @change="handleFilter" class="p-2 border rounded-md">
        <option value="">All Years</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
      <select v-model="selectedMonth" @change="handleFilter" class="p-2 border rounded-md">
        <option value="">All Months</option>
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.label }}
        </option>
      </select>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="text-center my-4">
      Loading patients...
    </div>

    <!-- Patients Table -->
    <table v-else-if="displayedPatients.length > 0" class="w-full border-collapse border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Hospital No.</th>
          <th class="p-2 border">
            <button @click="toggleSort" class="flex items-center justify-between w-full">
              Date of Registration
              <span v-if="sortOrder === 'asc'">↑</span>
              <span v-else>↓</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in displayedPatients" :key="patient._id" class="hover:bg-gray-50">
          <td class="p-2 border">{{ patient.biodata.name }}</td>
          <td class="p-2 border">{{ patient.hospital_record.hospital_id }}</td>
          <td class="p-2 border">{{ formatDate(patient.biodata.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-center mt-4">No patients found.</p>

    <!-- Pagination -->
    <div v-if="displayedPatients.length > 0" class="mt-4 flex justify-between items-center">
      <button
        @click="changePage(-1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="changePage(1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { usePatientStore } from '@/stores/patient-management';
import { getAllPatients } from '@/utils/patientManagement';

const patientStore = usePatientStore();

const patients = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalPatients = ref(0);
const searchQuery = ref('');
const selectedYear = ref('');
const selectedMonth = ref('');
const sortOrder = ref('desc');
const isLoading = ref(true);

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => currentYear - i);
});

const months = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' },
];

const displayedPatients = computed(() => {
  if (!patients.value || patients.value.length === 0) return [];
  
  let filtered = patients.value.filter(patient => {
    const nameMatch = patient.biodata.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const hospitalIdMatch = patient.hospital_record.hospital_id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const date = new Date(patient.biodata.createdAt);
    const yearMatch = selectedYear.value ? date.getFullYear() === parseInt(selectedYear.value) : true;
    const monthMatch = selectedMonth.value !== '' ? date.getMonth() === parseInt(selectedMonth.value) : true;
    return (nameMatch || hospitalIdMatch) && yearMatch && monthMatch;
  });

  filtered.sort((a, b) => {
    const dateA = new Date(a.biodata.createdAt);
    const dateB = new Date(b.biodata.createdAt);
    return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return filtered;
});

const fetchPatients = async () => {
  isLoading.value = true;
  try {
    const response = await getAllPatients(currentPage.value, 100);
    if (response.data && response.data.status === "Success" && response.data.data) {
      patients.value = response.data.data.patients;
      currentPage.value = response.data.data.currentPage;
      totalPages.value = response.data.data.totalPages;
      totalPatients.value = response.data.data.totalPatients;
      patientStore.setAllPatients(patients.value);
    } else {
      console.error('Unexpected response format:', response);
    }
  } catch (error) {
    console.error('Error fetching patients:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchPatients();
};

const handleFilter = () => {
  currentPage.value = 1;
  fetchPatients();
};

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

const changePage = (direction) => {
  const newPage = currentPage.value + direction;
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    fetchPatients();
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

watch([searchQuery, selectedYear, selectedMonth], () => {
  currentPage.value = 1;
  fetchPatients();
});

onMounted(() => {
  fetchPatients();
});
</script>
